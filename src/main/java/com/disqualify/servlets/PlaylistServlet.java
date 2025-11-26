package com.disqualify.servlets;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;

@WebServlet("/api/playlists")
public class PlaylistServlet extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	throws IOException{
		
        String json = """
        {
          "trending": [
              {"name":"Top Hits 2025","cover":"img/top_hits.jpg"},
              {"name":"Pop Vibes","cover":"img/pop_vibes.jpg"}
          ],
          "suggested": [...],
          "yourPlaylists": [...]
        }
        """;
        
        resp.setContentType("application/json");
        resp.getWriter().write(json);
	}
}