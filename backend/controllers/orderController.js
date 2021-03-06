import AsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Controllers are middleware that react to spesific calls to the api determined by the routers. 

// @desc Create new order
// @route POST /api/orders
// @access Private 

const addOrderItems = AsyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    if(orderItems && orderItems === 0) {
        res.status(400)
        throw new Error('No order items')
        return 
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
});

// @desc Get order by id
// @route POST /api/orders/:id
// @access Private 


const getOrderById = AsyncHandler(async (req, res) => {
    const order = await (await Order.findById(req.params.id).populate('user', 'name email'))

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});

// @desc Udate order to paid
// @route POST /api/orders/:id/pay
// @access Private 


const updateOrderToPaid = AsyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address:  req.body.pair_email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});


export { addOrderItems, getOrderById, updateOrderToPaid }