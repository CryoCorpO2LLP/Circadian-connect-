import os

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Could not read {filepath}: {e}")
        return

    original = content
    # Replace 'purple' with 'purple'
    content = content.replace('purple', 'purple')
    content = content.replace('Purple', 'Purple')
    content = content.replace('PURPLE', 'PURPLE')
    
    # Replace the HSL color
    content = content.replace('270 80% 30%', '270 80% 30%')
    content = content.replace('270 20% 96%', '270 20% 96%')
    
    # Replace the RGB color
    content = content.replace('rgba(107, 33, 168', 'rgba(107, 33, 168')
    content = content.replace('rgba(107,33,168', 'rgba(107,33,168')
    content = content.replace('107,33,168', '107,33,168')
    content = content.replace('107, 33, 168', '107, 33, 168')

    if content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
        except Exception as e:
            print(f"Could not write {filepath}: {e}")

def main():
    root_dir = r"c:\Users\Admin\OneDrive\Documents\Circadian Website\Landing page"
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if 'node_modules' in dirpath or '.git' in dirpath:
            continue
        for filename in filenames:
            if filename.endswith(('.js', '.jsx', '.css', '.html', '.ts', '.tsx', '.json', '.py')):
                filepath = os.path.join(dirpath, filename)
                replace_in_file(filepath)

if __name__ == "__main__":
    main()
