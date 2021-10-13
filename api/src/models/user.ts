import { model, Schema } from "mongoose";
import { IUser } from "../types/types";
import bcrypt from "bcryptjs";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {}
});

UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const UserModel = model<IUser>("Users", UserSchema);
