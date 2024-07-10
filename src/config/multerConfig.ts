import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinayConfig';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  
});

const upload = multer({ storage: storage });

export default upload;