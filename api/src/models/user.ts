import { model, Schema } from 'mongoose';
import { User } from '../types/types';

const schema = new Schema<User>({
  name: { type: String, required: true },
  password: { type: String, required: true },
});


export const UserModel = model<User>('Users', schema);
