import mongoose from "mongoose";

interface IUser {
  id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isPasswordMatch: (password: string) => boolean;
}
export interface REQUESTUSER {
  _id?: string;
  id?: string;
  token?: string;
}

export { IUser };
