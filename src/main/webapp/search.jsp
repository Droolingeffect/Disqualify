<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.disqualify.Song" %> <!-- name of the package. song is a model -->
<%
    List<Song> songs = (List<Song>) request.getAttribute("songs");
    String query = (String) request.getAttribute("query");
%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Disqualify - Search</title>

    <!-- FontAwesome & Google Fonts -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@100;200;300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="HomeStyle.css" />
    <link rel="stylesheet" href="search.css" />
  </head>

  <body>
    <header class="header">
      <a href="homepage.html" class="logo">Disqualify</a>
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" class="menu-icon">
        <span class="fa fa-bars"></span>
      </label>

      <nav class="navbar">
        <div class="search-form">
		    <form action="search" method="get">
		        <input type="text"
		               name="q"
		               placeholder="Search songs or artists..."
		               id="searchInputHeader">
		        
		        <button type="submit">
		            <i class="fa fa-search"></i>
		        </button>
	    </form>	
	</div>


        <a href="homepage.html"><i class="fa fa-home"></i> Home</a>
        <a href="search"><i class="fa fa-search"></i> Search</a>
        <a href="playlist.html"><i class="fa fa-folder"></i> Playlist</a>
        <a href="settings.html"><i class="fa fa-cog"></i> Settings</a>
        <a href="#"><i class="fa fa-sign-out"></i> Logout</a>
      </nav>
    </header>

    <div class="main-content">
      <section class="search-section">
        <h1 style="padding-bottom: 1rem; text-align: center;">Find Your Music</h1>

        <div class="search-bar">
          <form action="search" method="get" style="display:flex; gap:1rem;">
            <input
              type="text"
              id="searchInput"
              name="q"
              placeholder="Search songs, artists, albums..."
              value="<%= query == null ? "" : query %>"
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div id="results" class="results"></div>

        <div id="noResults" class="no-results" style="display: none">
          No matching results found. Showing top genres instead.
        </div>

        <div class="categories" id="genreFallback">
          <div class="category-card pop" onclick="showCategories('Pop')">
            Pop
          </div>
          <div
            class="category-card hiphop"
            onclick="showCategories('Hip-Hop')"
          >
            Hip-Hop
          </div>
          <div
            class="category-card children"
            onclick="showCategories('Children')"
          >
            Children
          </div>
          <div class="category-card indie" onclick="showCategories('Indie')">
            Indie
          </div>
          <div class="category-card rnb" onclick="showCategories('R&B')">
            R&B
          </div>
          <div class="category-card rock" onclick="showCategories('Rock')">
            Rock
          </div>
          <div class="category-card kpop" onclick="showCategories('K-Pop')">
            K-Pop
          </div>
          <div
            class="category-card alternative"
            onclick="showCategories('Alternative')"
          >
            Alternative
          </div>
          <div class="category-card sleep" onclick="showCategories('Sleep')">
            Sleep
          </div>
          <div class="category-card latin" onclick="showCategories('Latin')">
            Latin
          </div>
        </div>

        <h2 style="margin-top: 5rem">Top 20 Songs</h2>
        
	     <%
    String dbError = (String) request.getAttribute("dbError");
    int songCount = (songs == null ? 0 : songs.size());
		%>

		<p style="color:#aaa; font-size:0.9rem;">
		    Found <%= songCount %> song(s)
		    <% if (dbError != null) { %>
		        • <span style="color:#ff8080;">DB error: <%= dbError %></span>
		    <% } %>
		</p>
        

        <div class="table-responsive">
          <table class="table table-scrollable">
            <thead class="text-center">
              <tr>
                <th>Song name</th>
                <th>Album</th>
                <th>Artist</th>
                <th>Genre</th>
                <th>Year</th>
              </tr>
            </thead>

            <tbody class="table-hover text-center" id="songTable">
	 <% if (songs != null && !songs.isEmpty()) {
			for (Song s : songs) {
 	 %>
    <tr>
      <td><%= s.getTitle() %></td>
      <td>
        <div class="td-album">
          <img
            src="<%= s.getCoverImage() %>"
            alt="album-cover"
            class="album-cover"
          />
          <%= s.getAlbum() %>
        </div>
      </td>
      <td><%= s.getArtist() %></td>
      <td><%= s.getGenre() %></td>
      <td><%= s.getYear() %></td>
    </tr>
  <%
        }
    } else {
  %>
    <tr>
      <td colspan="5">No songs found.</td>
    </tr>
  <%
    }
  %>
</tbody>

          </table>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h2>About Disqualify</h2>
          <p>
            Disqualify is a hub for thinkers, creators, and visionaries sharing
            ideas that shape the future of technology and sustainability.
          </p>
        </div>
        <div class="footer-section links">
          <h2>Quick Access</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Discover</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Insights</a></li>
            <li><a href="#">Join Us</a></li>
          </ul>
        </div>
        <div class="footer-section contact">
          <h2>Contact</h2>
          <p>
            Email:
            <a href="mailto:hello@innovatesphere.com"
              >hello@innovatesphere.com</a
            >
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2025 Disqualify. All rights reserved.
      </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      function search(search_field_id) {
        var found, table, tr, td, i, j;
        const searchValue = document
          .getElementById(search_field_id)
          .value.trim()
          .toLowerCase();
        table = document.getElementById("songTable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
          found = false;
          td = tr[i].getElementsByTagName("td");
          for (j = 0; j < td.length; j++) {
            if (
              td[j].textContent.toLowerCase().includes(searchValue) ||
              searchValue == ""
            ) {
              found = true;
            }
          }
          if (found) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }

      function showCategories(genre) {
        var found, table, tr, td, i, j;
        table = document.getElementById("songTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          found = false;
          td = tr[i].getElementsByTagName("td");
          for (j = 0; j < td.length; j++) {
            if (td[j].textContent == genre) {
              found = true;
            }
          }
          if (found) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }

      const params = new URLSearchParams(window.location.search);
      const qParam = params.get("q");

      window.onload = function () {
        if (qParam) {
          document.getElementById("searchInput").value = qParam;
          search("searchInput");
        }
      };
    </script>
  </body>
</html>
