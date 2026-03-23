const fs = require('fs');
const path = require('path');

function updateAuthorImage() {
    // 1. Load the notebook to get the base64 photo
    const notebookPath = 'c:\\Users\\reinaldo\\Downloads\\Trocar_Foto_Autora_CORRIGIDO.ipynb';
    const notebook = JSON.parse(fs.readFileSync(notebookPath, 'utf8'));
    
    let base64Photo = '';
    notebook.cells.forEach(cell => {
        if (cell.cell_type === 'code') {
            const source = cell.source.join('');
            const match = source.match(/NOVA_FOTO_BASE64\s*=\s*"([^"]+)"/);
            if (match) {
                base64Photo = match[1];
            }
        }
    });

    if (!base64Photo) {
        console.error('Could not find NOVA_FOTO_BASE64 in the notebook.');
        return;
    }

    // 2. Save the new photo to assets/images
    const fileName = 'autora_fernanda.jpg';
    const outputDir = path.join(__dirname, '..', 'assets', 'images');
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(base64Photo, 'base64'));
    console.log(`Saved new author photo to ${filePath}`);

    // 3. Update index.html
    const htmlPath = path.join(__dirname, '..', 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // We saw the main bio image was img_d3714e23fa3460b1d955ec81e277845c.png
    // We should replace it.
    // Also, look for other images that might be the author.
    // The previous analysis showed img_99e8c2374278c8051cf1ce1e3b6ccaed.png might be any other author instance.
    
    const oldAuthorImg = 'assets/images/img_d3714e23fa3460b1d955ec81e277845c.png';
    const newAuthorImg = `assets/images/${fileName}`;
    
    htmlContent = htmlContent.replace(newAuthorImg, newAuthorImg); // Safety
    htmlContent = htmlContent.replace(new RegExp(oldAuthorImg, 'g'), newAuthorImg);
    
    // Check for the hero image (img_99e8c2374278c8051cf1ce1e3b6ccaed.png)
    // If it's also author-related, replace it. 
    // Usually, the notebook would replace "large AVIF images".
    // I'll replace target instances.
    
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log('Updated index.html with new author photo.');
}

updateAuthorImage();
