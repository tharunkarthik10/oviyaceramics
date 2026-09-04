import os
import re

def html_to_jsx(html):
    match = re.search(r'<body[^>]*>(.*)</body>', html, re.DOTALL | re.IGNORECASE)
    if not match:
        body = html
    else:
        body = match.group(1)
        
    body = body.replace('class="', 'className="')
    body = body.replace('for="', 'htmlFor="')
    
    body = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', body, flags=re.DOTALL)
    
    body = re.sub(r'(<img\b[^>]*?)(?<!/)>', r'\1 />', body)
    body = re.sub(r'(<input\b[^>]*?)(?<!/)>', r'\1 />', body)
    body = re.sub(r'(<br\b[^>]*?)(?<!/)>', r'\1 />', body)
    body = re.sub(r'(<hr\b[^>]*?)(?<!/)>', r'\1 />', body)
    
    body = body.replace('autocomplete="', 'autoComplete="')
    body = body.replace('tabindex="', 'tabIndex="')
    body = body.replace('datetime="', 'dateTime="')
    
    def style_replacer(m):
        style_str = m.group(1)
        if 'background-image' in style_str:
            url_match = re.search(r"url\(['\"]?(.*?)['\"]?\)", style_str)
            if url_match:
                return f"style={{{{ backgroundImage: `url('{url_match.group(1)}')` }}}}"
        return 'style={{}}'

    body = re.sub(r'style="([^"]*)"', style_replacer, body)
    
    body = body.replace('fill-rule=', 'fillRule=')
    body = body.replace('clip-rule=', 'clipRule=')
    body = body.replace('stroke-width=', 'strokeWidth=')
    body = body.replace('stroke-linecap=', 'strokeLinecap=')
    body = body.replace('stroke-linejoin=', 'strokeLinejoin=')
    
    return f"""import React from 'react';

const Component = () => {{
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden antialiased">
      {{/* Original body wrapper added above */}}
      {body}
    </div>
  );
}};

export default Component;
"""

pages = {
    'home_ceramic_craft_red_white': 'Home',
    'about_us_ceramic_craft_red_white': 'AboutUs',
    'products_ceramic_craft_red_white': 'Products',
    'gallery_projects_ceramic_craft_red_white': 'Gallery',
    'manufacturing_quality_ceramic_craft_red_white': 'Manufacturing',
    'contact_us_ceramic_craft_red_white': 'ContactUs'
}

base_dir = '/Users/a.v.tharunkarthik/Desktop/oviya/stitch_radiant_dindigul_ceramics'
out_dir = os.path.join(base_dir, 'react-app', 'src', 'pages')

os.makedirs(out_dir, exist_ok=True)

for folder, comp in pages.items():
    html_path = os.path.join(base_dir, folder, 'code.html')
    if os.path.exists(html_path):
        with open(html_path, 'r') as f:
            html = f.read()
        
        jsx = html_to_jsx(html)
        
        out_path = os.path.join(out_dir, f'{comp}.jsx')
        with open(out_path, 'w') as f:
            f.write(jsx)
        print(f'Converted {folder} to {comp}.jsx')
