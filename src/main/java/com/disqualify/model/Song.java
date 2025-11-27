package com.disqualify.model;

import java.sql.Date;

public class Song {
    private int id;
    private String title;
    private String album;
    private String artist;
    private String genre;
    private int year;
    private String coverImage;
    private int duration;
    private String filePath;
    private Date releaseDate;
    private Date createdAt;

    // Constructors
    public Song() {}

    public Song(int id, String title, String album, String artist, String genre, 
                int year, String coverImage, int duration, String filePath, 
                Date releaseDate) {
        this.id = id;
        this.title = title;
        this.album = album;
        this.artist = artist;
        this.genre = genre;
        this.year = year;
        this.coverImage = coverImage;
        this.duration = duration;
        this.filePath = filePath;
        this.releaseDate = releaseDate;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAlbum() { return album; }
    public void setAlbum(String album) { this.album = album; }

    public String getArtist() { return artist; }
    public void setArtist(String artist) { this.artist = artist; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public Date getReleaseDate() { return releaseDate; }
    public void setReleaseDate(Date releaseDate) { this.releaseDate = releaseDate; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    // Helper method to format duration as MM:SS
    public String getFormattedDuration() {
        int minutes = duration / 60;
        int seconds = duration % 60;
        return String.format("%d:%02d", minutes, seconds);
    }
}
