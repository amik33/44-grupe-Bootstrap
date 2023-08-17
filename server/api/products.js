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
    const { name, slug, supplier, type, amount, label } = req.body;

    try {
        const insertQuery = `INSERT INTO products ( name, slug, supplier, type, amount, label ) VALUES (?, ?, ?, ?, ?, ?);`;
        const [inserttRes] = await connection.execute(insertQuery, [name, slug, supplier, type, amount, label ]);
        
        if (inserttRes.affectedRows === 1) {
            return res.status(201).json({msg: 'Product created'});
        }

        return res.status(400).json({msg: 'Problems with product creation'});
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' });
    }
});

products.put('/', async (req, res) => {
    const {name, supplier, type, amount, label } = req.body;

    try {
        const updateQuery = `UPDATE products SET  
        (name, supplier, type, amount, label) 
        VALUES (?, ?, ?, ?, ?)
        WHERE 1 ;`;
        const [updateRes] = await connection.execute(updateQuery, [name, supplier, type, amount, label ]);
        
        if (updateRes.affectedRows === 1) {
            return res.status(201).json({msg: 'Product updated'});
        }

        return res.status(400).json({msg: 'Problems with product updation'});
    } catch (error) {
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { products };
