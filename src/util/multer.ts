import multer from "multer";
import shortid from "shortid";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve(__dirname, "../images"));
  },
  filename: function (_req, file, cb) {
    let ext;
    if (file.mimetype == "image/jpeg") {
      ext = ".jpg";
    } else if (file.mimetype === "image/png") {
      ext = ".png";
    } else if (file.mimetype === "image/gif") {
      ext = ".gif";
    }
    cb(null, shortid.generate() + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export { upload };
