import { SchemaTypes, Schema } from "mongoose";
import mongoose from "../../shared/db/Connection.js";
// import { AppConstants } from "";
const inventorySchema= new Schema({
    image: {
        data:SchemaTypes.Buffer,
        contentType: String
      },
    name: { type: SchemaTypes.String, required: true, unique: true },
    price: {
      type: SchemaTypes.String,
      maxLength: 4,
      minLength: 1,
      required: true,
    },
    desc: { type: SchemaTypes.String, required: true },

    category: { type: SchemaTypes.String, default: "Dish" },
    is_deleted: { type: SchemaTypes.Boolean, default: false },
  });   
export const InventoryModel = mongoose.model('inventories', inventorySchema);
