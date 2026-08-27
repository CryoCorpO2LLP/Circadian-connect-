import sys

jsx_file = "src/App.jsx"

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace "Initial Inquiry Questionnaire" with "Enquire Now" inside buttons
content = content.replace("Initial Inquiry Questionnaire", "Enquire Now")

# Replace "Initial Inquiry" with "Enquire Now" inside buttons
# Wait, let's just replace the exact text we added
content = content.replace(">Initial Inquiry<", ">Enquire Now<")

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Button text replaced successfully.")
