const fs = require('fs');
const content = fs.readFileSync('diff.txt', 'utf8');
const lines = content.split('\n');
lines.forEach(line => {
    if (line.includes('korvex')) {
        const match = line.match(/href="([^"]+)"/);
        if (match) {
            const url = match[1];
            const offerMatch = url.match(/offer=([^&]+)/);
            console.log('--- LINK FOUND ---');
            console.log('Action: ' + line[0]);
            console.log('Full URL: ' + url.substring(0, 50));
            console.log('Rest of URL: ' + url.substring(50));
            if (offerMatch) console.log('OFFER CODE: ' + offerMatch[1]);
        }
    }
});
