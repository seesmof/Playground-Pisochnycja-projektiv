import os
import re


current_dir: str = os.path.dirname(os.path.abspath(__file__))
inFile = os.path.join(current_dir, "in.usfm")
outFile = os.path.join(current_dir, "out.md")

with open(inFile, "r", encoding="utf-8") as file:
    lines = file.readlines()

result = []
for line in lines:
    if "\\toc1 " in line:
        a = line.replace("\\toc1 ", "")
        result.append(f"# {a}")

    if "\\c" in line:
        a = line.replace("\\c ", "")
        result.append(f"## Chapter {a}")
    if "\\s1" in line:
        a = line.replace("\\s1 ", "")
        result.append(f"### {a}")
    if "\\s2" in line:
        a = line.replace("\\s2 ", "")
        result.append(f"#### {a}")
    if "\\s3" in line:
        a = line.replace("\\s3 ", "")
        result.append(f"##### {a}")
    if "\\s4" in line:
        a = line.replace("\\s4 ", "")
        result.append(f"###### {a}")

    if "\\b" in line:
        result.append("\n")
    if "\\v " in line:
        a = line.replace("\\v ", "")
        num, content = a.split(" ", 1)

        pat = r"\\f\s*(.*?)\\f\*"
        content = re.sub(pat, "", content)

        content = content.replace("\\wj*", "</span>")
        content = content.replace("\\wj ", "<span style='color:Crimson'>")

        content = content.replace("\\qt*", "</span>")
        content = content.replace("\\qt ", "<span style='font-variant: small-caps'>")

        result.append(f"**{num.strip()}** {content.strip()}\n")

with open(outFile, "w", encoding="utf-8") as file:
    file.writelines(result)
