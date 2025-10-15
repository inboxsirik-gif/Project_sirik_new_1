import React from 'react';

import Header from "../components/Header";
import Footer from "../components/Footer";

const Termsandcondition = () => {
  return (
      <>
      {/* Header Section */}
      <div className="absolute top-0 z-50 w-full bg-[#FE5E33]">
        <Header />
      </div>

    <div className='bg-[#FFEFEA]'>

   
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 font-sans text-gray-900 mt-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold leading-none">
          SIRIK
        </h1>
        <h2 className="text-3xl font-bold leading-none mb-4">
          - TERMS AND CONDITIONS
        </h2>
      </header>
      <section className="mb-10 text-base leading-relaxed text-justify">
        <p><strong>Last updated: 14th October 2025</strong></p><br />
        <p className="mb-4 text-base leading-relaxed text-justify">For the purpose of these Terms and Conditions, the terms <strong>“we,” “us,” or “our” </strong>refer to <strong>SIRIK Beveraage Pvt. Ltd.,</strong> whose registered/operational office is OM Chambers 648/A 4th Floor, Binnamangala 1st stage, Indiranagar, Bengaluru, Karnataka – India. The terms<strong> “you,” “your,” “user,” or “visitor” </strong>refer to any natural or legal person visiting our website and/or purchasing from us.
         Your use of the website and/or purchase from us is governed by the following Terms and Conditions:</p>
          
      </section>
        <h3 className="text-xl font-bold mb-4">1. CHANGES TO WEBSITES CONTENT</h3>
        <p className="mb-4 text-base leading-relaxed text-justify">The content of the pages on this website is subject to change without notice. We do not guarantee the accuracy, completeness, timeliness, or suitability of the information and materials on the website. You acknowledge that such information may contain inaccuracies or errors, and we expressly exclude liability for these to the fullest extent permitted by law.</p>
        <h3 className="text-xl font-bold mb-4">2. USE OF INFORMSTION AND MATERIALS</h3>
        <p className="mb-4 text-base leading-relaxed text-justify">Your use of any information or materials on our website and/or product pages is<strong> entirely at your own risk.</strong> It is your responsibility to ensure that the products, services, or information available through our website meet your specific requirements.</p>
        <h3 className="text-xl font-bold mb-4">3. INTELLECTUAL PROPERTY</h3>
        <p className="mb-4 text-base leading-relaxed text-justify">All material on this website, including but not limited to design, layout, appearance, graphics, and content, is<strong> owned by or licensed to SIRIK Beveraage Pvt. Ltd.</strong> Reproduction is prohibited except as expressly allowed by our copyright notice.<br />
         All trademarks on this website that are not the property of or licensed to SIRIK Beveraage Pvt. Ltd. are acknowledged on the website. Unauthorized use of information provided may result in claims for damages and/or criminal liability</p>
         <h3 className="text-xl font-bold mb-4">4. EXTERNAL LINKS</h3>
         <p className="mb-4 text-base leading-relaxed text-justify">From time to time, our website may include links to other websites for your convenience. We are<strong> not responsible </strong>for the content or accuracy of these external websites.<br />
         You may not create a link to our website from another website or document without <strong>prior written consent</strong> from SIRIK Beveraage Pvt. Ltd.</p>
         <h3 className="text-xl font-bold mb-4">5. GOVERNING LAW</h3>
        <p className="mb-4 text-base leading-relaxed text-justify">Any dispute arising from the use of our website, purchases from us, or any engagement with us is subject to the <strong>laws of India.</strong> </p>
        <h3 className="text-xl font-bold mb-4">6. TRANSACTIONS AND PAYMENTS</h3>
        <p className="mb-4 text-base leading-relaxed text-justify">We are <strong>not liable</strong> for any loss or damage arising from declined payment authorizations, including cases where a cardholder exceeds preset limits agreed with their bank.</p>
        <h3 className="text-xl font-bold mb-4">7. LIMITATION OF LIABILITY</h3>
        <p className="mb-4 text-base leading-relaxed text-justify">SIRIK Beveraage Pvt. Ltd. shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of the website or purchase of products.</p>
    </div>

      {/* Footer Section */}
      <div className="w-full bg-gradient-to-br from-[#0F0F1C] to-[#1F1147] ">
        <Footer />
      </div>
       </div>
    </>
  );
};

export default Termsandcondition;