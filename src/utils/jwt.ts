import { JWT_SECRET } from "../config/config";
import jwt, { SignOptions } from "jsonwebtoken";

export type JwtPayload = {
  id: number;
  email: string;
};

export const generateToken = (payload: JwtPayload) => {
  const options: SignOptions = {
    expiresIn: "15d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
