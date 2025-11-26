package com.disqualify.servlets;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/search")
public class SearchServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/disqualify_db?useSSL=false&serverTimezone=UTC"; //change disqualify_db to name of database on MySQL Workbench
    private static final String JDBC_USER = "root"; //change if needed
    private static final String JDBC_PASS = ""; //place your password for MySQL Workbench, if no password then leave empty

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String q = request.getParameter("q");
        if (q == null) q = "";

        List<Song> songs = new ArrayList<>();
        String dbError = null;

        try {
            // load driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASS)) {

                String sql;
                PreparedStatement stmt;

                if (q.trim().isEmpty()) {
                    // no search term → return all songs
                    sql = "SELECT id, title, album, artist, genre, year, cover_image FROM songs";
                    stmt = conn.prepareStatement(sql);
                } else {
                    // search by title / artist / album
                    sql = "SELECT id, title, album, artist, genre, year, cover_image " +
                          "FROM songs " +
                          "WHERE title LIKE ? OR artist LIKE ? OR album LIKE ?";
                    stmt = conn.prepareStatement(sql);
                    String like = "%" + q.trim() + "%";
                    stmt.setString(1, like);
                    stmt.setString(2, like);
                    stmt.setString(3, like);
                }

                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        Song s = new Song();
                        s.setId(rs.getInt("id"));
                        s.setTitle(rs.getString("title"));
                        s.setAlbum(rs.getString("album"));
                        s.setArtist(rs.getString("artist"));
                        s.setGenre(rs.getString("genre"));
                        s.setYear(rs.getInt("year"));
                        s.setCoverImage(rs.getString("cover_image"));
                        songs.add(s);
                    }
                }

            }
        } catch (Exception e) {
            e.printStackTrace();           // shows full stack trace in Tomcat console
            dbError = e.getMessage();      // short message for the page
        }

        // send everything to JSP
        request.setAttribute("songs", songs);
        request.setAttribute("query", q);
        request.setAttribute("dbError", dbError);

        request.getRequestDispatcher("/search.jsp").forward(request, response);
    }
}
