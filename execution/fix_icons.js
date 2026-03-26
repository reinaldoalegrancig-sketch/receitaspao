const fs = require('fs');
const path = require('path');

const publicDir = path.resolve('public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const checkmarkPatterns = [
    /<i[^>]*class="[^"]*fa-check-circle[^"]*"[^>]*><\/i>/g,
    /<i[^>]*class="[^"]*fa-check-circle-o[^"]*"[^>]*><\/i>/g,
    /<i[^>]*class="[^"]*eicon-check-circle[^"]*"[^>]*><\/i>/g,
    /<i[^>]*class="[^"]*fa-check-square-o[^"]*"[^>]*><\/i>/g,
    /<i[^>]*class="[^"]*fa-check-square[^"]*"[^>]*><\/i>/g,
    /<i[^>]*class="[^"]*fa-check[^"]*"[^>]*><\/i>/g,
    /<i[^>]*class="[^"]*eicon-check[^"]*"[^>]*><\/i>/g
];

console.log('Replacing corrupted icon placeholders with verified emoji (✅)...');

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    checkmarkPatterns.forEach(pattern => {
        content = content.replace(pattern, '✅');
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`- Updated icons in ${file}`);
    }
});

// Also fix the CSS file to prevent "´üÿ" from appearing elsewhere if applied via pseudo-elements
const cssFile = path.join(publicDir, 'css', 'elementor-core.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');
    let originalCss = css;

    // Replace the specific corrupted content strings seen in the CSS
    // Based on the view_file output: .fa.fa-check-circle-o:before{content:"´üÿ"}
    css = css.replace(/content:"´üÿ"/g, 'content:"✅"');
    css = css.replace(/content:"¯ó¿"/g, 'content:"✅"'); // From eicon-check-circle

    if (css !== originalCss) {
        fs.writeFileSync(cssFile, css, 'utf8');
        console.log('- Fixed corrupted content tokens in elementor-core.css');
    }
}

console.log('Icon normalization complete.');
