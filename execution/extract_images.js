const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function extractImages(htmlPath, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const imageMap = new Map(); // Hash -> relativePath

    // Pattern for data URIs in src="..." or url(...)
    // [^"'] + will match the base64 data.
    const dataUriPattern = /data:image\/([^;]+);base64,([^"'\s)]+)/g;

    let match;
    const replacements = [];

    // Reset regex index for safety
    dataUriPattern.lastIndex = 0;

    // We use replace with a callback to handle all instances
    htmlContent = htmlContent.replace(dataUriPattern, (fullMatch, ext, base64Data) => {
        try {
            // Fix svg+xml extension
            if (ext === 'svg+xml') ext = 'svg';
            // Also some extensions like jpeg should be jpg
            if (ext === 'jpeg') ext = 'jpg';

            const imageData = Buffer.from(base64Data, 'base64');
            const hash = crypto.createHash('md5').update(imageData).digest('hex');

            if (imageMap.has(hash)) {
                return imageMap.get(hash);
            }

            const fileName = `img_${hash}.${ext}`;
            const filePath = path.join(outputDir, fileName);
            fs.writeFileSync(filePath, imageData);

            const relPath = `assets/images/${fileName}`;
            imageMap.set(hash, relPath);
            return relPath;
        } catch (e) {
            console.error(`Error processing image: ${e.message}`);
            return fullMatch;
        }
    });

    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`Extraction complete. Saved ${imageMap.size} unique images.`);
}

const targetHtml = path.join(__dirname, '..', 'index.html');
const targetDir = path.join(__dirname, '..', 'assets', 'images');

extractImages(targetHtml, targetDir);
