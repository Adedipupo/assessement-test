import { model, Schema } from 'mongoose';
import { IUser } from '../types/types';

const schema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});


export const UserModel = model<IUser>('Users', schema);
