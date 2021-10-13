import mongoose from 'mongoose';

interface User {
    id?: mongoose.Types.ObjectId
    name: string;
    password: string;
    token?: string;

}

type ResponseData = Record<string, any> | Record<string, any>[]


export { User};
