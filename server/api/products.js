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

products.post('/', async (req, res) => {
    const { name, slug } = req.body;

    try {
        const insertQuery = `INSERT INTO products ( name, slug) VALUES (?, ?);`;
        const [inserttRes] = await connection.execute(insertQuery, [name, slug]);
        
        if (inserttRes.affectedRows === 1) {
            return res.status(201).json({msg: 'Product created'});
        }

        return res.status(400).json({msg: 'Problems with product creation'});
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { products };