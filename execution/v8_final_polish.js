const fs = require('fs');
const path = require('path');

// 1. Fix FAQ and common corrupted icons in CSS
const cssFile = path.resolve('public/css/elementor-core.css');
if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');
    
    // Icon Mapping (Corrupted String -> Correct Content/Emoji)
    const iconFixes = {
        '"´üº"': '"+"',              // fa-plus
        '"´âÜ"': '"▶"',              // fa-caret-right
        '"´ü▒"': '"⚠️"',             // fa-exclamation-triangle (Scarcity/Alert)
        '"´üÿ"': '"✅"',             // fa-check-circle
        '"¯ñ¬"': '"▼"',              // select arrow
        '"¯áò"': '"+"',              // eicon-plus
    };

    Object.entries(iconFixes).forEach(([corrupted, fixed]) => {
        const regex = new RegExp('content:' + corrupted, 'g');
        css = css.replace(regex, 'content:' + fixed);
    });

    fs.writeFileSync(cssFile, css, 'utf8');
    console.log('- Restored icons in elementor-core.css');
}

// 2. Fix Text Inconsistency (200+ receitas)
const htmlFile = path.resolve('public/index.html');
if (fs.existsSync(htmlFile)) {
    let html = fs.readFileSync(htmlFile, 'utf8');
    
    // Replace "Mais de 200 receitas" with "200+ receitas"
    html = html.replace(/Mais de <strong>200 receitas/g, '<strong>200+ receitas');
    html = html.replace(/Mais de 200 receitas/g, '200+ receitas');
    
    // Final check for any remaining ´üº in HTML (sometimes they are hardcoded)
    html = html.replace(/´üº/g, '⚠️');

    fs.writeFileSync(htmlFile, html, 'utf8');
    console.log('- Fixed text inconsistencies and hardcoded corrupted characters in index.html');
}

// 3. Enhance V8 CSS for Mobile Contrast
const v8CssFile = path.resolve('public/css/v8-design.css');
if (fs.existsSync(v8CssFile)) {
    let v8Css = fs.readFileSync(v8CssFile, 'utf8');
    
    const contrastEnhancement = `
/* --- FINAL POLISH: CONTRAST & MOBILE STABILITY --- */
/* Target sections that have light beige/gray backgrounds in Elementor */
.elementor-element-71a4139, .elementor-element-cd2f9e9, .elementor-element-9830bcc, 
.elementor-element-04564b1, .elementor-element-5aabcd7 {
    color: #1A120C !important;
}

.elementor-element-71a4139 .elementor-heading-title, 
.elementor-element-71a4139 p,
.elementor-element-cd2f9e9 .elementor-heading-title, 
.elementor-element-cd2f9e9 p,
.elementor-element-9830bcc .elementor-heading-title, 
.elementor-element-9830bcc p,
.elementor-element-04564b1 .elementor-heading-title,
.elementor-element-04564b1 p,
.elementor-element-5aabcd7 .elementor-heading-title,
.elementor-element-5aabcd7 p {
    color: #1A120C !important;
    text-shadow: none !important;
}

/* Fix for the Sticky Offer Banner in the footer */
#countdown-timer {
    box-shadow: 0 -10px 30px rgba(0,0,0,0.3);
    border-bottom: 2px solid rgba(255,255,255,0.2);
}

/* Pulse animation for the + icon to draw attention */
@keyframes plus-pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
}
.fa-plus {
    display: inline-block;
    animation: plus-pulse 2s infinite ease-in-out;
}
`;

    if (!v8Css.includes('FINAL POLISH')) {
        v8Css += contrastEnhancement;
        fs.writeFileSync(v8CssFile, v8Css, 'utf8');
        console.log('- Enhanced V8 CSS with contrast fixes and mobile stability.');
    }
}

console.log('V8 Final Polish Complete.');
