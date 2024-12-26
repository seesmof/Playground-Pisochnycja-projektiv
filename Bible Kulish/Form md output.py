import os
import re

output_lines=[]
root_folder=os.path.dirname(os.path.abspath(__file__))
revision_folder=os.path.join(root_folder,'Revision')

for file_name in os.listdir(revision_folder):
    file_path=os.path.join(revision_folder,file_name)
    with open(file_path,encoding='utf-8',mode='r') as f:
        lines=f.readlines()
    
    Book_name=file_name[:3]
    for line in lines:
        if r'\c ' in line:
            chapter_number=line[3:].strip()
            res=f'### {Book_name} {chapter_number}'
            output_lines.append(res)
        elif r'\p' in line:
            output_lines.append('')
        elif r'\v ' in line:
            line=line[3:].strip()
            verse_number,contents=line.split(maxsplit=1)
            WJ_COLOR='#7e1717'
            closing_tag_pattern=r'\\\w+\*'
            contents=re.sub(closing_tag_pattern,'</span>',contents)
            contents=contents.replace('\\wj ',f'<span style="color: {WJ_COLOR}">')
            res=f'<sup>{verse_number}</sup> {contents}'
            output_lines.append(res)

output_file=os.path.join(root_folder,'a.md')
with open(output_file,encoding='utf-8',mode='w') as f:
    f.write('\n'.join(output_lines))