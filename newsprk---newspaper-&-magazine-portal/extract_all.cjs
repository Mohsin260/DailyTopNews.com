const fs = require('fs');

const js = fs.readFileSync('source_index.js', 'utf8');

function findDefinition(name) {
  // Try several patterns
  const re = new RegExp('(?:const|let|var|function)\\s+' + name.replace('$', '\\$') + '\\b[^=;{]*[={]', 'g');
  let m = re.exec(js);
  if (!m) {
    // try name=({
    const re2 = new RegExp('\\b' + name.replace('$', '\\$') + '\\s*=\\s*\\(', 'g');
    m = re2.exec(js);
  }
  if (!m) {
    // try name=(
    const re3 = new RegExp('\\b' + name.replace('$', '\\$') + '\\s*=\\s*[a-zA-Z0-9_]+\\s*=>', 'g');
    m = re3.exec(js);
  }
  if (!m) return 'NOT FOUND: ' + name;

  const start = m.index;
  // find matching end or grab 1200 chars
  return js.substring(start, start + 2000);
}

const targetList = [
  'Mx', 'Os', 'Fx', '_o', 'Ye', 'Ux', 'V', 'dk', 'Px', 'SL', 'Tv', 'mk', 'ts', 'Ce'
];

targetList.forEach(t => {
  console.log(`\n===================== ${t} =====================`);
  console.log(findDefinition(t).substring(0, 800));
});
