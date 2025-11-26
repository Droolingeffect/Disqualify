package com.disqualify.servlets;

import java.io.*;
import java.sql.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import com.disqualify.util.DatabaseUtil;
import com.disqualify.model.UserSettingsDAO;
import com.disqualify.model.User;

@WebServlet("/settings")
public class SettingsServlet extends HttpServlet {
    private Connection conn;

    @Override
    public void init() throws ServletException {
        try {
            conn = DatabaseUtil.getConnection();
            createSettingsTableIfNotExists(); // AUTO-CREATE TABLE
        } catch (Exception e) {
            throw new ServletException(e);
        }
    }
    
    private void createSettingsTableIfNotExists() throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS user_settings (" +
                     "user_id INT PRIMARY KEY, " +
                     "theme VARCHAR(50) DEFAULT 'dark', " +
                     "notifications VARCHAR(50) DEFAULT 'enabled', " +
                     "privacy VARCHAR(50) DEFAULT 'public', " +
                     "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, " +
                     "FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE)";
        
        try (Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
            System.out.println("user_settings table created or already exists");
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        // Get current user from session
        User user = (User) req.getSession().getAttribute("user");
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("User not logged in");
            return;
        }

        try {
            UserSettingsDAO settingsDAO = new UserSettingsDAO(conn);
            String userSettings = settingsDAO.getUserSettings(user.getId());
            
            resp.setContentType("application/json");
            resp.getWriter().write(userSettings != null ? userSettings : "{}");
            
        } catch (SQLException e) {
            throw new ServletException("Database error while fetching settings", e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // Get current user from session
        User user = (User) req.getSession().getAttribute("user");
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("User not logged in");
            return;
        }

        String theme = req.getParameter("theme");
        String notifications = req.getParameter("notifications");
        String privacy = req.getParameter("privacy");

        try {
            UserSettingsDAO settingsDAO = new UserSettingsDAO(conn);
            boolean success = settingsDAO.updateUserSettings(
                user.getId(), 
                theme, 
                notifications, 
                privacy
            );

            if (success) {
                resp.getWriter().write("Settings saved successfully");
            } else {
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("Failed to save settings");
            }
            
        } catch (SQLException e) {
            throw new ServletException("Database error while saving settings", e);
        }
    }
}