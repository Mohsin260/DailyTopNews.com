const fs = require('fs');

const js = fs.readFileSync('source_index.js', 'utf8');

function getComponentCode(name) {
  // Try several patterns:
  // function name(
  // const name = 
  // let name = 
  // name = ({
  const patterns = [
    new RegExp('function ' + name + '\\s*\\([^)]*\\)\\s*\\{', 'g'),
    new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*(?:\\([^)]*\\)|[a-zA-Z0-9_]+)\\s*=>', 'g'),
    new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*function\\s*\\(', 'g'),
    new RegExp('\\b' + name + '\\s*=\\s*\\([^)]*\\)\\s*=>', 'g')
  ];

  for (const p of patterns) {
    let match = p.exec(js);
    if (match) {
      const start = match.index;
      // take 1500 characters
      return js.substring(start, start + 2500);
    }
  }
  return 'NOT FOUND: ' + name;
}

const comps = ['vd', 'Rx', 'Gx', '$x', 'sd', 'Kx', 'ZL', 'qp', 'Mx', 'Lx', 'zx', 'K', 'Yx', 'Dx', 'Bx'];

comps.forEach(c => {
  console.log(`==================== ${c} ====================`);
  console.log(getComponentCode(c).substring(0, 1000));
});
