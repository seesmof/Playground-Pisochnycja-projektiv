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
  console.log(getAccessToken(), getUsername());
});
