import {secret} from '@config/auth.config';
import { Admin } from "@models/admin";
import { Manager } from "@models/manager";
import { Livreur } from "@models/livreur";
import { Commande } from "@models/commande";
import { Recette } from "@models/recette";

import {sendEmail} from "@controllers/commun.controller"

// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { catchAsync } from '@utils/catchAsync';

import { Request, Response } from 'express';
import generator from 'generate-password';


// signup for admin

const signupAdmin=catchAsync(async (req: Request, res: Response)=>{


    try {


    let password = generator.generate({
        length: 10,
        numbers: true
    });

    const admin=new Admin({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        image:req.body.image,
        password:bcrypt.hashSync(password)
    });

    admin.save((err, admin)=>{

        if(err){
            res.status(500).send({message:err})
        }
    })

    console.log(password);
    // sendEmail(req.body.email,password)  
    res.status(200).send({ message: "admin was registered successfully!" });
} catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
}

})

// signin for admin

const signinAdmin=catchAsync(async (req: Request, res: Response)=>{

    try{
        // check admin if exist by email
        Admin.findOne({
            email:req.body.email,
        }).exec((err, admin)=>{ 
           
            // if error retun error
            if(err){
             res.status(500).send({ message: err });

            }
            // if deosn't exist return response is not found
            if(!admin){
                res.status(203).send({ message: "Email or Password Invalid" });
            }
            // check password if correct, by comparing passwords
            else{

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    admin.password
                  );
             
                // return invalid password if passwords doesn't identique  
            
                  if (!passwordIsValid) {
                    return res.status(203).send({ message: "Invalid Password!" });
                  };
        
                 var token=jwt.sign({admin},secret,{
                    expiresIn: 86400, // 24 hours
                 })
        
                 var authorities = [];
        
                //  req.session.token  = token;
    
    
        
                 res.status(202).send({
                   token:token,
                   data:admin,
                 });

            }
      
    
        })
        


    }catch(err){
        res.status(500).send({message:err})
    }


       
})

// statistique for signinAdmin

const StatistiqueAdmin=  catchAsync(async (req: Request, res: Response) => {
    try{
    const countManagers = await Manager.countDocuments();
    const countLivreur = await Livreur.countDocuments();
    const countRecettes = await Recette.countDocuments();
    const countCommandes = await Commande.countDocuments();
    const countCommandesAffected = await Commande.countDocuments({status:"en cours"});
    const countCommandesFinalized = await Commande.countDocuments({status:"finaliser"});
    
     res.status(200).json({
        countManagers:countManagers,
        countLivreur:countLivreur,
        countCommandes:countCommandes,
        countRecettes:countRecettes,
        countCommandesAffected:countCommandesAffected,
        countCommandesFinalized:countCommandesFinalized,

    });
    } 
    catch (err: any) {
     return res.status(400).json({
         status: false,
         message: err.message
     })
    }
});


export { signinAdmin,signupAdmin,StatistiqueAdmin }


