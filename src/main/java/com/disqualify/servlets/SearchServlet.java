package com.disqualify.servlets;

import java.io.*;
import java.sql.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import com.disqualify.util.DatabaseUtil;

@WebServlet("/search")
public class SearchServlet extends HttpServlet {
    private Connection conn;

    @Override
    public void init() throws ServletException {
        try {
            conn = DatabaseUtil.getConnection();
            createSongsTableIfNotExists(); // AUTO-CREATE TABLE
        } catch (Exception e) {
            throw new ServletException(e);
        }
    }
    
    private void createSongsTableIfNotExists() throws SQLException {
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
            System.out.println("songs table created or already exists");
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        String query = req.getParameter("q");
        
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();
        
        if (query != null && !query.trim().isEmpty()) {
            out.write("Searching for: " + query);
        } else {
            out.write("SearchServlet is running! Send 'q' parameter to search.");
        }
    }
}