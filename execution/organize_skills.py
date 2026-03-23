import os
import shutil
import re
import argparse

def organize_skills(repo_root, target_root):
    catalog_path = os.path.join(repo_root, "CATALOG.md")
    skills_src = os.path.join(repo_root, "skills")
    
    if not os.path.exists(catalog_path):
        print(f"Error: Catalog not found at {catalog_path}")
        return

    if not os.path.exists(skills_src):
        print(f"Error: Skills source folder not found at {skills_src}")
        return

    # Ensure target_root exists
    if not os.path.exists(target_root):
        os.makedirs(target_root)

    with open(catalog_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by H2 headers (categories)
    # Pattern: ## category_name (count)
    categories = re.split(r'^##\s+', content, flags=re.MULTILINE)
    
    for cat_block in categories[1:]: # Skip the first part before the first category
        lines = cat_block.split('\n')
        category_header = lines[0].strip()
        # Extract category name (remove (count) if present)
        category_name = re.sub(r'\s*\(\d+\)$', '', category_header).strip()
        category_name = "".join([c if c.isalnum() or c in (' ', '-', '_') else '_' for c in category_name])
        
        category_path = os.path.join(target_root, category_name)
        if not os.path.exists(category_path):
            os.makedirs(category_path)
            
        print(f"Processing category: {category_name}")
        
        # Skill names are in the first column of the table, wrapped in backticks
        # Example: | `skill-name` | Description |
        skill_names = re.findall(r'^\|\s*`([^`]+)`\s*\|', cat_block, flags=re.MULTILINE)
        
        for skill in skill_names:
            src_skill_path = os.path.join(skills_src, skill)
            dst_skill_path = os.path.join(category_path, skill)
            
            if os.path.exists(src_skill_path):
                try:
                    # Use shutil.copytree if the skill is a directory
                    if os.path.isdir(src_skill_path):
                        if os.path.exists(dst_skill_path):
                             shutil.rmtree(dst_skill_path)
                        shutil.copytree(src_skill_path, dst_skill_path)
                    else:
                        shutil.copy2(src_skill_path, dst_skill_path)
                except Exception as e:
                    print(f"  Error copying {skill}: {e}")
            else:
                print(f"  Warning: Skill {skill} not found in {skills_src}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Organize skills by category.')
    parser.add_argument('--repo', required=True, help='Path to the cloned repository root.')
    parser.add_argument('--target', required=True, help='Path where organized skills will be saved.')
    
    args = parser.parse_args()
    organize_skills(args.repo, args.target)
