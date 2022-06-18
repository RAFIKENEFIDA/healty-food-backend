import { Schema, model,ObjectId } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export interface IIngrediant {
    nom: string,
    description: string,
    images:any,
    energie:number,
    managerId:ObjectId
  }

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IIngrediant>(
  {
    nom: { type: String, required: true },
    description: { type: String, required: false },
    images: { type: Array, required: false },
    energie: { type: Number, required: false },
    managerId: { type: Schema.Types.ObjectId, ref: 'Manager' },
   

  },
  { timestamps: true }
);

// 3. Create a Model.
export const Ingrediant = model<IIngrediant>('Ingrediant', schema);
