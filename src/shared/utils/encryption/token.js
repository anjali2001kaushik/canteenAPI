import jwt from "jsonwebtoken";

export const getJWTToken = function (id) {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    console.log("Token Fails ", err);
    return false;
  }
};
