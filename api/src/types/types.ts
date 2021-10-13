import mongoose from 'mongoose';

interface IUser {
    id?: mongoose.Types.ObjectId
    username: string;
    password: string;
    token?: string;
    isPasswordMatch: (password: string) => boolean;

}

type ResponseData = Record<string, any> | Record<string, any>[]


export {IUser};
