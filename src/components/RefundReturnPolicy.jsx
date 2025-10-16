import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const RefundReturnPolicy = () => {
  return (
    <>
      {/* Header Section */}
      <div className="absolute top-0 z-50 w-full bg-[#FE5E33]">
        <Header />
      </div>
    <div className='bg-[#FFEFEA] pb-5 px-3 md:h-[80dvh]'>
    <div className="max-w-6xl mx-auto  font-sans text-gray-900 pt-30">
      <header className="mb-8">
        <h2 className="text-4xl font-bold leading-none ">
           REFUND & RETURN POLICY
        </h2>
      </header>
      <p className="mb-4 text-[16px] leading-relaxed text-justify">At <strong>SIRIK Beveraage,</strong> customer satisfaction is our priority. We strive to ensure that you receive the highest quality products.</p>
     <ul className="list-disc ml-5 space-y-2">
       <li className="text-[16px] leading-relaxed text-justify">We <strong>do not accept returns </strong>once an order is delivered.</li>
        <li className="text-[16px] leading-relaxed text-justify"><strong>Damaged or defective orders in transit</strong> will be resolved promptly. If your order arrives damaged, please contact us via email at <a href="#" class="text-blue-600 font-semibold hover:underline">team@sirikbeverages.com</a>. Our team will assist you and resolve the issue<strong> within 2-3 working days.</strong></li>
     </ul>
     <p className="mt-4 text-[16px] leading-relaxed text-justify">For any further queries or assistance, reach out to us at  <a href="mailto:team@sirikbeverages.com" class="text-blue-600 font-semibold hover:underline">team@sirikbeverages.com</a>.</p>
    </div>
    </div>

    {/* Footer Section */}
      <div className="w-full bg-gradient-to-br from-[#0F0F1C] to-[#1F1147] ">
        <Footer />
      </div>
    </>
  );
};

export default RefundReturnPolicy;