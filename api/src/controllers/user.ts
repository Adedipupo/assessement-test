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

  const { name, email, password } = req.body;

  const exist = await UserModel.findOne({ email });

  if (exist) {
    return res.status(409).json({
      status: "error",
      data: "User already exist",
    });
  }

  const newUser = await new UserModel({
    name,
    email,
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
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && (await user.isPasswordMatch(password))) {
    return res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
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

export const getAllUser = asyncHandler(async function (
  req: Request,
  res: Response
): Promise<Response | void> {
  const user = await UserModel.find();

  if (!user) {
    res.status(400).send("Not Found");
  } else {
    res.status(200).json({
      status: "success",
      data: user,
    });
  }
});
