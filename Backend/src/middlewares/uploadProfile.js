import multer from 'multer';
import path from 'path';
import fs from 'fs';

const profileDir = path.join(process.cwd(), 'uploads/profile');
if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile');
  },
  filename: function (req, file, cb) {
     const ext = path.extname(file.originalname);
    const filename = `profile_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpeg, png, webp).'), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024 // 5 MB
};

const uploadProfile = multer({ storage, fileFilter, limits });

export default uploadProfile;