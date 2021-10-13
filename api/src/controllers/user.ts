import express, { Request, Response,NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validateUser } from '../validations/user';
import { UserModel } from '../models/user';



export const registerUser = asyncHandler(async function (req:Request, res:Response): Promise<Response> {
    
})