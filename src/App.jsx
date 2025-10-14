import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Indexpage from './Pages/Indexpage';
import ContactForm from './Pages/ContactForm';
import Aboutus from './Pages/Aboutus';
import Shop from './Pages/Shop';

import Cart from './Pages/Cart';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Indexpage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
