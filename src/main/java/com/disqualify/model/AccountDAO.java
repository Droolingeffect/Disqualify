package com.disqualify.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AccountDAO {
    private Connection conn;

    public AccountDAO(Connection conn) {
        this.conn = conn;
    }

    public Account getAccountByEmail(String email) throws SQLException {
        String sql = "SELECT * FROM accounts WHERE email = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int id = rs.getInt("id");
                String password = rs.getString("password");
                String type = rs.getString("type");

                return AccountFactory.createAccount(id, email, password, type);
            } else {
                return null;
            }
        }
    }

    public boolean createAccount(String email, String password, String type) throws SQLException {
        String sql = "INSERT INTO accounts (email, password, type) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setString(2, password);
            stmt.setString(3, type);
            return stmt.executeUpdate() > 0;
        }
    }
}
