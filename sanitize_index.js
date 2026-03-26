const fs = require('fs');
const path = 'c:\\Users\\reinaldo\\Downloads\\OFERTA REMODELADA\\public\\index.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Fix Corrupt Characters (Latin1/UTF-8 mixup from snapshot)
const corruptedMap = {
    '├ú': 'ã',
    '├¡': 'í',
    '├¬': 'ê',
    '├º': 'ç',
    '├®': 'é',
    '├í': 'á',
    '├│': 'ó',
    '├║': 'ú',
    '├в': 'â',
    '├в': 'â',
    '├п': 'ï',
    '├Т': 'Ó',
    'ÔÇö': '—',
    '├к': 'ê',
    '├Б': 'Á',
    'ÔÜá´©Å': '⚠️'
};

Object.keys(corruptedMap).forEach(key => {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, corruptedMap[key]);
});

// 2. Remove SingleFile residue (sf-hidden styles and scripts)
content = content.replace(/<style class="sf-hidden">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script[^>]*sf-.*?[\s\S]*?<\/script>/g, '');

// 3. Fix Countdown Emoji Image
content = content.replace(/<img[^>]*src="assets\/images\/img_289673858e06dfa2e0e3a7ee610c3a30\.svg"[^>]*\/>/g, '<i class="fas fa-exclamation-triangle" style="color:yellow;margin-right:10px"></i>');

// 4. Final Polish - Ensure UTF-8 Meta and no BOM
content = content.replace(/^\ufeff/, ''); // Remove BOM

// 5. Ensure Google Fonts are correct and Font Awesome is there
if (!content.includes('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css')) {
     const headSplit = content.split('</head>');
     content = headSplit[0] + '\n    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n' + headSplit[1];
}

fs.writeFileSync(path, content, 'utf8');
console.log('Index.html sanitized successfully (Pente Fino applied).');
