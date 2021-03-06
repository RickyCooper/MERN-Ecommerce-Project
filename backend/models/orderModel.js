import mongoose from 'mongoose';

// A Mongoose schema defines the structure of the document, default values, validators. 

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        name: { type: String, required: true},
        qty: { type: Number, required: true},
        image: { type: String, required: true},
        price: { type: Number, required: true},
        product: { type: mongoose.Schema.Types.ObjectId, required: true, red: 'Product'},
    }],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String},
        status: { type: String},
        update_time: { type: String},
        email_address: { type: String},
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    }, 
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },   
    deliveredAt: {
        type: Date,
    },},
    {    
    timestamps:true
    });

const Order = mongoose.model('Order', orderSchema);

// A Mongoose model provides an interface to the database for creating, querying, updating, deleting records

export default Order;