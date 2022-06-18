import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.


export interface IdCategorie {
    nom: string,
    managerId: string,
    description: string,
    images:any,

}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IdCategorie>(
  {
    nom: { type: String, required: true },
    managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
    images: { type: Array, required: false },
    description: { type: String, required: true },
  

  },
  { timestamps: true }
);

// 3. Create a Model.
export const Categorie = model<IdCategorie>('Categorie', schema);
