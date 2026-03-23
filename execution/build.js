const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) return;
    const exists = fs.existsSync(dest);
    const stats = fs.statSync(src);
    const isDirectory = stats.isDirectory();
    if (isDirectory) {
        if (!exists) fs.mkdirSync(dest);
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

const distPath = path.join(__dirname, '..', 'dist');
const publicPath = path.join(__dirname, '..', 'public');

if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath);

console.log('Copying static files to dist...');
copyRecursiveSync(publicPath, distPath);
console.log('Build complete!');
