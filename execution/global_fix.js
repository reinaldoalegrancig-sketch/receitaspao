const fs = require('fs');
const filePath = 'c:\\Users\\reinaldo\\Downloads\\OFERTA REMODELADA\\public\\index.html';

let content = fs.readFileSync(filePath, 'utf8');

// The "Evil Trinity" of corruption
const badOnes = {
    '┬║': 'º',
    '├ú': 'ã',
    '├í': 'á',
    '├¡': 'í',
    '├¬': 'ê',
    '├º': 'ç',
    '├®': 'é',
    '├│': 'ó',
    '├║': 'ú',
    '┬á': '&nbsp;',
    '├в': 'â',
    '├к': 'ê',
    '├я': 'ï',
    '├Т': 'Ó',
    '├Б': 'Á',
    '├Ф': 'Ô',
    '┬⌐': '©',
    '┬«': '®',
    'ÔÇö': '—'
};

let fixedCount = 0;
Object.keys(badOnes).forEach(bad => {
    const regex = new RegExp(bad, 'g');
    if (content.match(regex)) {
        content = content.replace(regex, badOnes[bad]);
        fixedCount++;
    }
});

// Remove any remaining UTF-8 BOM if present at the start or middle
content = content.replace(/\ufeff/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Global Fix: Replaced ${fixedCount} types of corrupted character patterns.`);
