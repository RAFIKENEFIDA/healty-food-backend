
import { Request, Response } from 'express';
const jwt = require("jsonwebtoken");
import {secret} from '@config/auth.config';


  const sendEmail=async(email:string,password:string)=>{



    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'thisfortestnode@gmail.com',
        pass: 'az12er34'
      }
    });    
    var mailOptions = {
      from: 'thisfortestnode@gmail.com',
      to: email,
      subject: "Votre password sur Healty food",
      text: "Votre password est   "+password
    };
    
    transporter.sendMail(mailOptions, function(error:Error, info:any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
  }
  const getDataUser=async(req: Request, res: Response)=>{
    let token = req.body.token;
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, secret, (err:any, decoded:any) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      // req.userId = decoded.id;
      res.status(200).send({ data:decoded});

    });
  }
  export {sendEmail,getDataUser}