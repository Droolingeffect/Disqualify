
package com.disqualify.servlets;

import java.io.*;
import java.sql.*;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import com.disqualify.util.DatabaseUtil;
import com.disqualify.model.AccountDAO;
import com.disqualify.model.Account;

@WebServlet("/auth")
public class AuthServlet extends HttpServlet {
    private Connection conn;

    @Override
    public void init() throws ServletException {
        try {
            conn = DatabaseUtil.getConnection();
        } catch (Exception e) {
            throw new ServletException(e);
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.getWriter().write("AuthServlet is running, use POST for login and signup.");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String action = req.getParameter("action");
        String email = req.getParameter("email");
        String password = req.getParameter("password");
        String type = req.getParameter("type");

        AccountDAO dao = new AccountDAO(conn);

        try {
            if ("register".equals(action)) {
                boolean created = dao.createAccount(email, password, type);
                resp.getWriter().write(created ? "Account created" : "Failed");

            } else if ("login".equals(action)) {
                Account acc = dao.getAccountByEmail(email);
                if (acc != null && acc.getPassword().equals(password)) {
                    req.getSession().setAttribute("user", acc);
                    resp.getWriter().write("Login successful");
                } else {
                    resp.getWriter().write("Invalid credentials");
                }
            }
        } catch (SQLException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                resp.setStatus(400);
                resp.getWriter().write("Duplicate entry: Email already exists.");
            } else {
                throw new ServletException(e);
            }
        }
    }
}