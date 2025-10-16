import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import tinOrange2 from "/tino1.png";
import tinGreen2 from "/ting1.png";

import tin_1 from '../assets/Resize_sirik_Avif/Orange_1.avif'
import tin_2 from '../assets/Resize_sirik_Avif/Orange_2.avif'
import tin_3 from '../assets/Resize_sirik_Avif/Orange_3.avif'

import tin_4 from '../assets/Resize_sirik_Avif/Green_1.avif'
import tin_5 from '../assets/Resize_sirik_Avif/Green_2.avif'
import tin_6 from '../assets/Resize_sirik_Avif/Green_3.avif'

import AlertModal from '../components/AlertModal'

const PACKS = [
  { id: "pack4", label: "Pack of 4", tins: 4, price: 399 },
  { id: "pack6", label: "Pack of 6", tins: 6, price: 599 },
  { id: "pack12", label: "Pack of 12", tins: 12, price: 1199 },
];

const rupee = (n) =>
  n.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

const splitFlavours = (tins) => {
  const first = Math.floor(tins / 2);
  const second = tins - first;
  return { nannari: first, lemon: second };
};

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


const Shop = () => {
  const dispatch = useDispatch();
  const [selectedPackId, setSelectedPackId] = useState("pack6");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("nannari"); // 🟠 or 🟢
  const [mainImage, setMainImage] = useState(tinOrange2);

  const selectedPack = PACKS.find((p) => p.id === selectedPackId) || PACKS[0];
  const totalPrice = selectedPack.price * quantity;
  const perTinPrice = selectedPack.price / selectedPack.tins;
  const composition = splitFlavours(selectedPack.tins);

  // 🟠 Product details
  const products = {
    nannari: {
      name: "Gutzy Nannari",
      desc: "Nannari, or Indian Sarsaparilla, is an ancient root known for its cooling and digestive powers.",
      color: "#FE5E33",
      bg: "#FFEFEA",
      images: [tinOrange2,tin_1, tin_2, tin_3],
    },
    lemon: {
      name: "Gutzy Nannari × Lemon",
      desc: "A zesty fusion of Nannari root and Lemon that refreshes and energizes your day.",
      color: "#BAD42C",
      bg: "#F9FFD7",
      images: [tinGreen2,tin_4, tin_5, tin_6],
    },
  };

  const current = products[selectedProduct];

  const onDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const onIncrease = () => setQuantity((q) => q + 1);
  const onSelectPack = (id) => {
    setSelectedPackId(id);
    setQuantity(1);
  };

 const onAddToCart = () => {
    const cartItem = {
      id: selectedPack.id,
      label: selectedPack.label,
      tinsPerPack: selectedPack.tins,
      pricePerPack: selectedPack.price,
      perTinPrice: Number(perTinPrice.toFixed(2)),
      quantity,
      totalPrice: Number(totalPrice.toFixed(2)),
      composition,
      product: selectedProduct,
      addedAt: new Date().toISOString(),
    };

    dispatch(addToCart(cartItem)); // ✅ Redux dispatch

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);


    try {
      let currentCart = [];
      if (typeof window !== "undefined" && window.sessionStorage) {
        const raw = window.sessionStorage.getItem("cart");
        if (raw) {
          currentCart = JSON.parse(raw) || [];
          if (!Array.isArray(currentCart)) currentCart = [];
        }
        currentCart.push(cartItem);
        window.sessionStorage.setItem("cart", JSON.stringify(currentCart));
      }
    } catch (e) {
      console.warn("Failed to store cart:", e);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleProductChange = (type) => {
    setSelectedProduct(type);
    setMainImage(products[type].images[0]);
  };

  const [showcartalert,setcartalert] = useState(false)
  const onClose = ()=>{
    setcartalert(false)
  }
  const show = ()=>{
    setcartalert(true)
  }

  return (
    <>

    {
      showcartalert && <AlertModal onClose={onClose}/>
    }

    <div className="flex flex-col min-h-screen">
      {/* Header color updates dynamically */}
      <div style={{ backgroundColor: current.color }}>
        <Header darkcolor={true} show={show} />
      </div>

      <div style={{ backgroundColor: current.bg }} className="flex-1">
        <div className="flex flex-col md:flex-row w-full container mx-auto text-center gap-4 md:px-4 py-12">
          
          {/* Left: Images - MODIFIED FOR ROUNDED RED BACKGROUND */}
          <div className="flex-1 px-3 flex flex-col items-center">
             {/* Product Image Container with Rounded Corners and Background */}
            <div 
              className="w-full max-w-xl mx-auto rounded-3xl p-10 flex items-center justify-center"
            >
              <img
                src={mainImage}
                alt={current.name}
                className="w-full h-full max-w-lg mx-auto" 
              />
            </div>

            {/* Thumbnails */}
            <div className=" flex items-center justify-center flex-wrap">
              {current.images.map((img, idx) => (
                // Thumbnails now use a container with the same rounded style
                <div
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`cursor-pointer rounded-xl transition-all duration-300  ${
                    mainImage === img 
                  }`}
                  style={{ 
                    maxWidth: '80px', 
                    padding: '8px',
                  }}
                >
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product details */}
          <div className="flex-1">
            <div className="flex-1 flex flex-col w-full gap-3 text-l text-left px-4 h-full">
              <h1
                className="text-[40px] lg:text-[50px]"
                style={{
                  fontFamily: "OntrobucjDemo, sans-serif",
                  color: current.color,
                }}
              >
                {current.name}
              </h1>

              <p className="text-[#6E6C6C] md:text-lg mb-5">{current.desc}</p>

              <div>
                <h1 className="font-semibold mb-2">
                  Pack : <span className="font-normal">{selectedPack.label}</span>
                </h1>

                {/* Pack selection */}
                <div className="flex flex-col">
                  {/* Mobile dropdown */}
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

                  {/* Desktop buttons */}
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

                {/* Quantity + Price */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-6 gap-4">
                  <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 max-w-[220px]">
                    <button
                      onClick={onDecrease}
                      className="text-xl w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
                    >
                      −
                    </button>
                    <div className="text-lg font-semibold min-w-[40px] text-center">
                      {quantity}
                    </div>
                    <button
                      onClick={onIncrease}
                      className="text-xl w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-3xl font-bold">{rupee(totalPrice)}</div>
                </div>

                {/* Add to cart */}
                <div className="mt-8 relative">
                  <button
                    onClick={onAddToCart}
                    style={{ fontFamily: "quincycf, sans-serif",
    backgroundColor: current.color, }}
                    className="w-full  cursor-pointer mx-auto block text-white py-5 rounded-2xl text-lg font-semibold"

                  >
                    ADD TO CART
                  </button>
                  {added && (
                    <div className="absolute right-4 -top-2 transform -translate-y-full bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                      Added!
                    </div>
                  )}
                </div>

                {/* 🟢 Product toggle (below Add to Cart) */}
                <div className="flex justify-left items-center gap-4 mt-10">
                  <img
                    src={tinOrange2}
                    alt="Gutzy Nannari"
                    onClick={() => handleProductChange("nannari")}
                    className={`w-16 h-16 rounded-full cursor-pointer transition-transform duration-200 ${
                      selectedProduct === "nannari"
                        ? "ring-4 ring-[#FE5E33] scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  />
                  <img
                    src={tinGreen2}
                    alt="Gutzy Nannari × Lemon"
                    onClick={() => handleProductChange("lemon")}
                    className={`w-16 h-16 rounded-full cursor-pointer transition-transform duration-200 ${
                      selectedProduct === "lemon"
                        ? "ring-4 ring-[#2E8B57] scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  />
                </div>

                {/* Price breakdown */}
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <strong>Price breakdown:</strong> Each tin {rupee(perTinPrice)}. <br />
                    You will get <strong>{selectedPack.label}</strong> —{" "}
                    {composition.nannari} Gutzy Nannari + {composition.lemon} Gutzy Nannari × Lemon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moving line */}
<div className="bg-white py-8 overflow-hidden">
    <div className="w-full flex justify-center">
      <motion.div
        className="flex"                   // ensure no inline whitespace behavior
        style={{ willChange: "transform" }}
        // Move exactly one copy width to the left (0 -> -50%) so the second copy replaces the first
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {/* render copies directly with NO whitespace between them */}
        {line}{line}
      </motion.div>
    </div>
  </div>


      <div className="bg-[#1E1143]">
        <Footer />
      </div>
    </div>
    </>
  );
};

export default Shop;