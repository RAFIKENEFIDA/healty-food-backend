import { Schema, model,ObjectId } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export interface IAdmin {
    nom: string,
    prenom: string,
    image:string,
    email:string,
    password:string,
    role:string,
  }

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IAdmin>(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    
    image: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' ,required:false },

  },
  { timestamps: true }
);

// 3. Create a Model.
export const Admin = model<IAdmin>('Admin', schema);
