const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'frontend'),
  path.join(__dirname, 'backend'),
];

const extensionsToProcess = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.md', '.cjs', '.mjs'];
const excludeDirs = ['node_modules', 'dist', 'build', '.git'];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Cleanup spaces in identifiers created by previous replacement
  newContent = newContent.replace(/Aiiens CampusAuth/g, 'AiiensCampusAuth');
  newContent = newContent.replace(/Aiiens Campus_progress/g, 'AiiensCampus_progress');
  newContent = newContent.replace(/Aiiens CampusLogo/g, 'AiiensCampusLogo');
  newContent = newContent.replace(/LandingWhyAiiens Campus/g, 'LandingWhyAiiensCampus');
  newContent = newContent.replace(/Aiiens CampusM@123/g, 'AiiensCampusM@123');
  newContent = newContent.replace(/meta_Aiiens Campus_/g, 'meta_AiiensCampus_');
  newContent = newContent.replace(/Aiiens Campus_call_recordings/g, 'AiiensCampus_call_recordings');
  newContent = newContent.replace(/@Aiiens CampusSolutions/g, '@AiiensCampusSolutions');
  newContent = newContent.replace(/AIIENS CAMPUS24/g, 'AIIENSCAMPUS24');
  newContent = newContent.replace(/AIIENS CAMPUS_SECRET/g, 'AIIENSCAMPUS_SECRET');

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (excludeDirs.includes(file)) continue;

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensionsToProcess.includes(ext) || file === '.env') {
        processFile(filePath);
      }
    }
  }
}

targetDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`Processing directory: ${dir}`);
    walkDir(dir);
  }
});
console.log('Cleanup completed successfully!');
