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

  // Replace stark dark bg with glassy look
  content = content.replace(/bg-\[\#12141C\]/g, 'bg-white/[0.04] backdrop-blur-[20px]');
  
  // Update borders to look more like 3D glass edges
  content = content.replace(/border-white\/5/g, 'border-white/10');
  content = content.replace(/border-white\/10/g, 'border-white/[0.15]');
  
  // Enhance shadows to be warmer and larger
  content = content.replace(/shadow-sm/g, 'shadow-lg');
  content = content.replace(/shadow-md/g, 'shadow-xl');

  // Replace primary colors: from Deep Red to Neon Orange/Peach
  content = content.replace(/\#FF1B2B/g, '#FF7A00');
  content = content.replace(/\#B30310/g, '#FF3300'); // the gradient end
  content = content.replace(/\#9E020C/g, '#FF3300'); 
  content = content.replace(/\#FF6B7A/g, '#FF9D4A'); // the lighter highlight
  content = content.replace(/\#FF8B93/g, '#FFB373');
  content = content.replace(/rgba\(255,27,43,/g, 'rgba(255,122,0,'); // shadow rgba

  // Give bottom nav a more glassmorphic floating vibe
  if (filePath.endsWith('BottomNav.tsx')) {
    content = content.replace(/bg-\[\#050508\]/g, 'bg-[#080d14]/80 backdrop-blur-3xl');
  }

  // Same for top bars
  content = content.replace(/bg-\[\#050508\]/g, 'bg-white/5 backdrop-blur-xl');
  content = content.replace(/bg-\[\#FAFAFA\]/g, 'bg-transparent');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Applied Glow Glass Theme: ' + filePath);
  }
});
