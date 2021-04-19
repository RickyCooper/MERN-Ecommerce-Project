import './app.module.scss';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import CartScreen from './screens/CartScreen/CartScreen';
import {Container} from 'react-bootstrap'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';




const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
