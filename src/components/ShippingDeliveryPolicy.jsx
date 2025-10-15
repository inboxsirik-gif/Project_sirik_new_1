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

    <div className='bg-[#FFEFEA]'>
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 font-sans text-gray-900 mt-20">
      <header className="mb-8">
        <h2 className="text-3xl font-bold leading-none mb-4">
          SHIPPING & DELIVERY POLICY
        </h2>
      </header>
      <section className="mb-10 text-base leading-relaxed text-justify">
        <p><strong>Last updated: 14th October 2025</strong></p><br />
        <p className="mb-4 text-base leading-relaxed text-justify">For domestic buyers, orders are shipped through <strong>registered domestic courier companies and/or speed post.</strong></p>
      </section>
        <ul className="list-disc ml-5 space-y-2">
          <li className="text-base leading-relaxed text-justify">Orders are typically delivered<strong> within 7 days,</strong> or as per the delivery date agreed at the time of order confirmation, <strong>subject to courier service norms.</strong></li>
          <li className="text-base leading-relaxed text-justify">Delivery will be made only to the <strong>address provided by you</strong> at the time of purchase.</li>
          <li className="text-base leading-relaxed text-justify">Delivery details, including tracking information, will be sent to your <strong>email ID and mobile number</strong> provided during checkout.</li>
        </ul>
       <p className="mb-4 text-base leading-relaxed text-justify">For any issues or assistance regarding shipping or delivery, please contact us at <a href="#" class="text-blue-600 font-semibold hover:underline"> team@sirikbeverages.com</a>.</p>
    </div>
      {/* Footer Section */}
      <div className="w-full bg-gradient-to-br from-[#0F0F1C] to-[#1F1147] ">
        <Footer />
      </div>
      </div>
    </>
  );
};

export default ShippingDeliveryPolicy;