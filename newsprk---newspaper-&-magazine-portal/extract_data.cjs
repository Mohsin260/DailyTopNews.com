const fs = require('fs');

const js = fs.readFileSync('source_index.js', 'utf8');

function extractArray(name) {
  const re = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*(\\[[\\s\\S]*?\\]);', 'g');
  const m = re.exec(js);
  if (m) {
    return m[1];
  }
  return 'NOT FOUND: ' + name;
}

const vars = ['t3', 'kL', 'NL', 'uh', 'Tv', 'CL', 'TL', 'hk', 'uk', 'IL', 'GL', 'XL', '_v'];

vars.forEach(v => {
  console.log(`\n// ==================== ${v} ====================`);
  const data = extractArray(v);
  console.log(`const ${v} = ` + data.substring(0, 1500) + (data.length > 1500 ? '...' : '') + ';');
});
