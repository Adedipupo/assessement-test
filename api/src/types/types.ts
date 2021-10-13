import mongoose from "mongoose";

interface IUser {
  id?: mongoose.Types.ObjectId;
  username: string;
  password: string;
  token?: string;
  isPasswordMatch: (password: string) => boolean;
}

export { IUser };
