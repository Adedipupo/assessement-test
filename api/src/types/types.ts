import mongoose from "mongoose";

interface IUser {
  id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  token?: string;
  isPasswordMatch: (password: string) => boolean;
}

export { IUser };
