const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.css')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    // Backgrounds
    content = content.replace(/bg-\[\#F8F9FA\]/g, 'bg-[#F8F9FA] dark:bg-[#030305]');
    content = content.replace(/bg-\[\#F8F9FA\]\/80/g, 'bg-[#F8F9FA]/80 dark:bg-[#030305]/80');
    content = content.replace(/bg-white(?!\/)/g, 'bg-white dark:bg-slate-900');
    // Note: negative lookahead to avoid replacing bg-white/50 etc.
    content = content.replace(/bg-white\/(10|20|30|40|50|60|70|80|90|5)/g, (match, p1) => {
        return `${match} dark:bg-slate-900/${p1}`;
    });
    content = content.replace(/bg-slate-50(?!\/)/g, 'bg-slate-50 dark:bg-slate-950');
    content = content.replace(/bg-slate-100(?!\/)/g, 'bg-slate-100 dark:bg-slate-800');
    
    // Text colors
    content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
    content = content.replace(/text-slate-700/g, 'text-slate-700 dark:text-slate-200');
    content = content.replace(/text-slate-600/g, 'text-slate-600 dark:text-slate-300');
    content = content.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
    
    // Borders
    content = content.replace(/border-slate-200/g, 'border-slate-200 dark:border-slate-800');
    content = content.replace(/border-black\/5/g, 'border-black/5 dark:border-white/5');

    // Deduplicate any repeated dark: prefixes just in case
    content = content.replace(/dark:bg-\[\#030305\] dark:bg-\[\#030305\]/g, 'dark:bg-[#030305]');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
