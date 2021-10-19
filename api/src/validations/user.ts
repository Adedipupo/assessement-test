import { IUser } from "../types/types";
import Joi from "joi";

export const validateUser = function (obj: IUser): Record<string, any> {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .error(new Error("password is too short"))
      .required(),
  });
  return schema.validate(obj);
};
