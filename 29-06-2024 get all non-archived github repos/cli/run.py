import os
import requests
from dotenv import load_dotenv
from rich.console import Console
from rich.traceback import install
from rich.markdown import Markdown as md

install()
load_dotenv()
console = Console()


def get_access_token() -> str:
    return os.getenv("GITHUB_ACCESS_TOKEN")


def get_repos(uri: str) -> dict:
    repos: list = []
    page = 1
    while 1:
        response = requests.get(f"{uri}?page={page}", headers=headers)
        data = response.json()
        if not data:
            break
        repos.extend(data)
        page += 1
    repos_amount: int = len(repos)

    if repos_amount < 2:
        console.print("[red]No repos found![/]")
        return {}
    return repos


access_token: str = get_access_token()
user_name: str = "seesmof"
headers = {"Authorization": f"token {access_token}"}
uri: str = f"https://api.github.com/users/{user_name}/repos"

with console.status("[yellow]Getting repos...[/]"):
    repos = get_repos(uri)
if not repos:
    exit()
non_archived_repos: list[dict] = [repo for repo in repos if not repo["archived"]]
non_archived_repos.sort(key=lambda repo: repo["name"])

console.print(
    f"[green bold]Found {len(non_archived_repos)} repos, praise Jesus Christ our Holy Lord GOD Almighty[/]"
)
for repo in non_archived_repos:
    repo_name: str = repo["name"]
    repo_url: str = repo["html_url"]
    console.print(md(f"[{repo_name}]({repo_url})"))
