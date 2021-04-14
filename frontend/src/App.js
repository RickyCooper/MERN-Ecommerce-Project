import './app.module.scss';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import CartScreen from './screens/CartScreen/CartScreen';
import {Container} from 'react-bootstrap'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact/>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
