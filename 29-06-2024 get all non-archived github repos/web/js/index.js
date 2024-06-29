document.getElementById("get_repos").addEventListener("click", () => {
  const username = document.getElementById("username_input").value;
  const accessToken = document.getElementById("token_input").value;
  const dataContainer = document.getElementById("data_container");

  if (!username || !accessToken) {
    console.log("Missing username or access token");
    dataContainer.innerHTML =
      '<div class="self-center">Missing username or access token ✝️💞 please check your inputs once again</div>';
    return;
  }
  dataContainer.innerHTML =
    '<div class="loading loading-spinner loading-lg self-center"></div>';

  const uri = `https://api.github.com/users/${username}/repos`;
  const headers = {
    Authorization: `token ${accessToken}`,
  };

  getRepos(uri, headers)
    .then((repos) => {
      dataContainer.innerHTML = `
    <table class="table table-pin-rows self-start">
      <thead>
        <tr>
          <th>Repository Name</th>
          <th>Repository Link</th>
        </tr>
      </thead>
      <tbody>
        ${repos
          .map(
            (repo) => `
          <tr>
            <td>${repo.name.replace(/-/g, " ")}</td>
            <td>
              <a
                class="btn btn-ghost"
                href="${repo.html_url}"
              >
                Visit Repository
              </a>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Total Repos: ${repos.length}</td>
        </tr>
      </tfoot>
    </table>
  `;
    })
    .catch((error) => {
      console.log(error);
      dataContainer.innerHTML = `<div class="self-center">${error.message} ✝️💖 double-check your inputs, maybe you misspelled a username or the token</div>`;
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
  repos = repos.filter((repo) => !repo.archived);
  repos.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const reposAmount = repos.length;

  if (reposAmount < 2) {
    console.log("No repos found");
    return {};
  }
  console.log(`Found ${reposAmount} repos`);
  return repos;
};
