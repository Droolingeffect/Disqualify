const albums = albums[albumId];

fetch(`/Disqualify/api/album?album=${albumId}`)
  .then(response => response.json())
  .then(album => {
      renderAlbumHeader(album);
      renderTrackList(album);
      renderDiscography(album.discography);
  });

// ============================
// AlbumPage.js (Connected to globalAudioPlayer.js)
// ============================

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('album') || 'blonde';
  const album = albums[albumId];

  renderAlbumHeader(album);
  renderTrackList(album);
  renderDiscography(album);
  setupDiscographyFilter();
  setupAlbumPageButtons();

  // Button Elements
  const playPauseBtn = document.getElementById('play-pause-btn');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const likeBtn = document.getElementById('like-btn');
  const muteBtn = document.getElementById('mute-btn');
  const volumeSlider = document.querySelector('.volume-slider');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const sliderTrackContainer = document.querySelector('.slider-track-container');

  leftArrow?.addEventListener('click', () => {
    sliderTrackContainer.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  });

  rightArrow?.addEventListener('click', () => {
    sliderTrackContainer.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  });


  if (!savedVolumeLevel || savedVolumeLevel === undefined) {
    savedVolumeLevel = volumeLevel;
  }

  if (volumeSlider) {
    volumeSlider.value = volumeLevel;
    volumeSlider.style.background = `linear-gradient(to right, var(--main-color) ${volumeLevel * 100}%, rgba(255,255,255,0.3) ${volumeLevel * 100}%)`;
  }

  // Hook up all your buttons after setting up initial values
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {globalTogglePlayPause();});
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isShuffled) {
        globalShuffleNext();
      } else {
        globalNextSong();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {globalPrevSong();});
  }

  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      if (currentSongData?.songId) {
        globalToggleLike(currentSongData.songId);
      }
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      if (audioElement.muted) {
        audioElement.muted = false;
        audioElement.volume = savedVolumeLevel || 1;
        muteBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
        volumeSlider.value = savedVolumeLevel || 1;
        volumeSlider.style.background = `linear-gradient(to right, var(--main-color) ${volumeSlider.value * 100}%, rgba(255,255,255,0.3) ${volumeSlider.value * 100}%)`;
      } else {
        savedVolumeLevel = audioElement.volume;
        audioElement.muted = true;
        audioElement.volume = 0;
        muteBtn.innerHTML = '<i class="fa fa-volume-off"></i>';
        volumeSlider.value = 0;
        volumeSlider.style.background = `linear-gradient(to right, var(--main-color) 0%, rgba(255,255,255,0.3) 0%)`;
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const newVolume = parseFloat(e.target.value);
      if (audioElement) {
        audioElement.volume = newVolume;
        audioElement.muted = newVolume === 0;
      }
      savedVolumeLevel = newVolume;
      volumeSlider.style.background = `linear-gradient(to right, var(--main-color) ${newVolume * 100}%, rgba(255,255,255,0.3) ${newVolume * 100}%)`;
      muteBtn.innerHTML = newVolume === 0 ? '<i class="fa fa-volume-off"></i>' : '<i class="fa fa-volume-up"></i>';
    });
  }

  document.getElementById('shuffle-btn')?.addEventListener('click', globalToggleShuffle);

  // Discography card click
  document.getElementById('discography-container')?.addEventListener('click', (e) => {
    const albumCard = e.target.closest('.album-card');
    if (albumCard) {
      const albumId = albumCard.dataset.albumId;
      if (albumId) {
        window.location.href = `AlbumPage.html?album=${albumId}`;
      }
    }
  });
});


function renderAlbumHeader(album) {
  document.getElementById('album-img').src = album.cover;
  document.getElementById('album-title').textContent = album.title;
  const artistLink = document.getElementById('artist-link');
  artistLink.textContent = album.artist;
  artistLink.href = `ArtistPage.html?artist=${album.artist_id || ''}`;
  document.getElementById('album-stats').innerHTML = `
    <span><i class="fa fa-calendar"></i> ${album.releaseDate}</span>
    <span><i class="fa fa-music"></i> ${album.totalTracks} Tracks</span>
    <span><i class="fa fa-clock-o"></i> ${album.totalDuration}</span>
  `;
}

function renderTrackList(album) {
  const tracksContainer = document.getElementById('tracks-container');
  tracksContainer.innerHTML = '';

  album.tracks.forEach((track, index) => {
    const trackHtml = `
      <div class="track-card" data-src="${track.source}" data-title="${track.title}" data-artist="${track.artist}" data-art="${track.art}" data-song-id="${track.id}" data-index="${index}">
        <span class="track-number">${index + 1}</span>
        <div class="track-info">
          <span class="track-title">${track.title}</span>
          <span class="track-duration">${track.duration}</span>
        </div>
        <button class="like-btn"><i class="fa fa-heart-o"></i></button>
        <button class="track-play-btn"><i class="fa fa-play"></i></button>
      </div>
    `;
    tracksContainer.insertAdjacentHTML('beforeend', trackHtml);
  });

  tracksContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.track-card');
    if (!card) return;
  
    const likeBtn = e.target.closest('.like-btn');
    if (likeBtn) {
      globalToggleLike(card.dataset.songId);
      return;
    }
  
    const src = card.getAttribute('data-src') || card.dataset.src;
    if (currentSongData && src === currentSongData.src && isPlaying) {
      globalTogglePlayPause();
    } else {
      globalPlaySelectedSong(card);
    }
  });    
}

function renderDiscography(album) {
  const discographyContainer = document.getElementById('discography-container');
  discographyContainer.innerHTML = '';

  album.discography.forEach(item => {
    const albumCard = `
        <div class="album-card" data-type="${item.type}" data-album-id="${item.title.toLowerCase().replace(/\s+/g, '-')}">
            <img src="${item.image}" alt="${item.title}" class="album-image">
            <div class="album-info">
                <h4 class="title-albums">${item.title}</h4>
                <p class="release-date">${item.year} • ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
            </div>
        </div>
    `;

    discographyContainer.insertAdjacentHTML('beforeend', albumCard);
  });
}

function setupDiscographyFilter() {
  const viewOptions = document.querySelectorAll('.view-option');
  const albumCards = document.querySelectorAll('.album-card');

  viewOptions.forEach(option => {
    option.addEventListener('click', () => {
      viewOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      const view = option.dataset.view;
      albumCards.forEach(card => {
        if (view === 'all' || card.dataset.type === view) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function setupAlbumPageButtons() {
  document.querySelector('.play-btn')?.addEventListener('click', () => {
    const firstTrack = document.querySelector('.track-card');
    if (!currentAudio && firstTrack) {
      globalPlaySelectedSong(firstTrack);
    } else {
      globalTogglePlayPause();
    }
  });

  document.querySelectorAll('.shuffle-btn')?.forEach(btn => {
    btn.addEventListener('click', globalToggleShuffle);
  });
}