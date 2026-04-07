const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
module.exports.upload = (req, res, next) => {
  if (req.file) {
    let streamUploader = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((err, res) => {
          if (res) resolve(res);
          if (err) reject(err);
        })
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      })
    }
    async function upload(req) {
      let res = await streamUploader(req);
      req.body[req.file.fieldname] = res.secure_url;
      next();
    }
    upload(req);
  }
  else {
    next();
  }
}