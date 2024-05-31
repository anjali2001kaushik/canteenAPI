import { InventoryModel } from "../models/inventory-schema.js";
import { WorkersModel } from "../models/workers-schema.js";

export const AddProductToInventory=async (req,res)=>{
try{
const {name,price,desc,category}=req.body;
const imageData = req.file ? req.file.buffer : null;
const imageType = req.file ? req.file.mimetype : null;
const newProduct = new InventoryModel({
    name: name,
    price: price,
    desc: desc,
    category: category,
    image: {
      data: imageData,
      contentType: imageType
    }
  });

  const savedProduct = await newProduct.save();
  console.log('PRoduct is add',savedProduct)
  res.status(201).json(savedProduct);
} catch (error) {
    res.status(400).json({ message: error.message });
  }
}
// Get all products from the inventory list
export const getAllProductsFromInventory = async (req, res) => {
  try {
    const products = await InventoryModel.find({ is_deleted: false }).exec();
    console.log("All products are ", products);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Update product in the inventory
export const updateProductInInventory = async (req, res) => {
  try {
    const name = req.body.name;

    const { price, desc, category } = req.body;
    const imageData = req.file ? req.file.buffer : null;
    const imageType = req.file ? req.file.mimetype : null;
    const updatedProduct = await InventoryModel.findOneAndUpdate({ name: name }, req.body, { new: true });
    if (!updatedProduct || updatedProduct.is_deleted) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product from the inventory
export const deleteProductFromInventory = async (req, res) => {
  try {
    const name = req.body.name;
    const result = await InventoryModel.deleteOne({ name: name });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllWorkers=async(req,res)=>{
  try {
    const workers = await WorkersModel.find({ is_deleted: false }).exec();
    // console.log("WOrkers are ",workers)
    res.status(200).json(workers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
// export const addWorkers=async(req,res)=>{
//   try{
//   const {
//     name,
//     email,
//     phone,
//     DOB,
//     BloodGroup,
//     Address,
//     Gender,
//   } = req.body;
//   const imageData = req.file ? req.file.buffer : null;
// const imageType = req.file ? req.file.mimetype : null;
// const newWorker = new WorkersModel({
//   name,
//   email,
//   phone,
//   DOB,
//   BloodGroup,
//   Address,
//   Gender,
//   image: {
//     data: imageData,
//     contentType: imageType,
//   },
// });

// const worker=await newWorker.save();
// console.log("Worker added ",worker);
// res.status(201).json(newWorker);
// } catch (error) {
// res.status(400).json({ message: error.message });
// }
// }
export const addWorkers = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      DOB,
      BloodGroup,
      Address,
      Gender,
    } = req.body;
    const imageData = req.file ? req.file.buffer : null;
    const imageType = req.file ? req.file.mimetype : null;

    const existingWorker = await WorkersModel.findOne({ email: email });
    if (existingWorker) {
      res.status(400).json({ message: "Worker with this email already exists" });
    } else {
      const newWorker = new WorkersModel({
        name,
        email,
        phone,
        DOB,
        BloodGroup,
        Address,
        Gender,
        image: {
          data: imageData,
          contentType: imageType,
        },
      });

      const worker = await newWorker.save();
      console.log("Worker added ", worker);
      res.status(201).json(newWorker);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const editWorkers=async(req,res)=>{
  try {
    const { email } = req.body; // Assuming the worker email is sent in the request body

    // Find the worker by email
    const worker = await WorkersModel.findOne({ email });

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Update the worker's information
    worker.name = req.body.name || worker.name;
    worker.phone = req.body.phone || worker.phone;
    worker.DOB = req.body.DOB || worker.DOB;
    worker.BloodGroup = req.body.BloodGroup || worker.BloodGroup;
    worker.Address = req.body.Address || worker.Address;
    worker.Gender = req.body.Gender || worker.Gender;
    worker.is_deleted = req.body.is_deleted || worker.is_deleted;

    // Save the updated worker
    await worker.save();
    console.log("Updated");
    res.status(200).json(worker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}
export const deleteWorker = async (req, res) => {
  try {
    const email = req.body.email;
    await WorkersModel.deleteOne({ email: email });
    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).json({ message: "Worker not found" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};