const getAccessToken = () => {
  const accessToken = document.getElementById("token_input").value;
  return accessToken;
};
const getUsername = () => {
  const username = document.getElementById("username_input").value;
  return username;
};
const headers = {
  Authorization: `token ${getAccessToken()}`,
};
const uri = `https://api.github.com/users/${getUsername()}/repos`;

document.getElementById("get_repos").addEventListener("click", () => {
  const username = getUsername();
  const accessToken = getAccessToken();
  console.log(username, accessToken);
  if (!username || !accessToken) {
    console.log("Missing username or access token");
    return;
  }
  const dataContainer = document.getElementById("data_container");
  dataContainer.innerHTML = "";
  getRepos(uri, headers).then((repos) => {
    console.log(repos);
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    repos.forEach((repo) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const linkCell = document.createElement("td");
      nameCell.textContent = repo.name;
      linkCell.innerHTML = `<a class="btn btn-ghost" href="${repo.html_url}">Go</a>`;
      row.appendChild(nameCell);
      row.appendChild(linkCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    dataContainer.appendChild(table);
  });

  console.log("clicked");
});

const getRepos = async (uri, headers) => {
  let repos = [];
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    const reponse = await fetch(`${uri}?page=${page}`, { headers });
    const data = await reponse.json();
    if (!data || data.length === 0) {
      hasMorePages = false;
    } else {
      repos = [...repos, ...data];
      page++;
    }
  }

  const reposAmount = repos.length;

  if (reposAmount < 2) {
    console.log("No repos found");
    return {};
  }
  console.log(`Found ${reposAmount} repos`);
  return repos;
};
