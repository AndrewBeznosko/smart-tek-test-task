const svgModules = import.meta.glob('./*.svg', { as: 'raw' });
console.log(svgModules);
const svgIcons = {};

const getFileNameWithoutExtension = (filePath) => {
  // Extract the file name using the last portion of the path
  const fileNameWithExtension = filePath.split('/').pop();

  // Remove the file extension
  return fileNameWithExtension.split('.').slice(0, -1).join('.');
}

Object.keys(svgModules).forEach((filePath) => {
  svgIcons[getFileNameWithoutExtension(filePath)] = svgModules[filePath];
});

export default svgIcons;
