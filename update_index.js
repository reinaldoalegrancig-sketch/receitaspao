const fs = require('fs');
const path = require('path');

const contentPath = 'c:\\Users\\reinaldo\\Downloads\\ELEMENTOR_CONTENT.html';
const indexPath = 'c:\\Users\\reinaldo\\Downloads\\OFERTA REMODELADA\\public\\index.html';

let content = fs.readFileSync(contentPath, 'utf8');

// Update Prices
content = content.replace(/R\$ 7,02/g, 'R$ 1,49');
content = content.replace(/R\$ 69,90/g, 'R$ 17,90');

// Inject Chef Image
const injectionPoint = '<h2 class="elementor-heading-title elementor-size-default"><span style="color:#724a2d">1º Aplicativo</span> de Receitas sem Glúten</h2> </div>';
const injection = `
<div class="chef-preview-container v8-reveal" style="margin-top: 1.5rem; margin-bottom: 2rem; display: flex; justify-content: center;">
    <img src="assets/images/chef_app_preview.jpg" alt="Chef Fernanda Oliveira e App" style="width: 100%; max-width: 600px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
</div>
`;
content = content.replace(injectionPoint, injectionPoint + injection);

// Re-inject into index.html
let index = fs.readFileSync(indexPath, 'utf8');
const finalIndex = index.replace('<!-- ELEMENTOR_START -->\n<!-- ELEMENTOR_END -->', content);

fs.writeFileSync(indexPath, finalIndex, 'utf8');
console.log('Successfully updated index.html with de-snapshotted content and price/image fixes.');
