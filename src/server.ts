import express from "express";
import cors from "cors";
import path from "path";
require("dotenv").config();

import { upload } from "./util/multer";
import removeExif from "./util/removeExif";
import emptyDir from "./util/emptyDir";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.ORIGIN
        : "http://localhost:8080",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/upload-image", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      res.status(400).json({
        status: false,
        message: "Only image files are allowed!",
      });
    } else {
      if (image.mimetype === "image/jpeg") {
        removeExif(
          `${__dirname}/images/${image.filename}`,
          `${__dirname}/images/${image.filename}`
        );
      }
      await emptyDir(path.resolve(__dirname, "./images"), image.filename);
      res.json({
        status: true,
        message: "File is uploaded.",
        data: {
          filename: image.filename,
          mimetype: image.mimetype,
          size: image.size,
        },
      });
    }
  } catch (err: unknown) {
    res.status(500).json({ status: false, err });
  }
});

app.get("/api/images/:name", async (req, res) => {
  const options = {
    root: path.join(__dirname, "images"),
  };
  const fileName = req.params.name;
  res.sendFile(fileName, options, (err: unknown) => {
    if (err) {
      res.status(500).json({ status: false, err });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}.`));
