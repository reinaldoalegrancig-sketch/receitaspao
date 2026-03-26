const fs = require('fs');
const path = require('path');

const replacements = [
    // Standard CP437 to UTF-8 fixes
    { from: /├í/g, to: 'á' },
    { from: /├®/g, to: 'é' },
    { from: /├¡/g, to: 'í' },
    { from: /├│/g, to: 'ó' },
    { from: /├║/g, to: 'ú' },
    { from: /├ó/g, to: 'â' },
    { from: /├¬/g, to: 'ê' },
    { from: /├┤/g, to: 'ô' },
    { from: /├ú/g, to: 'ã' },
    { from: /├╡/g, to: 'õ' }, // In some cases
    { from: /├Á/g, to: 'õ' }, // CP437 Á (0xB5) is UTF-8 õ (0xC3 0xB5)
    { from: /├º/g, to: 'ç' }, // CP437 º (0xBA) is UTF-8 ç (0xC3 0xA7)
    { from: /├á/g, to: 'à' }, 
    
    // Uppercase
    { from: /├ü/g, to: 'Á' },
    { from: /├ë/g, to: 'É' },
    { from: /├ì/g, to: 'Í' },
    { from: /├ô/g, to: 'Ó' },
    { from: /├Ü/g, to: 'Ú' },
    { from: /├Ç/g, to: 'À' },
    { from: /├Â/g, to: 'Ô' },
    { from: /├â/g, to: 'Ã' },
    { from: /├Õ/g, to: 'Õ' },
    { from: /├ç/g, to: 'Ç' },
    
    // Symbols and words
    { from: /ÔÇª/g, to: '...' },
    { from: /B├öNUS/g, to: 'BÔNUS' },
    { from: /GR├üTIS/g, to: 'GRÁTIS' },
    { from: /ATEN├ç├âO/g, to: 'ATENÇÃO' },
    { from: /SER├ü/g, to: 'SERÁ' },
    { from: /PRE├çO/g, to: 'PREÇO' },
    { from: /PR├ôXIMOS/g, to: 'PRÓXIMOS' }
];

const filesToFix = [
    'public/index.html',
    'public/upsell.html',
    'public/upsell_cloned.html',
    'public/upsell_original.html'
];

filesToFix.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
        console.log(`Fixing encoding in: ${file}`);
        let content = fs.readFileSync(fullPath, 'utf8');
        let initialContent = content;
        
        replacements.forEach(rep => {
            content = content.replace(rep.from, rep.to);
        });

        if (content !== initialContent) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Successfully fixed: ${file}`);
        } else {
            console.log(`No fixes needed for: ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});
