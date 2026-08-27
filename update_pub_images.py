import re

jsx_file = "src/App.jsx"
with open(jsx_file, "r", encoding="utf-8") as f:
    content = f.read()

# I will replace the image value of each dictionary manually based on its category
def repl(match):
    text = match.group(0)
    if "Nutrition Governance" in text:
        if "Role of State in Public Private Partnerships" in text:
            img = "/healthcare_partnerships_1780997153775.png"
        elif "Andaman" in text:
            img = "/india_nutrition.png"
        elif "Jeevandayee Arogya" in text:
            img = "/healthcare_partnerships_1780997153775.png"
        else:
            img = "/child_nutrition_policy_1780997057177.png"
    elif "Higher Education" in text:
        if "OBC Reservation Policy" in text:
            img = "/social_policy_india_1780997185963.png"
        else:
            img = "/higher_education_diplomacy_1780997073759.png"
    elif "ESG" in text:
        if "Narmada Sardar Sarovar Dam" in text:
            img = "/narmada_dam_esg_1780997095791.png"
        elif "Urban Age Project" in text:
            img = "/urban_age_cities_1780997112920.png"
        else:
            img = "/social_policy_india_1780997185963.png"
    elif "Women in Science" in text:
        img = "/women_in_stem_leadership_1780997130040.png"
    else:
        img = "/academic_footprint.png"
    
    # Replace existing image URL
    new_text = re.sub(r'image:\s*"[^"]+"', f'image: "{img}"', text)
    return new_text

# Find the researchPublications array
pattern = r"const researchPublications = \[\s*(.*?)\s*\];"
match = re.search(pattern, content, flags=re.DOTALL)
if match:
    items_str = match.group(1)
    items = re.findall(r"\{.*?\}", items_str, flags=re.DOTALL)
    new_items = []
    for item in items:
        new_items.append(repl(re.match(r"(.*)", item, flags=re.DOTALL)))
    
    new_items_str = ",\n    ".join(new_items)
    new_array = f"const researchPublications = [\n    {new_items_str}\n  ];"
    content = content.replace(match.group(0), new_array)

with open(jsx_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated research publications with contextual images.")
