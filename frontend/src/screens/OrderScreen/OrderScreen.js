import {Button, Card, Col, Image, ListGroup, Row} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import FormContainer from '../../components/FormContainer/FormContainer';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import {getOrderDetails, payOrder } from '../../actions/orderActions';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../../constants/orderConstants'
const OrderScreen = ({match}) => {

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch();
    const orderId = match.params.id
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading:loadingPay, success:successPay } = orderPay;

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    if(!loading) {
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    useEffect(() => {

        // Add paypal script to document
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
        /*
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        } */

    }, [order, orderId, dispatch, successPay]) 

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
        <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},
                            {order.shippingAddress.city},
                            {order.shippingAddress.postalCode}, 
                            {order.shippingAddress.country}, 
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not yet Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method:</h2>
                        <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}, 
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant="danger">Not yet paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items:</h2>
                        <strong>Method:</strong>
                        {order.orderItems.length === 0 ? <Message>Your Order Is Empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col mb={4}>
                                            {item.qty} x £{item.price} = £{item.qty * item.price}
                                        </Col>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}, 
                    </ListGroup.Item>        
                </ListGroup>
            </Col>
                <Col mb={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>£{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>£{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>£{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>£{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady ? <Loader /> : (
                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                            )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
    </Row></>
}

export default OrderScreen
