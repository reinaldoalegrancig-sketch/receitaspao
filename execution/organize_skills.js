const fs = require('fs');
const path = require('path');

function organizeSkills(repoRoot, targetRoot) {
    const catalogPath = path.join(repoRoot, 'CATALOG.md');
    const skillsSrc = path.join(repoRoot, 'skills');

    if (!fs.existsSync(catalogPath)) {
        console.error(`Error: Catalog not found at ${catalogPath}`);
        return;
    }

    if (!fs.existsSync(skillsSrc)) {
        console.error(`Error: Skills source folder not found at ${skillsSrc}`);
        return;
    }

    if (!fs.existsSync(targetRoot)) {
        fs.mkdirSync(targetRoot, { recursive: true });
    }

    const content = fs.readFileSync(catalogPath, 'utf8');
    // Split by categories: ## category_name (count)
    const categoryBlocks = content.split(/^##\s+/m).slice(1);

    categoryBlocks.forEach(block => {
        const lines = block.split('\n');
        const header = lines[0].trim();
        // Remove (count) if exists
        let categoryName = header.replace(/\s*\(\d+\)$/, '').trim();
        // Sanitize category name
        categoryName = categoryName.replace(/[^\w\s-]/g, '_');

        const categoryPath = path.join(targetRoot, categoryName);
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath, { recursive: true });
        }

        console.log(`Processing category: ${categoryName}`);

        // Skill names in backticks in the first column
        const skillRegex = /^\|\s*`([^`]+)`\s*\|/gm;
        let match;
        while ((match = skillRegex.exec(block)) !== null) {
            const skill = match[1];
            const srcPath = path.join(skillsSrc, skill);
            const dstPath = path.join(categoryPath, skill);

            if (fs.existsSync(srcPath)) {
                try {
                    copyRecursive(srcPath, dstPath);
                } catch (err) {
                    console.error(`  Error copying ${skill}: ${err.message}`);
                }
            } else {
                console.warn(`  Warning: Skill ${skill} not found in ${skillsSrc}`);
            }
        }
    });
}

function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(child => {
            copyRecursive(path.join(src, child), path.join(dest, child));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log("Usage: node organize_skills.js <repo_path> <target_path>");
} else {
    organizeSkills(args[0], args[1]);
}
