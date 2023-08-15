import express from 'express';
import { register } from './register.js';
import { login } from './login.js';
import { products } from './products.js';

const api = express.Router();


api.get('/', (req, res) => {
    return res.send('API ERROR: nepilnas URL');
});

api.use('/register', register);
api.use('/login', login);
api.use('/products', products);

export { api };