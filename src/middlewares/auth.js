import jwt from "jsonwebtoken";
import { catchError } from "./catchError.js";
import ErrorHandler from "../shared/utils/ErrorHandler.js";
import { UserModel } from "../modules/models/user-schema.js";

export const isAuthenticated = catchError( async(req, res, next) => {
  console.log("ENTERERd auth.js  ")
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not logged In", 401));

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  req.user = await UserModel.findById(decoded._id);
  console.log("USSS",req.user);
  next();
});
