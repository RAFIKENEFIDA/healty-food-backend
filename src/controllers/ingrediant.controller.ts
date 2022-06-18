import { RequestHandler } from "express";
import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import { Ingrediant } from '@models/ingrediant';


// create Ingrediant
const addIngrediant = async (req: Request, res: Response) => {
    
  

    try {

        const ingrediant:any = await Ingrediant.create(req.body);

        await ingrediant.save((err:any, ingrediant:any)=>{
  
            if(err){
                res.status(500).send({message:err})
            }
        })

        res.send({ message: "Ingrediant was register successfully!" });

    } catch (err: any) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

// Get one ingrediant

const getOneIngrediant=  catchAsync(async (req: Request, res: Response) => {
    

    try{

        const ingrediants = await Ingrediant.findById(req.params.id);
  
    res.status(200).json({
        ingrediants,
    });

   } 
catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
}
  });

// get manager Ingrediants
 const getIngrediants=  catchAsync(async (req: Request, res: Response) => {
    

    try{

        const ingrediant = await Ingrediant.find({managerId:req.params.id});
  
    res.status(200).json({
        ingrediant,
    });

   } 
catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
}
  });
// get all Ingrediants
 const getAllIngrediants=  catchAsync(async (req: Request, res: Response) => {
    

    try{

        const ingrediant = await Ingrediant.find();
  
    res.status(200).json({
        ingrediant,
    });

   } 
catch (err: any) {
    return res.status(400).json({
        status: false,
        message: err.message
    })
}
  });


    // update Ingrediant
const updateIngrediant = async (req: Request, res: Response) => {
    
    interface IIngrediant {
        nom: string,
        description: string,
        image:string,
        energie:number,
    }
    // const data = req.body as IIngrediant

    try {
       const data = {
            nom:req.body.nom,
            description:req.body.description,
            energie:req.body.energie,
            image:req.body.image
        } as IIngrediant
        
    
        const ingrediant:any=  await Ingrediant.findByIdAndUpdate(req.params.id, data);
   
        await ingrediant.save((err:any, ingrediant:any)=>{
  
            if(err){
                res.status(500).send({message:err})
            }
        })

        res.send({ message: "Ingrediant was updated successfully!" });

    } catch (err: any) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
}


// delete Ingrediant
const deleteIngrediant = async (req: Request, res: Response) => {
        
    // const data = req.body as IIngrediant

    try {
                    
const deleteIngrediant = await Ingrediant.findByIdAndDelete(req.params.id);
if (!deleteIngrediant){
    res.status(404).json({
        status: false,
        message: "Ingrediant not found"
    })
} else {
    res.status(200).json({
        status: true,
        message: "Ingrediant was deleted successfully"
    })
}
        } catch (err: any) {
            return res.status(400).json({
                status: false,
                message: err.message
            })
        }                                                                 

}
export { addIngrediant, getIngrediants,getOneIngrediant,updateIngrediant,deleteIngrediant,getAllIngrediants }
