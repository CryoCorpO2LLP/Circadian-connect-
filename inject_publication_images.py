import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

images = [
    "/india_nutrition.png",
    "/proj1_real.png",
    "/proj2_real.png",
    "/proj3_real.png",
    "/proj4_real.png",
    "/proj5_real.png",
    "/project_1.png",
    "/india_education.png",
    "/proj6_real.png",
    "/proj7_real.png",
    "/proj8_network.png",
    "/proj9_real.png",
    "/project_3.png",
    "/proj10_real.png",
    "/proj11_real.png",
    "/proj12_real.png",
    "/project_4.png",
    "/project_5.png",
    "/project_6.png",
    "/project_8.png",
    "/project_9.png",
    "/project_10.png",
    "/project_11.png"
]

# Find the researchPublications array
pattern = r"const researchPublications = \[\s*(.*?)\s*\];"
match = re.search(pattern, content, flags=re.DOTALL)
if match:
    items_str = match.group(1)
    items = re.findall(r"\{.*?\}", items_str, flags=re.DOTALL)
    new_items = []
    for i, item in enumerate(items):
        img = images[i % len(images)]
        # Add image to the end of the dict if not already there
        if "image:" not in item:
            item = item.replace(" }", f", image: \"{img}\" }}")
        new_items.append(item)
    
    new_items_str = ",\n    ".join(new_items)
    new_array = f"const researchPublications = [\n    {new_items_str}\n  ];"
    content = content.replace(match.group(0), new_array)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected images into researchPublications.")
