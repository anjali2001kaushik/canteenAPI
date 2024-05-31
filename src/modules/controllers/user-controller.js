import { userService } from "../services/user-sevice.js";
import { AppConstants } from "../../shared/utils/constants/config.js";
// import jwt from "jsonwebtoken";
import { loadMessageBundle } from "../../shared/utils/i18n/message-reader.js";
// import { generateToken, verifyToken } from "../../../shared/utils/token.js";
// import { catchError } from "../../../middlewares/catchError.js";
// import ErrorMiddleWare from "../../../middlewares/Error.js";
import ErrorHandler from "../../shared/utils/ErrorHandler.js";
import { sendToken } from "../../shared/utils/encryption/sendToken.js";
import { UserModel } from "../models/user-schema.js";
import { passwordHashing } from "../../shared/utils/encryption/password-hash.js";
// import { RoleModel } from "../models/role-schema.js";
// import { UserModel } from "../models/user-schema.js";
const { FILE_NOT_FOUND, SERVER_INTERNAL_ERROR, AUTH_FAIL } =
  AppConstants.ERROR_CODES;
const { SUCCESS_CODE } = AppConstants;
const loadBundle = () => {
  const messages = loadMessageBundle();
  return messages;
};
// export const register = catchError(
//   async (request, response, next) => {
//     const userData = request.body;
//     if (userData.email == null && userData.password == null) {
//       return next(new ErrorHandler("Please Enter All Fields", 400));
//     }
//     const doc = await userService.register(userData);
//     if (!doc) return next(new ErrorHandler("User Already Exists"), 409);
//     sendToken(response, doc, "Registered Successfully", 201);
//   }
//   //response.end('<h1> Register </h1>');
// );

// export const login = async (request, response, next) => {
//   const messages = loadBundle();
//   const { email, password } = request.body;
//   if (!email || !password)
//     return next(new ErrorHandler("Please Enter All Fields", 400));

//   try {
//     const user = await userService.login(email, password);

//     if (!user) return next(new ErrorHandler("User Not Exists", 401));

//     sendToken(response, user, `Welcome back ${user.name}`, 201);
//   } catch (error) {
//     response.send(new ErrorHandler(error.message, 500));
//   }
// };
export const login = async (request, response, next) => {
  const messages = loadBundle();
  const { email, password } = request.body;
  console.log("got email and password", email);
  console.log("password",password)
  if (!email || !password)
    return next(new ErrorHandler("Please Enter All Fields", 400));

  try {
     // Check if the email ends with @rkgit.edu.in
     if (!email.endsWith('@rkgit.edu.in')) {
      return next(new ErrorHandler("Invalid email domain", 400));
    }
      // Check if the user exists
      let existingUser= await UserModel.findOne({ email });
      console.log("Existing user value",existingUser);
      const hashPassword=await passwordHashing(password);
      if (!existingUser) {
        // If the user doesn't exist, create a new user
       const newUser = new UserModel({
          email,
          password:hashPassword,
          name: email.split('@')[0], // Use the email local part as the name
        });
        await newUser.save();
      
      }
        const user = await userService.login(email, password);
    if (!user) return next(new ErrorHandler("User Not Exists", 401));
        sendToken(response, user, `Welcome back ${user.name}`, 201);

      


  } catch (error) {
    response.send(new ErrorHandler(error.message, 500));
  }
};


// export const getRoleData = catchError(async (req, res) => {
//   try {
//     // Fetch all roles from the database
//     const roles = await RoleModel.find();

//     console.log("99999999999999",roles)
//     // Send the roles as a response
//     res.status(200).json({ roles });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ error: error.message });
//   }
// });


export const logout = async (request, response, next) => {
  try {
    response.clearCookie("token");
    response.status(200).json({ message: "Logout successful" });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
};
export const placeOrder=(rez  )=>{

}
