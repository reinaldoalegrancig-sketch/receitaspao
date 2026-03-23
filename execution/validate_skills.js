const fs = require('fs');
const path = require('path');

function validateSkills(root) {
    let totalFolders = 0;
    let validSkills = 0;
    let invalidSkills = [];

    const categories = fs.readdirSync(root).filter(f => fs.statSync(path.join(root, f)).isDirectory());

    categories.forEach(category => {
        const categoryPath = path.join(root, category);
        const skills = fs.readdirSync(categoryPath).filter(f => fs.statSync(path.join(categoryPath, f)).isDirectory());

        skills.forEach(skill => {
            totalFolders++;
            const skillPath = path.join(categoryPath, skill);
            const skillMdPath = path.join(skillPath, 'SKILL.md');

            if (fs.existsSync(skillMdPath)) {
                validSkills++;
            } else {
                invalidSkills.push(`${category}/${skill}`);
            }
        });
    });

    console.log(`Validation Results:`);
    console.log(`Total Skill Folders: ${totalFolders}`);
    console.log(`Valid Skills (with SKILL.md): ${validSkills}`);
    console.log(`Invalid Skills: ${invalidSkills.length}`);

    if (invalidSkills.length > 0) {
        console.log(`List of invalid skills:`);
        invalidSkills.slice(0, 10).forEach(s => console.log(` - ${s}`));
        if (invalidSkills.length > 10) console.log(` ... and ${invalidSkills.length - 10} more.`);
    }
}

const targetDir = path.join(__dirname, '..', 'skills_organized');
validateSkills(targetDir);
