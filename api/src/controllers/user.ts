import express, { Request, Response,NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateUser } from '../validations/user';
import { UserModel } from '../models/user';



export const registerUser = asyncHandler(async function (req:Request, res:Response): Promise<Response | void> {
    const {error} = validateUser(req.body);
    if (error) {
        return res.status(400).json({message: "error.message"})
    }

    const {username,password} = req.body;

    return res.status(200).json({
        status: 'success',
        data: req.body
    })
})