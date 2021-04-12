import './app.module.scss';

import {Container} from 'react-bootstrap'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to pro shop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
