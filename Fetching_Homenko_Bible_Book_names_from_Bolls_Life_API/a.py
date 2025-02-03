
import urllib.request, json 

u='https://bolls.life/get-books/HOM/'
r=[]
with urllib.request.urlopen(u) as url:
    data = json.load(url)
    r=[B['name'] for B in data]
print(r[:67])