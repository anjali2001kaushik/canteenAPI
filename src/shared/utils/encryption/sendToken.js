import { getJWTToken } from "./token.js";

export const sendToken = (res, user, message, statusCode = 200) => {
  console.log("The Login ", user);
  const token = getJWTToken(user.id);
  //res.status(200).json({token:token}); // FrontEnd (Read Token and Store Token by Own) (LocalStorage, SessionStorage)
  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,

    secure: true,
    sameSite: "None",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
  });
};
