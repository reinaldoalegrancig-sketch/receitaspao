const fs = require('fs');
const path = require('path');

function replaceAllCarla(htmlPath) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Case-insensitive replace for URLs and other string matches
    // But we need to use Fernanda for Carla.
    // The previous script already did most of the work.
    
    // Changing technical slugs/paths
    htmlContent = htmlContent.replace(/site-chef-carla-ramos/g, 'site-chef-fernanda-oliveira');
    htmlContent = htmlContent.replace(/carla-ramos/g, 'fernanda-oliveira');
    
    // Final check for any remaining "Carla" (case-insensitive for text)
    // Be careful with "Carla" inside other words, but "Carla" is usually unique here.
    htmlContent = htmlContent.replace(/Carla/g, 'Fernanda');
    htmlContent = htmlContent.replace(/CARLA/g, 'FERNANDA');

    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
}

const targetHtml = path.join(__dirname, '..', 'index.html');
replaceAllCarla(targetHtml);
