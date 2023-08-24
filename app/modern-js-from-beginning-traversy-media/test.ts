const baseUrl = "http://naturegpt.000webhostapp.com/pocketgpt/api/";
const relativeUrl = "api/v1/chat/completions";
const fullUrl = new URL(relativeUrl, baseUrl);

fetch(fullUrl)
  .then((response) => response.json())
  .then((data) => {
    // Handle the retrieved data
    console.log(data);
  })
  .catch((error) => {
    // Handle errors
    console.error("An error occurred:", error);
  });
