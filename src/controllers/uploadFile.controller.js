const uploadImageBase64 = require("../utils/uploadFile");

exports.uploadFile = (req, res) => {
  const data = req.body;
  const host = req.protocol + '://' + req.get('host');
  if (data.base64 && data.file_name) {
    if(!uploadImageBase64(data.base64, data.file_name)){
      res.json({
        url:null
      });
    }else{
      res.json({
        url:`${host}/${data.file_name}`
      });
    }
  }else{
    res.json({
      url:null
    });
  }
  
}