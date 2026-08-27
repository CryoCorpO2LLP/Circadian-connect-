import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# Restore ` } to ' } globally to fix broken stuff
content = content.replace("` }", "' }")

# Restore label: ` to label: '
content = content.replace("label: `", "label: '")

# Restore left: ` to left: '
content = content.replace("left: `", "left: '")
content = content.replace("top: `", "top: '")

# Fix the specific text that has an apostrophe
content = content.replace("it's", "it\\'s")
content = content.replace("organisation\\'s", "organisation's") # we already have backticks for `q:` so we don't need \' there

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Restored syntax.")
