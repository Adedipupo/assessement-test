import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { validateUser } from "../validations/user";
import { UserModel } from "../models/user";
import mongoose from "mongoose";

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

  return res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const loginUser = asyncHandler(async function (
  req: Request,
  res: Response
): Promise<Response | void> {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user && (await user.isPasswordMatch(password))) {
    return res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        username: user.username,
        password: user.password,
      },
    });
  }
  return res.status(401).json({
    status: "error",
    data: "Invalid Credentials",
  });
});

export const getUser = asyncHandler(async function (
  req: Request,
  res: Response
): Promise<Response | void> {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).send("Invalid Id");
  }
  const user = await UserModel.findById(id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
});
