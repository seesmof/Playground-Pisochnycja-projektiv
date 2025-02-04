import subprocess

def copy(text: str):
    command=f'echo {text.strip()}|clip'
    return subprocess.check_call(command,shell=True)


base_url='https://www.startpage.com/sp/search?q={q} '
connector=' OR '
site_specified='site:'

sites='gty.org ligonier.org ebible.com desiringgod.org'
sites_list=sites.strip().split(' ')
prefixed_sites_list=[site_specified+site for site in sites_list]
joined_sites=connector.join(prefixed_sites_list)

query=base_url+joined_sites
print(query)
copy(query)

# site:shuba.life OR site:retsepty.in.ua