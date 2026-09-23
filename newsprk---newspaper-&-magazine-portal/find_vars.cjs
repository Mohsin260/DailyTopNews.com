const fs = require('fs');
const js = fs.readFileSync('source_index.js', 'utf8');

const missing = ['$L', 'Sv', 'Hx', 'Av', 'Ev', 'Pm', 'Lm', 'fn', 'gn', 'Fa', 'ki', 'Ci', 'Si', 'Xp', 'Zp'];
missing.forEach(v => {
  const re = new RegExp('(?:const|let|var|,)\\s*' + v.replace('$', '\\$') + '\\s*=\\s*["\']([^"\']+)["\']');
  const m = re.exec(js);
  if (m) {
    console.log(`${v} = "${m[1]}"`);
  } else {
    // search simple
    const pos = js.indexOf(v + '="/assets/');
    if (pos !== -1) {
      console.log(`${v} = ${js.substring(pos, pos + 50)}`);
    } else {
      console.log(`${v} NOT FOUND`);
    }
  }
});
