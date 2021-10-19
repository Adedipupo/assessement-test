import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
import asyncHandler from "express-async-handler";

export const verifyToken = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = <any>(
        jwt.verify(token, process.env.JWT_SECRET_KEY as string)
      );
      const user = await UserModel.findById(decoded.id);
      req.user = user;
      return next();
    } catch (error) {
      res.status(401).send("Bearer token is missing");
    }
  } else {
    return res.status(404).send("Not Authorised, invalid token");
  }
});
