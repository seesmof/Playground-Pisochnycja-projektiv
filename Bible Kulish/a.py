import os

root=os.path.dirname(os.path.abspath(__file__))
revision_based_on_WEB=os.path.join(root,'WEB_Based_Revision')

older_revision_folder=os.path.join(root,'Revision')
revision_file_names=os.listdir(older_revision_folder)

for file_name in os.listdir(revision_based_on_WEB):
    if 'GLO' in file_name or 'FRT' in file_name: continue
    abbr=file_name.split('.')[0].split('-')[-1]
    print(abbr)
    correct_name=[n for n in revision_file_names if abbr in n][0]
    print(correct_name)

    old=os.path.join(revision_based_on_WEB,file_name)
    new=os.path.join(revision_based_on_WEB,correct_name)
    os.rename(old,new)