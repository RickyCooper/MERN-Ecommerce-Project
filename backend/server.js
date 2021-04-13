import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB(); 

const app = express();

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow.bold))

/* inside your frontend package.json file paste this under "name" ->  "proxy": "http://127.0.0.1:5000"
this is a proxy that instead of looking at local host 3000 your frontend will send reqests to localhost 5000*/ 

