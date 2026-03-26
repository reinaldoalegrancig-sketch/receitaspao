const fs = require('fs');
const path = require('path');

const cssFile = path.resolve('public/css/elementor-core.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');
    
    // Fix FAQ icons
    // .fa-plus:before{content:"´üº"} -> "+"
    css = css.replace(/\.fa-plus:before\{content:"´üº"\}/g, '.fa-plus:before{content:"+"}');
    
    // .fa-caret-right:before{content:"´âÜ"} -> "▶"
    css = css.replace(/\.fa-caret-right:before\{content:"´âÜ"\}/g, '.fa-caret-right:before{content:"▶"}');
    
    // Also global replacement for these specific corrupted strings just in case they appear elsewhere
    css = css.replace(/content:"´üº"/g, 'content:"+"');
    css = css.replace(/content:"´âÜ"/g, 'content:"▶"');

    fs.writeFileSync(cssFile, css, 'utf8');
    console.log('Fixed FAQ icons in elementor-core.css');
} else {
    console.error('CSS file not found');
}
