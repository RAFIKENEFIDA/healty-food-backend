import { RequestHandler } from "express";
import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import { Commande } from '@models/commande';
import { Categorie } from '@models/categorie';



// create Recette
const createCommande = async (req: Request, res: Response) => {
    

    // const data = req.body as IRecette

    try {
    
    
        const commande:any = await Commande.create(req.body);

        await commande.save((err:any, commande:any)=>{
  
            if(err){
                res.status(500).send({message:err})
            }
        })

        res.status(200).send({ message: "Commande was register successfully!" });

    } catch (err: any) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

// get manager recettes

const getAllCommandeLivreur=  catchAsync(async (req: Request, res: Response) => {
    
   try{
   const commandes = await Commande.find({livreurId:req.params.id});
   
    res.status(200).json({
      commandes,
   });
   } 
   catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
   }
  });
// get all Recettes

const getAllCommandes=  catchAsync(async (req: Request, res: Response) => {
    

   try{
   const Commandes = await Commande.find().populate('livreurId',"nom");
   
    res.status(200).json({
      Commandes,
   });
   } 
   catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
   }
  });
// get all Recettes

const getAllCommandesDisp=  catchAsync(async (req: Request, res: Response) => {
    
   try{
   const commandes = await Commande.find({status:"non affecter"})
    res.status(200).json({
      commandes,
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
 const getOneCommande=  catchAsync(async (req: Request, res: Response) => {
    

    try{

        const commande = await Commande.findById(req.params.id);
  
    res.status(200).json({
      commande,
    });

   } 
catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
}
  });

  // update Recette
const affecteCommande = async (req: Request, res: Response) => {

    try {
        const updateCommande:any=  await Commande.findByIdAndUpdate(req.body.commandeId,{ livreurId:req.body.livreurId,
            status:"en cours"});
   
        await updateCommande.save((err:any, updateCommande:any)=>{
  
            if(err){
                res.status(500).send({message:err})
            }
        })

        res.send({ message: "Commande was affected to you successfully!" });

    } catch (err: any) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
}
  // update Recette
const confirmerCommande = async (req: Request, res: Response) => {
    
  
    try {
   
        const updateCommande:any=  await Commande.findByIdAndUpdate(req.params.id,{status:"finaliser",});
   
        await updateCommande.save((err:any, updateCommande:any)=>{
  
            if(err){
                res.status(500).send({message:err})
            }
        })

        res.send({ message: "Commande was finalised successfully!" });

    } catch (err: any) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
}


export { createCommande, getAllCommandeLivreur,getAllCommandes,affecteCommande,getOneCommande,confirmerCommande,getAllCommandesDisp }
