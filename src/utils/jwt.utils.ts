import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/auth.interface";
import { EXPIRES_IN, SECRET } from "../config/index";

const secret: jwt.Secret = SECRET;
const expiresIn = EXPIRES_IN as jwt.SignOptions["expiresIn"];

export function generateToken(payload: JwtPayload) {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
}
