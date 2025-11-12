const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');


const app = express();
app.use(bodyParser.json());


const pool = new Pool({
host: process.env.PGHOST || 'postgres',
user: process.env.PGUSER || 'demo',
password: process.env.PGPASSWORD || 'demo',
database: process.env.PGDATABASE || 'demo',
port: process.env.PGPORT || 5432,
});


// simple table create
pool.query(`CREATE TABLE IF NOT EXISTS notes (id serial primary key, text text);`).catch(e=>console.error(e.stack));


app.get('/api/notes', async (req, res) => {
const { rows } = await pool.query('SELECT id, text FROM notes ORDER BY id DESC');
res.json(rows);
});


app.post('/api/notes', async (req, res) => {
const { text } = req.body;
await pool.query('INSERT INTO notes(text) VALUES($1)', [text || '']);
res.status(201).json({ok:true});
});


app.listen(4000, () => console.log('Backend listening on 4000'));