import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

// Modal Component (in-file)
const Modal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/20 bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click from closing when clicking inside
        className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-lg text-center"
      >
        {/* Animated warning icon with subtle pulse */}
        <motion.div
          initial={{ rotate: -8 }}
          animate={{
            rotate: [0, -8, 8, -8, 0],
            scale: [1, 1.06, 1.02, 1.06, 1],
            boxShadow: [
              "0 0 0 rgba(198,219,85,0)",
              "0 12px 30px rgba(198,219,85,0.18)",
              "0 0 0 rgba(198,219,85,0)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <div className="rounded-full p-1 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <AlertTriangle className="w-16 h-16 text-yellow-500" />
          </div>
        </motion.div>

        <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Thanks for Your Order!</h3>
        <p className="text-gray-700 mb-6 text-lg">
          We’re currently <b>not accepting any orders</b> as we’re improving our checkout system.
        </p>
        <p className="text-gray-500 mb-8">You’ll receive a notification once we’re back online. Thanks for your patience 💛</p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClose}
          className="px-8 py-3 bg-[#FE5E33] cursor-pointer hover:bg-opacity-90 text-white font-bold rounded-xl transition shadow-md"
        >
          Got It!
        </motion.button>
      </motion.div>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  const flatRate = 1;
  const estimatedTotal = subtotal + flatRate;

  const handleCheckoutClick = () => {
    // show modal that informs users orders are currently disabled
    setShowCheckoutModal(true);
  };

  // Empty cart handler
  const handleCartClick = () => {
    if (!cart || cart.length === 0) {
      alert("🛒 Your cart is empty! Redirecting to shop...");
      navigate("/shop");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Modal show={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} />

      <div className="bg-[#FE5E33]">
        <Header darkcolor={true} />
      </div>

      <div className="container h-[100dvh] mx-auto px-3 md:px-6 py-10 grid md:grid-cols-3 gap-10">
        {/* Left side */}
        <div className="md:col-span-2 md:pl-7">
          <h2 className="text-4xl font-bold mb-6">Cart</h2>

          {(!cart || cart.length === 0) ? (
            <div className="text-center text-gray-600 mt-20">
              <p>Your cart is empty!</p>
              <button
                onClick={() => navigate("/shop")}
                className="mt-6 px-6 py-3 bg-[#FE5E33] text-white rounded-xl font-semibold"
              >
                Go to Shop
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-6">
                <div className="flex items-center space-x-4">
                  <img src={item.image || '/tin2.avif'} alt={item.label} className="w-12 h-12 md:w-24 md:h-24 rounded-md object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">Nannari: {item?.composition?.nannari}, Lemon: {item?.composition?.lemon}</p>
                    <p className="mt-2 font-semibold text-black">{formatINR(item.pricePerPack)}</p>
                    <button className="text-red-500 text-sm mt-2" onClick={() => dispatch(removeFromCart(item.id))}>Remove item</button>
                  </div>
                </div>

                <div className="flex items-center flex-col gap-3 space-x-4">
                  <div className="text-lg text-right w-full font-semibold">{formatINR(item.totalPrice)}</div>
                  <div className="flex items-center border border-[#aeaeae] rounded-lg">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                      className="px-3 py-1 text-xl cursor-pointer"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                      className="px-3 py-1 text-xl cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right side */}
        {cart && cart.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 h-fit">
            <h3 className="text-2xl font-bold mb-4">Cart Totals</h3>
            <div className="flex justify-between text-gray-700 text-sm mb-2">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm mb-4">
              <span>Flat Rate</span>
              <span>{formatINR(flatRate)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Estimated Total</span>
              <span>{formatINR(estimatedTotal)}</span>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="w-full hover:bg-[#C6DB55] hover:text-black font-semibold bg-gray-800 text-white py-4 rounded-lg cursor-pointer transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#1E1143]">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
