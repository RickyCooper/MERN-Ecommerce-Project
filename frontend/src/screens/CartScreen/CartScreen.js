import {Button, Card, Col, Form, Image, ListGroup, Row} from 'react-bootstrap';
import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import {useDispatch, useSelector} from 'react-redux';

import {Link} from 'react-router-dom';
import Message from '../../components/Message/Message';

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;

    // location.search will return everything in the url paramaters after the ?
    // to get the value we can split the string by '=' returning an array [?qty= , 1]
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
        console.log('remove');
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty<Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        £{item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h2>
                            £{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                            type='button' 
                            className='btn-block' 
                            disabled={cartItems.length === 0} 
                            onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
