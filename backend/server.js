const express = require('express');
const products = require('./data/products')
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

app.listen(5000, console.log('Server running on port 5000'))

/* inside your frontend package.json file paste this under "name" ->  "proxy": "http://127.0.0.1:5000"
this is a proxy that instead of looking at local host 3000 your frontend will send reqests to localhost 5000*/ 