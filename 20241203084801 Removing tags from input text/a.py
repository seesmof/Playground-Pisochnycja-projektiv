import os
import re 

root=os.path.dirname(os.path.abspath(__file__))
target=os.path.join(root,'a.txt')
with open(target,encoding='utf-8',mode='r') as f:
    text=f.read()
pattern=r'<.*?>'
text=re.sub(pattern,'',text)
test=' '.join(text.split())
with open(target,encoding='utf-8',mode='w') as f:
    f.write(text)