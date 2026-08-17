import os
import glob

html_files = glob.glob('*.html')
replacements = {
    'href="index.html"': 'href="/"',
    'href="about.html"': 'href="/about"',
    'href="services.html"': 'href="/services"',
    'href="contact.html"': 'href="/contact"',
    'href="portfolio.html"': 'href="/portfolio"',
    'href="login.html"': 'href="/login"',
    'href="index.html#': 'href="/#',
    'href="services.html#': 'href="/services#',
    'href="about.html#': 'href="/about#',
    'href="contact.html#': 'href="/contact#'
}

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated links in {len(html_files)} files.")
