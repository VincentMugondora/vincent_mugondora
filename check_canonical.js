const fs = require('fs');
const content = fs.readFileSync('dist/about.html', 'utf8');
const match = content.match(/<link rel="canonical" href="([^"]+)"/);
console.log('About canonical:', match ? match[1] : 'Not found');

const indexContent = fs.readFileSync('dist/index.html', 'utf8');
const indexMatch = indexContent.match(/<link rel="canonical" href="([^"]+)"/);
console.log('Index canonical:', indexMatch ? indexMatch[1] : 'Not found');
