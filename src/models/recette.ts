import { Schema, model,ObjectId } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export interface IRecette {
    nom: string,
    description: string,
    images:any,
    categorieId:ObjectId,
    ingredients:any
    managerId:ObjectId,
    prix:number,
    energie:number,
  }

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IRecette>(
  {
    nom: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: false },
    prix: { type: Number, required: true },
    categorieId: { type: Schema.Types.ObjectId, ref: 'Categorie' },
    ingredients: [
      
      { ingredient: {type: Schema.Types.ObjectId, ref: 'Ingrediant',required:false },
        quantite: {type: Number, required: false}
      }
    ],
    managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
    energie: { type: Number, required: true },

    

  },
  { timestamps: true }
);

// 3. Create a Model.
export const Recette = model<IRecette>('Recette', schema);
