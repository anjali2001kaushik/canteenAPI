import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadImage = (req, res, next) => {
  return upload.single('image')(req, res, next);
};