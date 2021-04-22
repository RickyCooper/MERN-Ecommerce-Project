import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB(); // connect MongoDB database

const app = express();

app.use(express.json()); // <- allows you to accept json data in the body 

app.get('/', (req, res) => { 
    res.send('Api is running')
})

app.get('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

/* [ NOTES ] 

 - req is an object containing information about the HTTP request that raised the event
 - res to send back the desired HTTP response.

*/ 

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow.bold))

/* inside your frontend package.json file paste this under "name" ->  "proxy": "http://127.0.0.1:5000"
this is a proxy that instead of looking at local host 3000 your frontend will send reqests to localhost 5000*/ 

