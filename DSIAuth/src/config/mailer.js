import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


let mailer = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

function sendMail(mailOptions) {
  return new Promise((resolve, reject)=>{
    mailer.sendMail(mailOptions, function(err, info) {
      if(err) reject(err)
      resolve(info)
    })
  })
}

export default { sendMail }
