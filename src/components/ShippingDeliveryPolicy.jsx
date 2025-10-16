import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const ShippingDeliveryPolicy = () => {
  return (
      <>
      {/* Header Section */}
      <div className="absolute top-0 z-50 w-full bg-[#FE5E33]">
        <Header />
      </div>

    <div className='bg-[#FFEFEA] pb-5 px-3 md:h-[80dvh]'>
    <div className="max-w-6xl mx-auto  font-sans text-gray-900 pt-30">
      <header className="mb-4 md:mb-8">
        <h2 className="text-4xl font-bold leading-none ">
          SHIPPING & DELIVERY POLICY
        </h2>
      </header>
      <section className="mb-6 text-lg md:text-xl leading-relaxed text-justify">
        <p><strong>Last updated: 14th October 2025</strong></p><br />
        <p className="mb-4 text-[16px] leading-relaxed text-justify">For domestic buyers, orders are shipped through <strong>registered domestic courier companies and/or speed post.</strong></p>
      </section>
        <ul className="list-disc text-[16px] md:text-lg ml-5 space-y-2 mb-10">
          <li className=" leading-relaxed text-justify">Orders are typically delivered<strong> within 7 days,</strong> or as per the delivery date agreed at the time of order confirmation, <strong>subject to courier service norms.</strong></li>
          <li className="leading-relaxed text-justify">Delivery will be made only to the <strong>address provided by you</strong> at the time of purchase.</li>
          <li className="leading-relaxed text-justify">Delivery details, including tracking information, will be sent to your <strong>email ID and mobile number</strong> provided during checkout.</li>
        </ul>
       <p className="mb-4  text-[16px] leading-relaxed text-justify">For any issues or assistance regarding shipping or delivery, please contact us at <a href="mailto:team@sirikbeverages.com" class="text-blue-600 font-semibold hover:underline"> team@sirikbeverages.com</a>.</p>
    </div>
      </div>
      <div className="w-full bg-gradient-to-br from-[#0F0F1C] to-[#1F1147] ">
        <Footer />
      </div>
    </>
  );
};

export default ShippingDeliveryPolicy;