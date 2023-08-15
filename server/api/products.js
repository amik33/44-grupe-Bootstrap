import express from 'express';
import { connection } from '../lib/db.js';

const products = express.Router();

products.get('/', async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM products`;
        const [selectRes] = await connection.execute(selectQuery);
        return res.json(selectRes);
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { products };