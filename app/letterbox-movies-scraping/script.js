const puppeteer = require("puppeteer");

(async () => {
  // Set up Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the actor's Letterboxd page
  let actorName = "Actor Name"; // Replace with the actual actor's name
  actorName = str.toLowerCase().replace(/\s+/g, "-");
  await page.goto(`https://letterboxd.com/actor/${actorName}/by/rating/`);

  // Scrape movie information
  const movies = await page.evaluate(() => {
    const movieElements = document.querySelectorAll(".film-detail-content");
    const moviesData = [];

    for (const movieElement of movieElements) {
      const title = movieElement.querySelector(
        ".film-detail-content-header h2"
      ).textContent;
      const rating = parseFloat(
        movieElement.querySelector(".rating span").textContent
      );

      if (!isNaN(rating) && rating >= 2.5) {
        moviesData.push({ title, rating });
      }
    }

    return moviesData;
  });

  // Add selected movies to watchlist (you might need to implement this)
  const watchlist = [];

  for (const movie of movies) {
    watchlist.push(movie.title);
  }

  // Close the browser
  await browser.close();

  // Print the watchlist
  console.log("Movies added to watchlist:");
  console.log(watchlist);
})();
