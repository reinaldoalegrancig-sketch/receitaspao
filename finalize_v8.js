const fs = require('fs');
const path = require('path');

const contentPath = 'c:\\Users\\reinaldo\\Downloads\\ELEMENTOR_CONTENT.html';
const indexPath = 'c:\\Users\\reinaldo\\Downloads\\OFERTA REMODELADA\\public\\index.html';

let elementorContent = fs.readFileSync(contentPath, 'utf8');

// Fix Prices
elementorContent = elementorContent.replace(/R\$ 7,02/g, 'R$ 1,49');
elementorContent = elementorContent.replace(/R\$ 69,90/g, 'R$ 17,90');

// Inject Chef Image
const injectionPoint = 'de Receitas sem Glúten</h2> </div>'; 
// Use a more specific match if possible, or just index it.
elementorContent = elementorContent.replace(injectionPoint, injectionPoint + `
<div class="chef-preview-container v8-reveal" style="margin-top: 1.5rem; margin-bottom: 2rem; display: flex; justify-content: center;">
    <img src="assets/images/chef_app_preview.jpg" alt="Chef Fernanda Oliveira e App" style="width: 100%; max-width: 600px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
</div>
`);

const finalHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Sua Receita Saudável - Chef Fernanda Oliveira</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Aprenda a fazer pães artesanais sem glúten macios e deliciosos.">

    <!-- Design V8 Stable System -->
    <link rel="stylesheet" href="css/v8-design.css">

    <!-- Essential Font Loading -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body class="wp-singular page-template page-template-elementor_canvas page page-id-158668 elementor-default elementor-template-canvas elementor-kit-6 elementor-page-158668">
    <div class="v8-particles" id="v8-particles"></div>
    <div id="glow-1" class="v8-bg-glow"></div>
    <div id="glow-2" class="v8-bg-glow"></div>

    <div class="elementor elementor-158668" data-elementor-id="158668" data-elementor-post-type="page" data-elementor-type="wp-page">
        ${elementorContent}
    </div>

    <!-- V8 UI Engine & Assets -->
    <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>
    <script src="js/v8-engine.js"></script>
</body>
</html>`;

fs.writeFileSync(indexPath, finalHtml, 'utf8');
console.log('Successfully de-snapshotted and stabilized index.html');
