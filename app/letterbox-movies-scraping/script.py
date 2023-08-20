import letterboxd

# Replace with your own credentials
username = "your_username"
password = "your_password"

# Authenticate with Letterboxd
session = letterboxd.Session()
session.authenticate(username, password)

# Get movies with actor name and average rating
actor_name = "Tom Hanks"
min_rating = 2.5
movies = session.search_films(actor_name)
for movie in movies:
    if movie.average_rating >= min_rating:
        session.add_to_watchlist(movie)

# Log out of Letterboxd
session.logout()
