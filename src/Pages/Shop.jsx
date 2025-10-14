import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import sirik_image from "/Sirik_tin_1.svg";

import { motion } from "framer-motion";

const PACKS = [
  { id: "pack4", label: "Pack of 4", tins: 4, price: 399 },
  { id: "pack6", label: "Pack of 6", tins: 6, price: 599 },
  { id: "pack12", label: "Pack of 12", tins: 12, price: 1199 },
];

const rupee = (n) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

// split tins into two flavours equally (if odd, second flavour gets the extra)
const splitFlavours = (tins) => {
  const first = Math.floor(tins / 2);
  const second = tins - first;
  return { nannari: first, lemon: second };
};

const Shop = () => {
  const [selectedPackId, setSelectedPackId] = useState("pack6"); // default Pack of 6
  const [quantity, setQuantity] = useState(1); // number of packs
  const [added, setAdded] = useState(false); // UI confirmation

  const selectedPack = PACKS.find((p) => p.id === selectedPackId) || PACKS[0];
  const totalPrice = selectedPack.price * quantity;
  const perTinPrice = selectedPack.price / selectedPack.tins;
  const composition = splitFlavours(selectedPack.tins);

  const items = [
    "• Great Inside — Great Outside",
    "• Tradition Meets Modernity",
    "• The Prebiotic Revolution",
    "• 11:11 — Make It Happen",
  ];

  // build one visual line (the thing we will duplicate)
  const line = (
    <div className="inline-flex items-center whitespace-nowrap">
      {items.map((t, i) => (
        <span key={i} className="mx-8 text-4xl">
          {t}
        </span>
      ))}
    </div>
  );

  const onDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const onIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const onSelectPack = (id) => {
    setSelectedPackId(id);
    setQuantity(1); // reset quantity to 1 when changing pack
  };

  // helper: persist cart in sessionStorage and call session.set if available
  const saveCartToSession = (cart) => {
    try {
      // browser session storage (available in most places)
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (e) {
      console.warn("Could not write to sessionStorage:", e);
    }

    // If your environment exposes a `session` object with `set`, use it (some frameworks do)
    try {
      // eslint-disable-next-line no-undef
      if (typeof session !== "undefined" && typeof session.set === "function") {
        // call session.set('cart', cart) if available
        session.set("cart", cart);
      }
    } catch (e) {
      // not fatal — many setups won't have `session` global
      // console.info("No session.set available or call failed:", e);
    }
  };

  const onAddToCart = () => {
    const cartItem = {
      id: selectedPack.id,
      label: selectedPack.label,
      tinsPerPack: selectedPack.tins,
      pricePerPack: selectedPack.price,
      perTinPrice: Number(perTinPrice.toFixed(2)),
      quantity: quantity,
      totalPrice: Number(totalPrice.toFixed(2)),
      composition,
      addedAt: new Date().toISOString(),
    };

    // If you want to support multiple items in the cart, read current cart
    // from sessionStorage and append; otherwise overwrite (this implementation appends).
    try {
      let currentCart = [];
      if (typeof window !== "undefined" && window.sessionStorage) {
        const raw = window.sessionStorage.getItem("cart");
        if (raw) {
          try {
            currentCart = JSON.parse(raw) || [];
            if (!Array.isArray(currentCart)) currentCart = [];
          } catch (e) {
            currentCart = [];
          }
        }
        // Append new item
        currentCart.push(cartItem);
        window.sessionStorage.setItem("cart", JSON.stringify(currentCart));
      }
    } catch (e) {
      console.warn("Failed to append to sessionStorage cart:", e);
    }

    // Also call save helper that tries session.set if available
    saveCartToSession(cartItem); // note: this will store single object in session.set if that API exists

    console.log("Add to cart:", cartItem);

    // UI feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#FE5E33]">
        <Header darkcolor={true} />
      </div>

      <div className="bg-[#FFEFEA] flex-1">
        <div className="flex flex-col md:flex-row w-full md:h-[70dvh] container mx-auto text-center gap-4 md:px-4 py-12">
          <div className="flex-1 px-3">
            <img src={sirik_image} alt="Sirik Tin" className="w-full h-auto max-w-xl mx-auto" />
            <div className="mt-2 flex items-center justify-center flex-wrap gap-2 ">
              <img src={sirik_image} alt="Sirik Tin" className="w-full h-auto max-w-[60px] md:max-w-[80px]" />
              <img src={sirik_image} alt="Sirik Tin" className="w-full h-auto max-w-[60px] md:max-w-[80px] opacity-40" />
              <img src={sirik_image} alt="Sirik Tin" className="w-full h-auto max-w-[60px] md:max-w-[80px] opacity-40" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex-1 flex flex-col w-full gap-3 text-l text-left px-4 h-full">
              <h1
                className="text-[40px] lg:text-[50px] text-[#F46C3C] text-left-entry"
                style={{ fontFamily: "OntrobucjDemo, sans-serif" }}
              >
                Gutzy Nannari
              </h1>
              <p className="text-[#6E6C6C] md:text-lg mb-5">
                Nannari, or Indian Sarsaparilla, is an ancient root known for its cooling and digestive powers.
              </p>

              <div>
                <h1 className="font-semibold mb-2">
                  Pack : <span className="font-normal">{selectedPack.label}</span>
                </h1>

               <div className="flex flex-col">
{/* Mobile view — dropdown */}
<div className="relative md:hidden mt-2">
  <select
    value={selectedPackId}
    onChange={(e) => onSelectPack(e.target.value)}
    className="w-full appearance-none border border-gray-300 rounded-lg py-3 px-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
  >
    {PACKS.map((p) => (
      <option key={p.id} value={p.id}>
        {p.label}
      </option>
    ))}
  </select>

  {/* Custom SVG arrow */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </div>
</div>


  {/* Desktop view — buttons */}
  <div className="hidden md:flex flex-row items-center gap-2 mt-2">
    {PACKS.map((p) => {
      const active = p.id === selectedPackId;
      return (
        <button
          key={p.id}
          onClick={() => onSelectPack(p.id)}
          className={`rounded-2xl w-full cursor-pointer max-w-[140px] py-3 px-4 transition-transform duration-150 ${
            active
              ? "bg-black text-white"
              : "bg-white text-black hover:scale-105 hover:bg-black hover:text-white"
          }`}
        >
          {p.label}
        </button>
      );
    })}
  </div>
</div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-6 gap-4">
                 
                  <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 max-w-[220px]">
                    <button
                      onClick={onDecrease}
                      className="text-xl w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <div className="text-lg font-semibold min-w-[40px] text-center">{quantity}</div>

                    <button
                      onClick={onIncrease}
                      className="text-xl w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-3xl font-bold">{rupee(totalPrice)}</div>
                </div>

                <div className="mt-8 relative">
                  <button
                    onClick={onAddToCart}
                    style={{ fontFamily: "quincycf, sans-serif" }}
                    className="w-full max-w-xl cursor-pointer mx-auto block bg-[#F46C3C] hover:brightness-95 text-white py-5 rounded-2xl text-lg font-semibold"
                  >
                    ADD TO CART
                  </button>

                  {/* small transient added confirmation */}
                  {added && (
                    <div className="absolute right-4 -top-2 transform -translate-y-full bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                      Added!
                    </div>
                  )}
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <strong>Price breakdown:</strong> Each tin {rupee(perTinPrice)}. <br />
                    You will get <strong>{selectedPack.label}</strong> — {composition.nannari} Gutzy Nannari + {composition.lemon} Gutzy Nannari × Lemon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="bg-[#ffffff] py-8 overflow-hidden">
      <div className="w-full flex justify-center">
        <motion.div
          className="inline-flex"
          style={{ willChange: "transform" }}
          animate={{ x: ["-50%", "50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          <div style={{ fontFamily: "quincycf, sans-serif" }} className="flex">{line}</div>
          <div style={{ fontFamily: "quincycf, sans-serif" }} className="flex">{line}</div>
        </motion.div>
      </div>
    </div>

      <div className="bg-[#1E1143]">
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
