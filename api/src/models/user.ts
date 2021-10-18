import { model, Schema } from "mongoose";
import { IUser } from "../types/types";
import bcrypt from "bcryptjs";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    // eslint-disable-next-line no-empty
  } catch (error) {}
});

UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const UserModel = model<IUser>("Users", UserSchema);
