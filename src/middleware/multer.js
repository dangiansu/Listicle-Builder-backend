import fs from 'fs';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const uniqueId = uuidv4();
    let folderPath;
    if (file.mimetype.startsWith('image/')) {
      folderPath = `./uploads/${currentDate}/Images/${uniqueId}`;
    } else if (file.mimetype.startsWith('video/')) {
      folderPath = `./uploads/${currentDate}/Videos/${uniqueId}`;
    } else {
      return cb(new Error('Invalid file type'), false);
    }

    // Ensure directory exists
    fs.mkdirSync(folderPath, { recursive: true }); // Create directory recursively

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const fileNameWithoutExtension = file.originalname.split('.')[0];
    const fileExtension = file.originalname.split('.')[1];
    const fullFileName = fileNameWithoutExtension + '.' + fileExtension;  
    cb(null, fullFileName);
  }
});

// Multer upload instance for multiple files
const upload = multer({ storage });

export default upload;
