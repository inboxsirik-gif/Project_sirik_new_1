import React, { useState } from "react";
import Header from "../components/Header";

import Footer from "../components/Footer";

const Cart = () => {
  const [cart, setCart] = useState([
    {
      id: "pack12",
      label: "Pack of 12",
      tinsPerPack: 12,
      pricePerPack: 1199,
      perTinPrice: 99.92,
      quantity: 3,
      totalPrice: 3597,
      composition: { nannari: 6, lemon: 6 },
      addedAt: "2025-10-14T09:07:38.282Z",
    },
  ]);

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
              totalPrice: (item.quantity + delta) * item.pricePerPack,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const flatRate = 1;
  const estimatedTotal = subtotal + flatRate;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FE5E33]">
        <Header darkcolor={true} />
      </div>

      {/* Cart Body */}
      <div className="container h-[100dvh] mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        {/* Left side - Products */}
        <div className="md:col-span-2 pl-7">
          <h2 className="text-4xl font-bold mb-6 ">Cart</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 py-6"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src="/Sirik_tin_1.svg"
                  alt={item.label}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Nannari: {item.composition.nannari}, Lemon:{" "}
                    {item.composition.lemon}
                  </p>
                  <p className="mt-2 font-semibold text-black">
                    {formatINR(item.pricePerPack)}
                  </p>

                  <button
                    className="text-red-500 text-sm mt-2"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove item
                  </button>
                </div>
              </div>

              {/* Quantity & Total */}
              <div className="flex items-center flex-col gap-3 space-x-4">
                 <div className="text-lg text-right w-full font-semibold">
                  {formatINR(item.totalPrice)}
                </div>
                <div className="flex items-center border border-[#aeaeae] rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 text-xl cursor-pointer"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 text-xl cursor-pointer"
                  >
                    +
                  </button>
                </div>
               
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Totals */}
        <div className="bg-gray-50 rounded-xl p-6 h-fit">
          <h3 className="text-2xl font-bold mb-4">Cart Totals</h3>
{/* 
          <select className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4 text-gray-700">
            <option>Add coupons</option>

          </select> */}

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

          <button className="w-full hover:bg-[#C6DB55] hover:text-black font-semibold bg-gray-800 text-white py-4 rounded-lg cursor-pointer transition">
            Proceed to Checkout
          </button>
        </div>
      </div>

     <div className="bg-[#1E1143]">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
