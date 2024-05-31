import { SchemaTypes, Schema } from "mongoose";
import mongoose from "../../shared/db/Connection.js";
import { AppConstants } from "../../shared/utils/constants/config.js";
const { USER_SCHEMA } = AppConstants.SCHEMAS;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// _id
// UserSchema join with Role Id
const userSchema = new Schema({
  email: { type: SchemaTypes.String, required: true, unique: true },
  password: {
    type: SchemaTypes.String,
    maxLength: 70,
    minLength: 8,
    required: true,
  },
  name: { type: SchemaTypes.String, required: true },
  //role:{name:{type:SchemaTypes.String}, desc:{type:SchemaTypes.String}}, // Embedded Document
  
  role: { type: SchemaTypes.ObjectId, ref: "roles" }, // (Reference) User Join Build Role (1:N Relationship)
  firstTimePasswordReset: { type: SchemaTypes.String, default: "N" },
  is_deleted: { type: SchemaTypes.Boolean, default: false },
});

// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
//     expiresIn: "15d",
//   });
// };

// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

export const UserModel = mongoose.model(USER_SCHEMA, userSchema);
