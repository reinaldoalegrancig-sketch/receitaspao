const fs = require('fs');
const path = require('path');

const files = ['public/index.html', 'public/upsell.html'];
const search = /https:\/\/deliciassemgluten\.online\//g;
const replace = 'https://suareceitasaudavel.com.br/';

const searchSlug = /dv-upsell-panificacao-eletrica\//g;
const replaceSlug = 'upsell/';

const searchSiteSlug = /site-chef-fernanda-oliveira\//g;
const replaceSiteSlug = '/'; // Keep it at root

files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf-8');
    content = content.replace(search, replace);
    content = content.replace(searchSlug, replaceSlug);
    content = content.replace(searchSiteSlug, replaceSiteSlug);
    
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated ${file}`);
});
