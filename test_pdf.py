import fitz

doc = fitz.open("public/about_ppt.pdf")
for i in range(len(doc)):
    page = doc.load_page(i)
    text = page.get_text()
    print(f"--- Slide {i} ---")
    print(text.strip())
