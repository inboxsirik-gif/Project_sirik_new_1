import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import PrivacyPolicy from "./components/PrivacyPolicy";
import Termsandconditions from "./components/Termsandconditions";
import RefundReturnPolicy from "./components/RefundReturnPolicy";
import ShippingDeliveryPolicy from "./components/ShippingDeliveryPolicy";

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


           <Route path="/privacy policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Termsandconditions />} />
          <Route path="/refund-return-policy" element={<RefundReturnPolicy />} />
          <Route path="/Shipping-Delivery-policy" element={<ShippingDeliveryPolicy />} />

        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
