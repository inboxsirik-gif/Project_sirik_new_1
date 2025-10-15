import React from 'react';
import { useNavigate } from 'react-router-dom';
import Social_icon_1 from '../assets/images/Social_icon_1.svg';
import Social_icon_2 from '../assets/images/Social_icon_2.svg';
import Social_icon_3 from '../assets/images/Social_icon_3.svg';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto text-[#ffffff] pt-10 px-5 md:px-10 2xl:px-40 font-sans">
      {/* Top Section */}
      <div className="flex flex-wrap justify-between gap-10">

        {/* Brand + Social Icons */}
        <div className="flex flex-col items-center md:items-start min-w-[250px] flex-1">
          <h1 className="text-8xl mb-4 font-bold text-[#ffffff]">Sirik.</h1>
          <div className="flex gap-4 mt-2">
            <img src={Social_icon_1} alt="Facebook" className="w-5 h-5 cursor-pointer" />
            <img src={Social_icon_2} alt="Instagram" className="w-5 h-5 cursor-pointer" />
            <img src={Social_icon_3} alt="LinkedIn" className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col min-w-[200px] flex-1">
          <h3 className="font-semibold mb-3 text-[20px] text-[#fff]">Useful Links</h3>
          <ul className="text-sm space-y-2 text-[#ffffff]/80">
            <li className="cursor-pointer" onClick={() => navigate('/')}>Home</li>
            <li className="cursor-pointer" onClick={() => navigate('/shop')}>Shop</li>
            <li className="cursor-pointer" onClick={() => navigate('/about')}>About Us</li>
            <li className="cursor-pointer" onClick={() => navigate('/contact')}>Contact Us</li>
          </ul>
        </div>

        {/* Helps */}
        <div className="flex flex-col min-w-[200px] flex-1">
          <h3 className="font-semibold mb-3 text-[20px] text-[#fff]">Helps</h3>
          <ul className="text-sm space-y-2 text-[#ffffff]/80">
            <li className="cursor-pointer">Shipping & Delivery Policy</li>
            <li className="cursor-pointer">Refund & Return Policy</li>
            <li className="cursor-pointer">Privacy Policy</li>
            <li className="cursor-pointer">Terms and Conditions</li>
          </ul>
        </div>

        {/* Secure Payments */}
        <div className="flex flex-col min-w-[250px] flex-1">
          <h3 className="font-semibold mb-3 text-[20px] text-[#fff]">Secure Payments</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            <img src="/Social_media/Pay_1.svg" alt="Pay 1" className="w-8 h-8 cursor-pointer" />
            <img src="/Social_media/Pay_2.svg" alt="Pay 2" className="w-8 h-8 cursor-pointer" />
            <img src="/Social_media/Pay_3.svg" alt="Pay 3" className="w-8 h-8 cursor-pointer" />
            <img src="/Social_media/Pay_4.svg" alt="Pay 4" className="w-8 h-8 cursor-pointer" />
            <img src="/Social_media/Pay_5.svg" alt="Pay 5" className="w-8 h-8 cursor-pointer" />
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-200 opacity-40" />

      {/* Bottom Section */}
      <div className="text-center">
        <p className="text-[14px] text-[#ffffff]">
          Copyright 2025 Sirik. All Rights Reserved.
        </p>
        <p className="text-[14px] pb-10 text-[#ffffff]/80">
          Built with ❤️ by Pregasus Nexus
        </p>
      </div>
    </div>
  );
};

export default Footer;
