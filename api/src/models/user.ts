import { model, Schema } from 'mongoose';
import { IUser } from '../types/types';
import bcrypt from "bcryptjs";


const schema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

schema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

export const UserModel = model<IUser>('Users', schema);
