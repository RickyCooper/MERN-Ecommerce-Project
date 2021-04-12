import './app.module.scss';

import {Container} from 'react-bootstrap'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
