import { model, Schema } from 'mongoose';
import { User } from '../types/types';

const schema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});


export const UserModel = model<User>('Users', schema);
