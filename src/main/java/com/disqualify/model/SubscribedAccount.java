package com.disqualify.model;

public class SubscribedAccount extends Account {

    public SubscribedAccount(int id, String email, String password) {
        super(id, email, password);
    }

    @Override
    public boolean hasAds() {
        return false;
    }
}