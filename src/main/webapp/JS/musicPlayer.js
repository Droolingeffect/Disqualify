class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audio-element');
        this.player = document.getElementById('audio-player');
        this.currentTrack = 0;
        this.songs = [];
        this.isPlaying = false;
        this.isShuffled = false;
        
        this.initializePlayer();
        this.loadSongs();
    }

    initializePlayer() {
        // Player controls
        document.getElementById('play-pause-btn').addEventListener('click', () => this.togglePlay());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSong());
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSong());
        document.getElementById('shuffle-btn').addEventListener('click', () => this.toggleShuffle());
        document.getElementById('mute-btn').addEventListener('click', () => this.toggleMute());

        // Progress bar
        document.getElementById('progress-bar').addEventListener('click', (e) => this.seek(e));

        // Volume control
        document.querySelector('.volume-slider').addEventListener('input', (e) => {
            this.audio.volume = e.target.value;
        });

        // Audio events
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextSong());
    }

    async loadSongs() {
        try {
            const response = await fetch('/disqualify/api/songs');
            this.songs = await response.json();
            this.renderSongs();
        } catch (error) {
            console.error('Error loading songs:', error);
            // Fallback to static data
            this.songs = this.getStaticSongs();
            this.renderSongs();
        }
    }

    getStaticSongs() {
        // Fallback data if API fails
        return [
            {
                id: 1,
                title: "Electric Dreams",
                artist: "Luna Wave",
                duration: 202,
                file_path: "audio/songs/ariana_grande_thank_u,_next.mp3",
                cover_image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89",
                formattedDuration: "3:22"
            },
            {
                id: 2,
                title: "Midnight Drive",
                artist: "Neon Pulse", 
                duration: 255,
                file_path: "audio/songs/ariana_grande_thank_u,_next.mp3",
                cover_image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
                formattedDuration: "4:15"
            }
        ];
    }

    renderSongs() {
        const slider = document.getElementById('songs-slider');
        if (!slider) return;

        slider.innerHTML = '';

        this.songs.forEach((song, index) => {
            const songCard = this.createSongCard(song, index);
            slider.appendChild(songCard);
        });

        // Add duplicates for seamless loop in slider
        this.songs.slice(0, 2).forEach((song, index) => {
            const songCard = this.createSongCard(song, index);
            slider.appendChild(songCard);
        });
    }

    createSongCard(song, index) {
        const card = document.createElement('div');
        card.className = 'quick-picks-song-card';
        card.setAttribute('data-song-id', song.id);
        
        card.innerHTML = `
            <img class="quick-picks-song-image" src="${song.cover_image}" alt="${song.artist}" />
            <div class="quick-picks-song-details">
                <p class="quick-picks-song-title">${song.title}</p>
                <p class="quick-picks-song-artist">${song.artist}</p>
                <p class="quick-picks-song-duration">${song.formattedDuration || this.formatTime(song.duration)}</p>
            </div>
            <button class="quick-picks-play-btn" aria-label="Play song" data-index="${index}">
                <i class="fa fa-play" aria-hidden="true"></i>
            </button>
        `;

        // Add play event
        const playBtn = card.querySelector('.quick-picks-play-btn');
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.playSong(index);
        });

        return card;
    }

    playSong(index) {
        this.currentTrack = index;
        const song = this.songs[index];
        
        this.audio.src = song.file_path;
        this.updatePlayerInfo(song);
        
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.showPlayer();
        }).catch(error => {
            console.error('Error playing audio:', error);
            alert('Error playing audio. Please check if the audio file exists.');
        });
    }

    updatePlayerInfo(song) {
        document.getElementById('current-track-title').textContent = song.title;
        document.getElementById('current-track-artist').textContent = song.artist;
        document.getElementById('current-track-art').src = song.cover_image;
    }

    togglePlay() {
        if (this.audio.paused) {
            this.audio.play();
            this.isPlaying = true;
        } else {
            this.audio.pause();
            this.isPlaying = false;
        }
        this.updatePlayButton();
    }

    updatePlayButton() {
        const playBtn = document.getElementById('play-pause-btn');
        const icon = playBtn.querySelector('i');
        icon.className = this.isPlaying ? 'fa fa-pause' : 'fa fa-play';
    }

    nextSong() {
        this.currentTrack = (this.currentTrack + 1) % this.songs.length;
        this.playSong(this.currentTrack);
    }

    previousSong() {
        this.currentTrack = (this.currentTrack - 1 + this.songs.length) % this.songs.length;
        this.playSong(this.currentTrack);
    }

    showPlayer() {
        if (this.player) {
            this.player.style.display = 'block';
        }
    }

    updateProgress() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        const progressElement = document.getElementById('progress');
        if (progressElement) {
            progressElement.style.width = `${progress}%`;
        }
        
        const currentTimeElement = document.getElementById('current-time');
        if (currentTimeElement) {
            currentTimeElement.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    updateDuration() {
        const durationElement = document.getElementById('duration');
        if (durationElement) {
            durationElement.textContent = this.formatTime(this.audio.duration);
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    seek(e) {
        const progressBar = e.currentTarget;
        const clickPosition = e.offsetX;
        const progressBarWidth = progressBar.clientWidth;
        const percentage = clickPosition / progressBarWidth;
        this.audio.currentTime = percentage * this.audio.duration;
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const shuffleBtn = document.getElementById('shuffle-btn');
        if (shuffleBtn) {
            shuffleBtn.classList.toggle('active', this.isShuffled);
        }
        
        if (this.isShuffled) {
            this.shuffleSongs();
        }
    }

    shuffleSongs() {
        for (let i = this.songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
        }
        this.renderSongs();
    }

    toggleMute() {
        this.audio.muted = !this.audio.muted;
        const muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            const icon = muteBtn.querySelector('i');
            icon.className = this.audio.muted ? 'fa fa-volume-off' : 'fa fa-volume-up';
        }
    }
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});
