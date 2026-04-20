const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
module.exports.upload = (req, res, next) => {
  if (req.file) {
    const uploader = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((err, res) => {
          if (err) {
            reject(err)
          }
          if (res) resolve(res)
        })
        streamifier.createReadStream(req.file.buffer).pipe(stream)
      })
    }
    async function upload(req) {
      let res = await uploader(req);
      req.body[req.file.fieldname] = res.secure_url
      next();
    }
    upload(req)
  }
  else{
    next();
  }
}