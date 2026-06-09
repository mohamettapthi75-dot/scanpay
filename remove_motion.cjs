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
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) results.push(filePath);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('motion')) return;

  content = content.replace(/import\s+\{[^}]*\}\s+from\s+["']motion\/react["'];?\n?/g, '');
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');
  content = content.replace(/<AnimatePresence[^>]*>/g, '<>');
  content = content.replace(/<\/AnimatePresence>/g, '</>');

  const propsToRemove = ['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'layoutId', 'layout', 'mode'];
  
  let changed = true;
  while(changed) {
      changed = false;
      propsToRemove.forEach(propName => {
        let searchPattern = ' ' + propName + '=';
        let startIndex = content.indexOf(searchPattern);
        if (startIndex !== -1) {
          changed = true;
          const charAfterEq = content.charAt(startIndex + searchPattern.length);
          let endIndex = startIndex + searchPattern.length;
          
          if (charAfterEq === '{') {
            let braceCount = 0;
            let foundFirst = false;
            for (let i = startIndex + searchPattern.length; i < content.length; i++) {
              if (content.charAt(i) === '{') {
                braceCount++;
                foundFirst = true;
              } else if (content.charAt(i) === '}') {
                braceCount--;
              }
              
              if (foundFirst && braceCount === 0) {
                endIndex = i;
                break;
              }
            }
          } else if (charAfterEq === '"' || charAfterEq === "'") {
            const quote = charAfterEq;
            for (let i = startIndex + searchPattern.length + 1; i < content.length; i++) {
              if (content.charAt(i) === quote && content.charAt(i-1) !== '\\') {
                endIndex = i;
                break;
              }
            }
          } else {
            for (let i = startIndex + searchPattern.length; i < content.length; i++) {
              if (/\s/.test(content.charAt(i)) || content.charAt(i) === '>' || content.charAt(i) === '/') {
                endIndex = i - 1;
                break;
              }
            }
          }
          
          content = content.substring(0, startIndex) + content.substring(endIndex + 1);
        }
      });
  }

  propsToRemove.forEach(propName => {
      let pattern = new RegExp(`\\s${propName}(\\s|>|/)`, 'g');
      content = content.replace(pattern, (match, p1) => p1 === '>' ? '>' : p1 === '/' ? '/' : ' ');
  });

  fs.writeFileSync(file, content);
  console.log('Processed', file);
});
console.log('Done cleaning motion');
