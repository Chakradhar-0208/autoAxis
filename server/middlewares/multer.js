import fs from "fs";
import path from "path";
import multer from "multer";

const UPLOAD_FOLDER = "uploads/autoAxis/";

console.log(fs.existsSync(UPLOAD_FOLDER));
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const model = req.body.model || "default";
    const folder = path.join(UPLOAD_FOLDER, model);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const uniqueName = `${name}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
