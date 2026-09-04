import os
import re
import glob

files = glob.glob('src/pages/*.jsx')
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    new_content = re.sub(r'<script>.*?</script>', '', content, flags=re.DOTALL)
    
    if new_content != content:
        with open(f, 'w') as file:
            file.write(new_content)
        print(f"Removed script from {f}")
