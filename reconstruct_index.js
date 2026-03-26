const fs = require('fs');

const head = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Sua Receita Saudável - Chef Fernanda Oliveira</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Aprenda a fazer pães artesanais sem glúten macios e deliciosos.">

    <!-- Google Fonts: Aladin, Sora, Work Sans, Inter, Roboto, Outfit -->
    <link href="https://fonts.googleapis.com/css2?family=Aladin&family=Inter:wght@300;400;600&family=Outfit:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&family=Sora:wght@300;400;600;700&family=Work+Sans:wght@300;400;600&display=swap" rel="stylesheet">
    
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- CSS Core do Elementor (Layout e Redação Original) -->
    <link rel="stylesheet" href="css/elementor-core.css">

    <!-- Design V8 Stable System (Sobreposição Estética Premium) -->
    <link rel="stylesheet" href="css/v8-design.css">
</head>
<body class="wp-singular page-template page-template-elementor_canvas page page-id-158668 elementor-default elementor-template-canvas elementor-kit-6 elementor-page-158668">
    <div class="v8-particles" id="v8-particles"></div>
    <div id="glow-1" class="v8-bg-glow"></div>
    <div id="glow-2" class="v8-bg-glow"></div>

    <div class="elementor elementor-158668" data-elementor-id="158668" data-elementor-post-type="page" data-elementor-type="wp-page">
`;

const footer = `
    </div>
    <script src="js/v8-engine.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Swiper and Countdown Logic
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            let totalSeconds = 14 * 60 + 39;
            const timer = setInterval(() => {
                if (totalSeconds <= 0) { clearInterval(timer); return; }
                totalSeconds--;
                let mins = Math.floor(totalSeconds / 60);
                let secs = totalSeconds % 60;
                countdownElement.innerText = mins + ":" + secs.toString().padStart(2, '0');
            }, 1000);
        }
    });
    </script>
</body>
</html>`;

let bodyContent = fs.readFileSync('c:\\Users\\reinaldo\\Downloads\\ELEMENTOR_CONTENT.html', 'utf8');

// Fix Corruptions
const corruptedMap = {
    '├ú': 'ã', '├¡': 'í', '├¬': 'ê', '├º': 'ç', '├®': 'é', '├í': 'á', '├│': 'ó', '├║': 'ú',
    '┬║': 'º', 'ÔÇö': '—', '├в': 'â', '├к': 'ê', '├Б': 'Á', '┬á': '&nbsp;'
};
Object.keys(corruptedMap).forEach(key => {
    bodyContent = bodyContent.split(key).join(corruptedMap[key]);
});

// Injection: Chef Image
const chefBlock = `
<!-- Chef Preview Image -->
 <div class="v8-image-box" style="margin-top:25px; text-align:center;">
    <img src="assets/images/chef_app_preview.jpg" alt="Preview Sua Receita Saudável" style="border-radius:24px; border: 1px solid rgba(247,189,87,0.3); box-shadow: 0 30px 60px rgba(0,0,0,0.5); width:100%; max-width:500px">
 </div>
`;
bodyContent = bodyContent.replace('Chef Fernanda te guia em cada etapa, mostrando <strong>o ponto da massa, textura e preparo</strong> com clareza e carinho.', 'Chef Fernanda te guia em cada etapa, mostrando <strong>o ponto da massa, textura e preparo</strong> com clareza e carinho.' + chefBlock);

// Fix Countdown Triangle
bodyContent = bodyContent.replace(/<img[^>]*src="assets\/images\/img_289673858e06dfa2e0e3a7ee610c3a30\.svg"[^>]*\/>/g, '<i class="fas fa-exclamation-triangle" style="color:yellow;margin-right:10px"></i>');

// Combine and Save
fs.writeFileSync('c:\\Users\\reinaldo\\Downloads\\OFERTA REMODELADA\\public\\index.html', head + bodyContent + footer, 'utf8');
console.log('Index.html RECONSTRUCTED from source with V8 and fixes.');
