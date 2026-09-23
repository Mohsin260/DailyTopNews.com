const fs = require('fs');
const path = require('path');
const https = require('https');

const css = fs.readFileSync('source_index.css', 'utf8');
const js = fs.readFileSync('source_index.js', 'utf8');

// Collect all /assets/... paths
const set = new Set();

const matchesCss = css.match(/\/assets\/[a-zA-Z0-9_\.\-]+/g) || [];
matchesCss.forEach(m => set.add(m));

const matchesJs = js.match(/\/assets\/[a-zA-Z0-9_\.\-]+/g) || [];
matchesJs.forEach(m => set.add(m));

console.log('Total unique asset paths found:', set.size);

const assetsDir = path.join(process.cwd(), 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function downloadFile(assetPath) {
  return new Promise((resolve) => {
    const filename = path.basename(assetPath.split('?')[0]);
    const targetFile = path.join(assetsDir, filename);

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 0) {
      return resolve({ path: assetPath, status: 'already_exists' });
    }

    const cleanPath = assetPath.split('?')[0].split('#')[0];
    const url = 'https://NewsPrk.quomodosoft.com' + cleanPath;

    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const stream = fs.createWriteStream(targetFile);
        res.pipe(stream);
        stream.on('finish', () => {
          stream.close();
          resolve({ path: assetPath, status: 200 });
        });
      } else {
        resolve({ path: assetPath, status: res.statusCode });
      }
    }).on('error', (err) => {
      resolve({ path: assetPath, status: 'error', error: err.message });
    });
  });
}

async function run() {
  const list = Array.from(set);
  console.log(`Starting download of ${list.length} assets...`);
  
  // Concurrently download 10 at a time
  for (let i = 0; i < list.length; i += 10) {
    const batch = list.slice(i, i + 10);
    const results = await Promise.all(batch.map(downloadFile));
    const okCount = results.filter(r => r.status === 200 || r.status === 'already_exists').length;
    console.log(`Batch ${Math.floor(i/10) + 1}/${Math.ceil(list.length/10)}: ${okCount}/${batch.length} success`);
  }
  console.log('Finished asset downloads!');
}

run();
