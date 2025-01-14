import string
import os
import re

root_folder_path=os.path.dirname(os.path.abspath(__file__))
target_file_path=os.path.join(root_folder_path,'test.md')
with open(target_file_path,encoding='utf-8',mode='r') as f:
    text=f.read()

'''
replace all ` -` with em dash 
replace all ` "` and `" ` with opening and closing double brackets 
replace all ` '` and `' ` with opening and closing single brackets 
replace all `\w!` and `!\w` with embeded accent mark 
replace all `\w'` and `'\w` with apostrophe symbols 
'''

text=text.replace(' -',' —')

accent_mark='\u0301'
text=re.sub(r'(\s)-',r'\1—',text)
text=re.sub(r'-(\s)',r'—\1',text)

text=re.sub(r'(\w)!',rf'\1{accent_mark}',text)
text=re.sub(r'!(\w)',rf'{accent_mark}\1',text)

text=re.sub(rf'(\w)\'([\w{string.punctuation}])',r'\1ʼ\2',text)

def replace_at_index(text,index=0,replacement=''):
    return f'{text[:index]}{replacement}{text[index+1:]}'

last_closing=False
for i,symbol in enumerate(text):
    if symbol=='\'':
        if not last_closing: 
            text=replace_at_index(text,i,'‹')
            last_closing=True
        else: 
            text=replace_at_index(text,i,'›')

last_closing=False
for i,symbol in enumerate(text):
    if symbol=='\"':
        if not last_closing: 
            text=replace_at_index(text,i,'«')
            last_closing=True
        else: 
            text=replace_at_index(text,i,'»')

with open(target_file_path,encoding='utf-8',mode='w') as f:
    f.write(text)