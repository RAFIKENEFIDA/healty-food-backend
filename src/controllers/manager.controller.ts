import {secret} from '@config/auth.config';
import { Manager } from "@models/manager";

import {sendEmail} from "@controllers/commun.controller"

// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { catchAsync } from '@utils/catchAsync';

import { Request, Response } from 'express';
import generator from 'generate-password';


// signup for admin

const signup=catchAsync(async (req: Request, res: Response)=>{


    try {


    let password = generator.generate({
        length: 10,
        numbers: true
    });

    const manager=new Manager({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        image:req.body.image,
        password:bcrypt.hashSync(password)
    });

    manager.save((err, manager)=>{

        if(err){
            res.status(500).send({message:err})
        }
    })

    console.log(password);
    // sendEmail(req.body.email,password)  
    res.status(200).send({ message: "manager was registered successfully!" });
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
        Manager.findOne({
            email:req.body.email,
        }).exec((err, manager)=>{ 
           
            // if error retun error
            if(err){
             res.status(500).send({ message: err });

            }
            // if deosn't exist return response is not found
            if(!manager){
                res.status(203).send({ message: "Email or Password Invalid" });
            }
            // check password if correct, by comparing passwords
            else{

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    manager.password
                  );
             
                // return invalid password if passwords doesn't identique  
            
                  if (!passwordIsValid) {
                    return res.status(203).send({ message: "Invalid Password!" });
                  };
        
                 var token=jwt.sign({manager},secret,{
                    expiresIn: 86400, // 24 hours
                 })
        
                 var authorities = [];
        
                //  req.session.token  = token;
    
    
        
                 res.status(202).send({
                   token:token,
                   data:manager,
                 });

            }
      
    
        })
        


    }catch(err){
        res.status(500).send({message:err})
    }


       
})


// get all Recettes

const getAllManagers=  catchAsync(async (req: Request, res: Response) => {
    

    try{
    const Managers = await Manager.find();
    
     res.status(200).json({
       Managers,
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
 const getOneManager=  catchAsync(async (req: Request, res: Response) => {
    

    try{

        const manager = await Manager.findById(req.params.id);
  
    res.status(200).json({
      manager,
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
const deleteManager = async (req: Request, res: Response) => {
        
    // const data = req.body as IRecette

    try {
                    
const deletemanager = await Manager.findByIdAndDelete(req.params.id);
if (!deletemanager){
    res.status(404).json({
        status: false,
        message: "Mangers not found"
    })
} else {
    res.status(200).json({
        status: true,
        message: "Mangers was deleted successfully"
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
  const updateManager = async (req: Request, res: Response) => {
    
 
    // const data = req.body as IRecette

    try {
   
        
        
        const recette:any=  await Manager.findByIdAndUpdate(req.params.id, req.body);
   
        await recette.save((err:any, recette:any)=>{
  
            if(err){
                res.status(500).send({message:err})
            }
        })

        res.send({ message: "Manager was updated successfully!" });

    } catch (err: any) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
}
export { signin,signup,getAllManagers,deleteManager,updateManager,getOneManager }


