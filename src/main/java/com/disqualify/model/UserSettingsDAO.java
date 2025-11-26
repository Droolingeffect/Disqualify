package com.disqualify.model;

import java.sql.*;
import org.json.JSONObject;

public class UserSettingsDAO {
    private Connection conn;

    public UserSettingsDAO(Connection conn) {
        this.conn = conn;
    }

    public boolean updateUserSettings(int userId, String theme, String notifications, String privacy) 
            throws SQLException {
        
        String sql = "INSERT INTO user_settings (user_id, theme, notifications, privacy) " +
                    "VALUES (?, ?, ?, ?) " +
                    "ON DUPLICATE KEY UPDATE theme = ?, notifications = ?, privacy = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            stmt.setString(2, theme);
            stmt.setString(3, notifications);
            stmt.setString(4, privacy);
            stmt.setString(5, theme);
            stmt.setString(6, notifications);
            stmt.setString(7, privacy);
            
            return stmt.executeUpdate() > 0;
        }
    }

    public String getUserSettings(int userId) throws SQLException {
        String sql = "SELECT theme, notifications, privacy FROM user_settings WHERE user_id = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                JSONObject settings = new JSONObject();
                settings.put("theme", rs.getString("theme"));
                settings.put("notifications", rs.getString("notifications"));
                settings.put("privacy", rs.getString("privacy"));
                return settings.toString();
            }
            return null;
        }
    }
}