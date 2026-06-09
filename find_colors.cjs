const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(filePath));
    } else { 
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) results.push(filePath);
    }
  });
  return results;
}

const files = walk('./src');
let colors = {};
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let matches = content.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g);
  if (matches) {
    matches.forEach(m => {
      colors[m] = (colors[m] || 0) + 1;
    });
  }
});
console.log(Object.entries(colors).sort((a,b) => b[1] - a[1]).map(x => `${x[0]}: ${x[1]}`).join('\n'));
