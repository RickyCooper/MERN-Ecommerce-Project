import AsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Controllers are middleware that react to spesific calls to the api determined by the routers. 

// @desc Fetch all products
// @route GET /api/products
// @access Public 

const getProducts = AsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products);
});


// @desc Fetch product
// @route GET /api/product/:id
// @access Public 

const getProductById = AsyncHandler(async (req, res) => {
        
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProductById, getProducts };