import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (cb) {

    cb(null, path.join(process.cwd(), "src", "uploads"));
  },

  filename: function (file, cb) {

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload