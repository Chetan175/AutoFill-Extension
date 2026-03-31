const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env from the current directory (frontend/)
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const apiKey = process.env.REACT_APP_HF_API_KEY || '';
console.log(`🚀 Injecting HF_API_KEY: ${apiKey ? 'Found' : 'NOT FOUND'}`);

const buildPath = path.join(__dirname, 'build', 'background.js');

if (fs.existsSync(buildPath)) {
  let content = fs.readFileSync(buildPath, 'utf8');
  
  // Replace the dynamic check with the actual string
  const target = "(typeof process !== 'undefined' && process.env && process.env.REACT_APP_HF_API_KEY) || ''";
  const replacement = `'${apiKey}'`;
  
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(buildPath, content, 'utf8');
    console.log('✅ background.js updated with API key.');
  } else {
    console.warn('⚠️ Target string not found in background.js. It might already be injected or the format changed.');
  }
} else {
  console.error('❌ build/background.js not found. Run build first.');
}
