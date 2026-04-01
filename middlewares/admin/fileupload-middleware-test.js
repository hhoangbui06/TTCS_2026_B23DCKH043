const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
require('dotenv').config()
cloudinary.config({
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET
})

module.exports.upload = (req, res, next) => {
    if (req.file) {
        let uploader = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream((err, res) => {
                    if (res) resolve(res)
                    if (err) reject(err);
                })
                streamifier.createReadStream(req.file.buffer).pipe(stream)
            })
        }
        let cloudUpload = async (req) => {
            let res = await uploader(req)
            req.body[req.file.fieldname] = res.secure_url
            next();
        }
        cloudUpload(req)

    }
    else next();
}