import express from 'express';
import multer from 'multer';
import  path from 'path';
import { register } from './register.js';
import { login } from './login.js';
import { products } from './products.js';

const api = express.Router();


api.get('/', (req, res) => {
    return res.send('API ERROR: nepilnas URL');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1e7,
    }
});
api.use('/upload', upload.single('image_file'), (req, res) => {
    return res.json({
        msg: 'Upload complete...',
        path: req.file.filename,
    });

});

api.use('/register', register);
api.use('/login', login);
api.use('/products', products);

export { api };