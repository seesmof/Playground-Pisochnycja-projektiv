import string
import os
import re

root_folder_path=os.path.dirname(os.path.abspath(__file__))
target_file_path=os.path.join(root_folder_path,'test.md')
with open(target_file_path,encoding='utf-8',mode='r') as f:
    text=f.read()

text=text.replace(' -',' —')

text=re.sub(r'(\s)-',r'\1—',text)
text=re.sub(r'-(\s)',r'—\1',text)

accent_mark='\u0301'
text=re.sub(rf'([аеєиіїоуюяАЕЄИІЇОУЮЯ])!([\w{string.punctuation}])',rf'\1{accent_mark}\2',text)

text=re.sub(rf'(\w)\'([\w{string.punctuation}])',r'\1ʼ\2',text)

def replace_at_index(text,index=0,replacement=''):
    return f'{text[:index]}{replacement}{text[index+1:]}'

single_last_closing=False
double_last_closing=False
for i,symbol in enumerate(text):
    if symbol=='\'':
        if not single_last_closing: 
            text=replace_at_index(text,i,'‹')
            single_last_closing=True
        else: 
            text=replace_at_index(text,i,'›')
    elif symbol=='\"':
        if not double_last_closing: 
            text=replace_at_index(text,i,'«')
            double_last_closing=True
        else: 
            text=replace_at_index(text,i,'»')

with open(target_file_path,encoding='utf-8',mode='w') as f:
    f.write(text)