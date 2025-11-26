package com.disqualify.model;

public class BasicAccount extends Account {

    public BasicAccount(int id, String email, String password) {
        super(id, email, password);
    }

    @Override
    public boolean hasAds() {
        return true;
    }
}