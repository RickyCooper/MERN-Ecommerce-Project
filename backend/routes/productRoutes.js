import {getProductById, getProducts} from '../controllers/productController.js'

import express from 'express';

// A route determins what function controller should handle a spesific request to the api. 

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;