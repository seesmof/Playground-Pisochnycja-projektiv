import os
from shutil import copy2
teka=os.path.dirname(os.path.abspath(__file__))
fajly=os.path.join(teka,"USFM")
projekt=os.path.join("C:\\My Paratext 9 Projects\\FBK")
for f in os.listdir(fajly): copy2(os.path.join(fajly,f),os.path.join(projekt,f))