import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# Fix the broken text backticks
content = re.sub(r"(text: `.*?)' \}", r"\1` }", content)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed text backticks.")
