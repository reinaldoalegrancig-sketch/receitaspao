const fs = require('fs');
const path = require('path');

function generateSummary(root, outputPath) {
    let summaryContent = "# Awesome Skills Catalog\n\n";
    summaryContent += `Total Skills: {{TOTAL_SKILLS}}\n\n`;

    const categories = fs.readdirSync(root).filter(f => fs.statSync(path.join(root, f)).isDirectory());

    let totalSkillsCount = 0;

    categories.forEach(category => {
        summaryContent += `## ${category.toUpperCase()}\n\n`;

        // We search recursively for SKILL.md files
        function findSkills(dir, level = 0) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const fullPath = path.join(dir, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    const skillMd = path.join(fullPath, 'SKILL.md');
                    if (fs.existsSync(skillMd)) {
                        totalSkillsCount++;
                        // Extract skill name from folder name or SKILL.md title
                        const skillName = path.basename(fullPath).replace(/-/g, ' ');

                        // Calculate relative path for the link
                        const relPath = path.relative(root, fullPath).replace(/\\/g, '/');
                        summaryContent += `${'  '.repeat(level)}- [${skillName}](${relPath}/SKILL.md)\n`;
                    } else {
                        // If it's a directory but no SKILL.md here, look deeper
                        findSkills(fullPath, level + 1);
                    }
                }
            });
        }

        findSkills(path.join(root, category));
        summaryContent += "\n";
    });

    summaryContent = summaryContent.replace("{{TOTAL_SKILLS}}", totalSkillsCount);

    fs.writeFileSync(outputPath, summaryContent, 'utf8');
    console.log(`Summary generated at ${outputPath}. Found ${totalSkillsCount} skills.`);
}

const targetDir = path.join(__dirname, '..', 'skills_organized');
const outputFile = path.join(__dirname, '..', 'skills_organized', 'SUMMARY.md');

generateSummary(targetDir, outputFile);
