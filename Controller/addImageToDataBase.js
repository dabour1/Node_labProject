const addImageToDataBase = (file) => {
  if (file) { return `${file}`; }
  else {
    return `empty`;
  }
}
module.exports = addImageToDataBase;