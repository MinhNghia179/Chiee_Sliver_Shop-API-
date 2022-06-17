const fs = require('fs');

const uploadImageBase64 = (base64,fileName) => {
  if(!base64 && !fileName){
    return null;
  }
  
  try {
    const path = `./uploads/${fileName}`;
    const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(path, base64Data, { encoding: 'base64' });
    return true;
  } catch (error) {
    return false;
  }
} 

module.exports = uploadImageBase64;