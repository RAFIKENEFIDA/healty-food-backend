import {secret} from '@config/auth.config';
import { Livreur } from "@models/livreur";
import { Commande } from "@models/commande";

import {sendEmail} from "@controllers/commun.controller"

// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { catchAsync } from '@utils/catchAsync';

import { Request, Response } from 'express';
import generator from 'generate-password';


// signup for admin

const signupLivreur=catchAsync(async (req: Request, res: Response)=>{


    try {


    let password = generator.generate({
        length: 10,
        numbers: true
    });

    const livreur=new Livreur({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        image:req.body.image,
        password:bcrypt.hashSync(password)
    });

    livreur.save((err, livreur)=>{

        if(err){
            res.status(500).send({message:err})
        }
    })
    // sendEmail(req.body.email,password)  
    console.log(password);
    res.status(200).send({ message: "livreur was registered successfully!" });
} catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
}

})

// signin for admin

const signin=catchAsync(async (req: Request, res: Response)=>{

    try{
        // check admin if exist by email
        Livreur.findOne({
            email:req.body.email,
        }).exec((err:any, livreur:any)=>{ 
           
            // if error retun error
            if(err){
             res.status(500).send({ message: err });

            }
            // if deosn't exist return response is not found
            if(!livreur){
                res.status(203).send({ message: "Email or Password Invalid" });
            }
            // check password if correct, by comparing passwords
            else{

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    livreur.password
                  );
             
                // return invalid password if passwords doesn't identique  
            
                  if (!passwordIsValid) {
                    return res.status(203).send({ message: "Invalid Password!" });
                  };
        
                 var token=jwt.sign({livreur},secret,{
                    expiresIn: 86400, // 24 hours
                 })
        
                 var authorities = [];
        
                //  req.session.token  = token;
    
    
        
                 res.status(202).send({
                   token:token,
                   data:livreur,
                 });

            }
      
    
        })
        


    }catch(err){
        res.status(500).send({message:err})
    }


       
})


// get all Recettes

const getAllLivreurs=  catchAsync(async (req: Request, res: Response) => {
    

    try{
    const livreurs = await Livreur.find();
    
     res.status(200).json({
       livreurs,
    });
    } 
    catch (err: any) {
     return res.status(400).json({
         status: false,
         message: err.message
     })
    }
   });


   // get one recette 
 const getOneLivreur=  catchAsync(async (req: Request, res: Response) => {
    

    try{

        const livreur = await Livreur.findById(req.params.id);
  
    res.status(200).json({
      livreur,
    });

   } 
catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
}
  });
// delete reccete
const deleteLivreur = async (req: Request, res: Response) => {
        
    // const data = req.body as IRecette

    try {
                    
const deletelivreur = await Livreur.findByIdAndDelete(req.params.id);
if (!deletelivreur){
    res.status(404).json({
        status: false,
        message: "Livreurs not found"
    })
} else {
    res.status(200).json({
        status: true,
        message: "Livreurs was deleted successfully"
    })
}
        } catch (err: any) {
            return res.status(400).json({
                status: false,
                message: err.message
            })
        }                                                                 

}


  // update Recette
  const updateLivreur = async (req: Request, res: Response) => {
    
 
    // const data = req.body as IRecette

    try {
   
        
        
        const recette:any=  await Livreur.findByIdAndUpdate(req.params.id, req.body);
   
        await recette.save((err:any, recette:any)=>{
  
            if(err){
                res.status(500).send({message:err})
            }
        })

        res.send({ message: "Livreur was updated successfully!" });

    } catch (err: any) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

// statistiques livreur
const StatistqueLivreur=  catchAsync(async (req: Request, res: Response) => {
    try{
    const countCommandes = await Commande.countDocuments({livreurId:req.params.id});
    const countCommandesAffected = await Commande.countDocuments({status:"en cours",livreurId:req.params.id});
    const countCommandesFinalized = await Commande.countDocuments({status:"finaliser",livreurId:req.params.id});
    
     res.status(200).json({
        countCommandes:countCommandes,
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
export { signin,signupLivreur,getAllLivreurs,deleteLivreur,updateLivreur,getOneLivreur,StatistqueLivreur }


