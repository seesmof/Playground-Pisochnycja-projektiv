import os
import requests
from dotenv import load_dotenv
from rich.console import Console
from rich.traceback import install

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
    console.print(f"[green]Found {repos_amount} repos[/]")

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
console.print(
    f"Found {len(non_archived_repos)} non-archived repos among {len(repos)} repos: {[repo['name'] for repo in non_archived_repos]}"
)
