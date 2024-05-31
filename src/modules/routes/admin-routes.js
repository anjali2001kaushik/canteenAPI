import { uploadImage } from "../../middlewares/uploadImage.js";
import express from "express";
import { AddProductToInventory ,
    addWorkers,
    editWorkers,
    getAllProductsFromInventory,
    updateProductInInventory,
    deleteProductFromInventory,
    getAllWorkers,
    deleteWorker
} from "../controllers/admin-Controller.js";
export const adminRouter=express.Router();
adminRouter.post('/inventory',uploadImage,AddProductToInventory);
adminRouter.get('/view-inventory',getAllProductsFromInventory);
adminRouter.put('/update-inventory',updateProductInInventory);
adminRouter.delete('/remove-inventory',deleteProductFromInventory);
adminRouter.get('/get-workers',getAllWorkers)
adminRouter.post('/add-workers',addWorkers);
adminRouter.put('/edit-worker',editWorkers);
adminRouter.delete('/remove-worker',deleteWorker);
