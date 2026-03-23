const fs = require('fs');
const path = require('path');

function renameAuthor(htmlPath) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Replacements (from specific to general to avoid double replacement issues if one is a substring)
    // Actually, Carla Ramos -> Fernanda Oliveira doesn't have naming conflicts.
    
    // Exact matches first
    htmlContent = htmlContent.replace(/CHEF CARLA RAMOS/g, 'CHEF FERNANDA OLIVEIRA');
    htmlContent = htmlContent.replace(/Chef Carla Ramos/g, 'Chef Fernanda Oliveira');
    htmlContent = htmlContent.replace(/Carla Ramos/g, 'Fernanda Oliveira');
    htmlContent = htmlContent.replace(/Chef Carla/g, 'Chef Fernanda');
    
    // General "Carla" -> "Fernanda" for things like "a trajetória de Carla", "determinada a proporcionar... Carla mergulhou"
    htmlContent = htmlContent.replace(/Carla/g, 'Fernanda');

    // Also the title and meta if they contain the name
    // (Already handled by the general replace above)

    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log('Author renamed to Fernanda Oliveira successfully.');
}

const targetHtml = path.join(__dirname, '..', 'index.html');
renameAuthor(targetHtml);
