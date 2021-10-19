import jwt from "jsonwebtoken";

export const generateToken = function (id: string): string {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "2d",
  });
};
