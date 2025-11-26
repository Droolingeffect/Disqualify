package com.disqualify.model;

public abstract class Account {
    protected int id;
    protected String email;
    protected String password;

    public Account(int id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public abstract boolean hasAds();

    public int getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    
}