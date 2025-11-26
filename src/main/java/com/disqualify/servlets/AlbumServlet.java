package com.disqualify.servlets;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;

@WebServlet("/api/album")
public class AlbumServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
    			String albumID = req.getParameter("album");
    			
    			String json = switch (albumID) {
    			case "blonde" -> AlbumData.BLONDE;
    			case "channel-orange" -> AlbumData.CHANNEL_ORANGE;
    			default -> "{\"error\": \"Album Not Found\"}";
    			};
    			
    			resp.setContentType("application/json");
    			resp.getWriter().write(json)
;    }
}