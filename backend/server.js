import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import products from './data/products.js';

dotenv.config();

connectDB(); 

const app = express();

app.get('/', (req, res) => {
    res.send('Api is running')
})


app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow.bold))

/* inside your frontend package.json file paste this under "name" ->  "proxy": "http://127.0.0.1:5000"
this is a proxy that instead of looking at local host 3000 your frontend will send reqests to localhost 5000*/ 