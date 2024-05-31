import { SchemaTypes, Schema } from "mongoose";
import mongoose from "../../shared/db/Connection.js"
import { AppConstants } from "../../shared/utils/constants/config.js";

const roleSchema = new Schema({
  name: { type: SchemaTypes.String, required: true, unique: true },
  desc: {
    type: SchemaTypes.String,
    maxLength: 70,
    minLength: 8,
    required: true,
  },
  status: { type: SchemaTypes.String, default: "A" },
  permissions: [{ type: SchemaTypes.ObjectId, ref: "permissions" }],
});
export const RoleModel = mongoose.model("roles", roleSchema);
