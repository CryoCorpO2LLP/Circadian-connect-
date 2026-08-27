import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# I will just replace `q: '` with `q: \`` and `', opts:` with `` `, opts: ``
content = content.replace("q: '", "q: `")
content = content.replace("', opts:", "`, opts:")
content = content.replace("text: '", "text: `")
content = content.replace("' }", "` }")

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed quotes.")
