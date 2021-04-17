const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { upload } = require('./util/multer');
const removeExif = require('./util/removeExif');
const emptyDir = require('./util/emptyDir');

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://imago-uploader.netlify.app' : 'http://localhost:8080',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/upload-image', upload.single('image'), async (req, res, next) => {
    try {
        const image = req.file;
        if (!image) {
            res.status(400).json({
                status: false,
                message: 'Only image files are allowed!'
            });
        } else {
            if (image.mimetype === 'image/jpeg') {
                removeExif(`${__dirname}/images/${image.filename}`, `${__dirname}/images/${image.filename}`);
            }
            await emptyDir(path.resolve(__dirname, './images'), image.filename);
            res.json({
                status: true,
                message: 'File is uploaded.',
                data: {
                    filename: image.filename,
                    mimetype: image.mimetype,
                    size: image.size
                }
            });
        }
    } catch (err) {
        res.status(500).json({ status: false, err });
    }
});

app.get('/api/images/:name', async (req, res) => {
    const options = {
        root: path.join(__dirname, 'images'),
    }
    const fileName = req.params.name;
    res.sendFile(fileName, options, (err) => {
        if (err) {
            res.status(err.statusCode).json({ status: false, err });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);

