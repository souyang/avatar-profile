const fs = require('fs');
const path = require('path');

// Define the directory containing your SVG files
const directoryPath = __dirname;
// Read the directory and filter for SVG files
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const renamedPattern = /^avatar-(\d+)\.svg$/;
  
  // Find the highest index among already renamed files
  let maxIndex = 0;
  files.forEach(file => {
    const match = file.match(renamedPattern);
    if (match) {
      const index = parseInt(match[1], 10);
      maxIndex = Math.max(maxIndex, index);
    }
  });

  // Filter to get only SVG files and skip files that already match the pattern "avatar-<index>.svg"
  const svgFiles = files.filter(file => {
    const isSVG = path.extname(file).toLowerCase() === '.svg';
    const isRenamed = renamedPattern.test(file);
    return isSVG && !isRenamed;
  });

  // Rename each SVG file that are not renamed with the format "avatar-<index>.svg"
  svgFiles.forEach((file, index) => {
    const oldPath = path.join(directoryPath, file);
    const newPath = path.join(directoryPath, `avatar-${maxIndex + index + 1}.svg`);

    // Rename the file
    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.error(`Error renaming ${file} to avatar-${index + 1}.svg:`, err);
      } else {
        console.log(`Renamed ${file} to avatar-${index + 1}.svg`);
      }
    });
  });
});
