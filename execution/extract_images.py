import os
import re
import base64
import hashlib
from bs4 import BeautifulSoup

def extract_images(html_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Regex to find base64 images in src and CSS url()
    # pattern = r'data:image/(?P<ext>jpg|jpeg|png|gif|webp|svg\+xml);base64,(?P<data>[A-Za-z0-9+/=]+)'
    # Using BeautifulSoup for HTML tags and regex for style attributes/tags
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    image_map = {} # Hash -> filename
    
    # 1. Handle <img> tags and other tags with src
    tags_with_src = soup.find_all(src=re.compile(r'^data:image/'))
    for tag in tags_with_src:
        src = tag['src']
        new_path = save_base64_image(src, output_dir, image_map)
        if new_path:
            tag['src'] = new_path

    # 2. Handle CSS in <style> tags
    styles = soup.find_all('style')
    for style in styles:
        if style.string:
            style.string = replace_base64_in_css(style.string, output_dir, image_map)

    # 3. Handle inline styles
    elements_with_style = soup.find_all(style=re.compile(r'data:image/'))
    for el in elements_with_style:
        el['style'] = replace_base64_in_css(el['style'], output_dir, image_map)

    # Save the modified HTML
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(soup.prettify())

def save_base64_image(data_uri, output_dir, image_map):
    try:
        header, encoded = data_uri.split(',', 1)
        ext = header.split('/')[1].split(';')[0]
        if ext == 'svg+xml':
            ext = 'svg'
        
        image_data = base64.b64decode(encoded)
        img_hash = hashlib.md5(image_data).hexdigest()
        
        if img_hash in image_map:
            return image_map[img_hash]
        
        filename = f"img_{img_hash}.{ext}"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'wb') as f:
            f.write(image_data)
        
        # Relative path for HTML
        rel_path = f"assets/images/{filename}"
        image_map[img_hash] = rel_path
        return rel_path
    except Exception as e:
        print(f"Error saving image: {e}")
        return None

def replace_base64_in_css(css_text, output_dir, image_map):
    pattern = r'url\(["\']?(data:image/[^;]+;base64,[^"\']+)["\']?\)'
    
    def replacement(match):
        data_uri = match.group(1)
        new_path = save_base64_image(data_uri, output_dir, image_map)
        if new_path:
            return f'url("../{new_path}")' # Assuming index.html is in root
        return match.group(0)

    # Fix: If index.html is in root, and assets/images is in root, relative path from HTML is assets/images/file.
    # But if the CSS is in <style> in index.html, it should be assets/images/file.
    # If it's in a CSS file in assets/css, it would be ../images/file.
    # Since we are modifying index.html, I'll use assets/images/file.
    
    def replacement_for_html(match):
        data_uri = match.group(1)
        new_path = save_base64_image(data_uri, output_dir, image_map)
        if new_path:
            return f'url("{new_path}")'
        return match.group(0)

    return re.sub(pattern, replacement_for_html, css_text)

if __name__ == "__main__":
    extract_images('index.html', 'assets/images')
    print("Extraction complete.")
