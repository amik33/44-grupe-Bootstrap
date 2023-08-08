import express from 'express';
import { connection } from '../lib/lb.js';

const register = express.Router();

register.get('/', (req, res) => {
    return res.json({ msg: 'GET: REGISTER API' });
});

register.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    const query = `INSERT INTO users 
                        (username, email, password)
                    VALUES 
                        (?, ?, ?);`;

    const [dbRes] = await connection.execute(query, [username, email, password]);

    if (dbRes.insertId > 0) {
        console.log('ok');
        return res.status(200).json({ msg: 'POST: REGISTER API - ok, user created' });
    } else {
        console.log('err');
        return res.status(400).json({ msg: 'POST: REGISTER API - error....' });
    }
    console.log('fatal');
});

export { register };