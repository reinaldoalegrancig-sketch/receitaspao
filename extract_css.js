const fs = require('fs');
const sourcePath = 'c:\\Users\\reinaldo\\Downloads\\OFERTA_UTF8.html';
const targetPath = 'c:\\Users\\reinaldo\\Downloads\\OFERTA REMODELADA\\public\\css\\elementor-core.css';

const html = fs.readFileSync(sourcePath, 'utf8');
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
let allCss = '';

while ((match = styleRegex.exec(html)) !== null) {
    allCss += `/* --- STYLE BLOCK --- */\n${match[1]}\n\n`;
}

// Optimization: Remove SingleFile integrity markers if any
allCss = allCss.replace(/\/\* SingleFile .*? \*\//g, '');

fs.writeFileSync(targetPath, allCss, 'utf8');
console.log('Successfully extracted all Elementor CSS to elementor-core.css');
