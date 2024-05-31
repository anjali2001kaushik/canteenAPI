import { SchemaTypes, Schema } from "mongoose";
import mongoose from "../../shared/db/Connection.js";
// import { AppConstants } from "";
const workersSchema= new Schema({
    image: {
        data:SchemaTypes.Buffer,
        contentType: String
      },
    name: { type: SchemaTypes.String, required: true},
    email: { type: SchemaTypes.String, required: true, unique: true },
    phone: {
      type: SchemaTypes.String,
      maxLength: 10,
      minLength: 10,
      required: true,
    },
    DOB:{type: SchemaTypes.String, required: true },
    BloodGroup:{type: SchemaTypes.String, required: true },
    Address: { type: SchemaTypes.String, required: true },

    Gender: { type: SchemaTypes.String, default: "Male" },
    is_deleted: { type: SchemaTypes.Boolean, default: false },
  });   
export const WorkersModel = mongoose.model('workers', workersSchema);
