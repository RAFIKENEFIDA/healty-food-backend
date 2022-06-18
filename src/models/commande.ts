import { Schema, model,ObjectId } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export interface ICommande {
    recettes: ObjectId,
    livreurId: ObjectId,
    prix: number,
    nomClient:string,
    numeroClient:string,
    adresseClient:string,
    emailClient:string,
    status:string,

  }

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<ICommande>(
  {

    recettes: [
    
      { recetteId: {type: Schema.Types.ObjectId, ref: 'Recette',required:false },
        quantite: {type: Number, required: false}
      }
    ],
    prix: { type: Number, required: true },
    livreurId: { type: Schema.Types.ObjectId, ref: 'Livreur',required:false },
    nomClient: { type: String, required: true },
    numeroClient: { type: String, required: true },
    adresseClient: { type: String, required: true },
    emailClient: { type: String, required: true },
    status: { type: String, default: 'non affecter',required:false },
  },
  { timestamps: true }
);

// 3. Create a Model.
export const Commande = model<ICommande>('Commande', schema);
