const nodeMailer=require('nodemailer')
require('dotenv').config()

module.exports.sendEmail=(receiveEmail, subject, html)=>{
  const transport=nodeMailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.EMAIL,
      pass:process.env.PASS
    }
  })
  const mailOptions={
    from:process.env.EMAIL,
    to:receiveEmail,
    subject:subject,
    html:html
  }
  transport.sendMail(mailOptions)
}