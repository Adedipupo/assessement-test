import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { validateUser } from "../validations/user";
import { UserModel } from "../models/user";

export const registerUser = asyncHandler(async function (
  req: Request,
  res: Response
): Promise<Response | void> {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { username, password } = req.body;

  const exist = await UserModel.findOne({ username });

  if (exist) {
    return res.status(409).json({
      status: "error",
      data: "User already exist",
    });
  }

  const newUser = await new UserModel({
    username,
    password,
  });
  await newUser.save();

  return res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const loginUser =  asyncHandler(async function(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    
      const { username,password } = req.body;
      const user = await UserModel.findOne({ username });
   
      if (user && (await user.isPasswordMatch(password))) {
        return res.status(200).json({
          _id: user._id,
          username: user.username,
          password: user.password,
        })
      } else {
        return res.status(401).json({
          status: "error",
          data: "User does not exist"
        })
      }
      
});