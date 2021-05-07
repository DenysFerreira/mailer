const mailer = require("nodemailer");
 
module.exports = (email, nome, mensagem, anexo) => {
  const smtpTransport = mailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, //SSL/TLS
    auth: {
      user: 'ef767e682ade85',
      pass: '001766615fb8f3'
    }
  })
  
  const mail = {
    from: "<contato@propoint.com.br>",
    to: email,
    subject: `${nome} te enviou uma mensagem`,
    text: mensagem,
    //html: "<b>Opcionalmente, pode enviar como HTML</b>"
  }
  
  if(anexo){
    console.log(anexo);
    mail.attachments = [];
    mail.attachments.push({
        filename: anexo.originalname,
        content: anexo.buffer
    })
  }
  
  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mail)
      .then(response => {
          smtpTransport.close();
          return resolve(response);
      })
      .catch(error => {
          smtpTransport.close();
          return reject(error);
      });
  })
}