const router=require('express').Router();
const nodemailer=require('nodemailer');



router.get('/',(req,res)=>{
    res.send('contacted')
})

router.post('/',(req,res)=>{
    // smtp is protocol for transporting every email provider supports this protocol

var data=req.body;
    var smtpTransport=nodemailer.createTransport({
        service:'Gmail',
        host: "smtp.mailtrap.io",
        port:465,
        auth:{
            user:'vartika1064.be20@chitkarauniversity.edu.in',
            pass:'@TEMP#45468521'
        }
    });



var mailOptions = {
  from: data.email,
  to: 'vartikas231@gmail.com',
  subject: `Message from ${data.name}`,
  html: `
    
    <h3>Informations</h3>
    <ul>
    <li>Name:${data.name}</li>
    <li>Email:${data.email}</li>
    </ul>

    <h3>Message</h3>
    <p>${data.message}</p>
    `
    
}


smtpTransport.sendMail(mailOptions,(err,response)=>{
    try {
        if(err){return res.status(400).json({msg:err})}
        else{
            return res.status(200).json({msg:`Message was sent`})
        }
    } catch (error) {
        res.status(500).json({msg:err})
    }
})
});


module.exports=router