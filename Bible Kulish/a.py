import os

root=os.path.dirname(os.path.abspath(__file__))
revision_based_on_WEB=os.path.join(root,'WEB_Based_Revision')
revision_files=os.listdir(revision_based_on_WEB)

for file_name in revision_files:
    file_path=os.path.join(revision_based_on_WEB,file_name)
    with open(file_path,encoding='utf-8',mode='r') as f:
        lines=f.readlines()
    lines=[l.strip() for l in lines]
    with open(file_path,encoding='utf-8',mode='w') as f:
        f.write('\n'.join(lines))