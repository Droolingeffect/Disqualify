package com.disqualify.model;

public class AccountFactory {

    public static Account createAccount(int id, String email, String password, String type) {
        if (type.equalsIgnoreCase("subscribed")) {
            return new SubscribedAccount(id, email, password);
        } else {
            return new BasicAccount(id, email, password);
        }
    }
}