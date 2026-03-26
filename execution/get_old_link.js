const fs = require('fs');
const { execSync } = require('child_process');
const diff = execSync('git show d6135fcd946f28a7d1ef3e71 -- public/index.html').toString();
fs.writeFileSync('diff.txt', diff);
console.log('Diff saved to diff.txt');
