const nodemailer = require("nodemailer");

exports.contactForm = (req, res) => {
  const { email, name, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: `${process.env.EMAIL_TO}`,
           pass: `${process.env.PASSWORD}`
       }
   });
  
   const mailOptions = {
    from: `${email}`, // sender address
    to: `${process.env.EMAIL_TO}`, // list of receivers
    subject: 'Subject of your email', // Subject line
    html: `
        <h4>Email received from contact from : </h4>
        <p>Sender Name: ${name}</p>
        <p>Sender Email: ${email}</p>
        <p>Sender Message: ${message}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>https://appetite.com</p>
    `
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      const errStr = err.response.substr(10,35);
      return res.status(400).json({error: errStr});
    }
    res.json({success: true});
  });

};


exports.contactBlogAuthorForm = (req, res) => {
  const { authorEmail, email, name, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: `${process.env.EMAIL_TO}`,
           pass: `${process.env.PASSWORD}`
       }
   });
  
   const mailOptions = {
    from: `${email}`, // sender address
    to: `${authorEmail}`, // list of receivers
    subject: `Someone messaged you from ${process.env.APP_NAME}`, // Subject line
    html: `
        <h4>Message received from contact from : </h4>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>https://appetite.com</p>
    `
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      const errStr = err.response.substr(10,35);
      return res.status(400).json({error: errStr});
    }
    res.json({success: true});
  });

};
