package com.disqualify.servlets;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import jakarta.servlet.*;
import java.io.*;
import java.sql.*;

import com.disqualify.util.DatabaseUtil;

@WebServlet("/test-db")
public class TestDB extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();

        try (Connection conn = DatabaseUtil.getConnection()) {
            out.println("SUCCESS: Connected to MySQL!");
            
            // Create user_settings table if it doesn't exist
            createUserSettingsTable(conn, out);
            
            // Create songs table if it doesn't exist
            createSongsTable(conn, out);
            
        } catch (Exception e) {
            out.println("ERROR connecting to MySQL: " + e.getMessage());
            e.printStackTrace(out);
        }
    }
    
    private void createUserSettingsTable(Connection conn, PrintWriter out) throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS user_settings (" +
                     "user_id INT PRIMARY KEY, " +
                     "theme VARCHAR(50) DEFAULT 'dark', " +
                     "notifications VARCHAR(50) DEFAULT 'enabled', " +
                     "privacy VARCHAR(50) DEFAULT 'public', " +
                     "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, " +
                     "FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE)";
        
        try (Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
            out.println("SUCCESS: user_settings table created or already exists!");
        } catch (SQLException e) {
            out.println("ERROR creating user_settings table: " + e.getMessage());
            throw e;
        }
    }
    
    private void createSongsTable(Connection conn, PrintWriter out) throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS songs (" +
                     "id INT AUTO_INCREMENT PRIMARY KEY, " +
                     "title VARCHAR(255) NOT NULL, " +
                     "artist VARCHAR(255) NOT NULL, " +
                     "album VARCHAR(255), " +
                     "genre VARCHAR(100), " +
                     "year INT, " +
                     "duration VARCHAR(10), " +
                     "file_path VARCHAR(500), " +
                     "album_cover_url VARCHAR(500), " +
                     "plays INT DEFAULT 0, " +
                     "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        
        try (Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
            out.println("SUCCESS: songs table created or already exists!");
        } catch (SQLException e) {
            out.println("ERROR creating songs table: " + e.getMessage());
            throw e;
        }
    }
}