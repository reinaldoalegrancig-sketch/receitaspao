const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function extractFonts(htmlPath, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const fontMap = new Map(); // Hash -> relativePath

    // Pattern for data URIs in src:url(...) or src: url(...)
    // data:font/woff2;base64,...
    const fontUriPattern = /data:font\/([^;]+);base64,([^"'\s)]+)/g;

    let match;
    const replacements = [];

    // Reset regex index for safety
    fontUriPattern.lastIndex = 0;

    htmlContent = htmlContent.replace(fontUriPattern, (fullMatch, ext, base64Data) => {
        try {
            const fontData = Buffer.from(base64Data, 'base64');
            const hash = crypto.createHash('md5').update(fontData).digest('hex');

            if (fontMap.has(hash)) {
                return fontMap.get(hash);
            }

            const fileName = `font_${hash}.${ext}`;
            const filePath = path.join(outputDir, fileName);
            fs.writeFileSync(filePath, fontData);

            const relPath = `assets/fonts/${fileName}`;
            fontMap.set(hash, relPath);
            return relPath;
        } catch (e) {
            console.error(`Error processing font: ${e.message}`);
            return fullMatch;
        }
    });

    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`Font extraction complete. Saved ${fontMap.size} unique fonts.`);
}

const targetHtml = path.join(__dirname, '..', 'index.html');
const targetDir = path.join(__dirname, '..', 'assets', 'fonts');

extractFonts(targetHtml, targetDir);
