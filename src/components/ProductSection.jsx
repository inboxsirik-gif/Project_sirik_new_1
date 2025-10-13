import { useState } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const ProductSection = () => {
  const [selectedPack, setSelectedPack] = useState('6');

  return (
    <div className="bg-[#FFDDD4] p-6 font-sans text-black">
      <div className="w-full max-w-[1200px] py-5 mx-auto">

        <Collapse
          defaultActiveKey={['1']}
          bordered={false}
          expandIconPosition="end"
          className="mb-4 bg-white rounded-md"
        >
          <Panel className='text-lg md:text-2xl font-semibold' header="Nutrition Value per 250ml" key="1">
            <p className="text-[16px] font-normal">
              Total Carbohydrate - 14.5g, Dietary Fiber - 7g, Protein - 1.25g, Added Sugar - Nil, Total Sugar - 4g,
              Energy (kcal) - 82.5 kcal, Sodium - 36.75mg, Vitamin C - 182.50mg.
            </p>
          </Panel>

          <Panel header="Ingredients List" key="2" className='text-lg md:text-2xl font-semibold'>
            <p className="text-[16px] font-normal">
              Carbonated Water, Natural Flavors, Citric Acid, Ascorbic Acid (Vitamin C), Stevia Leaf Extract.
            </p>
          </Panel>
        </Collapse>

        {/* Pack selection */}
      <div className="flex space-x-4 justify-center py-10">
  <button
    onClick={() => setSelectedPack('6')}
    style={{ fontFamily: 'HelveticaNowText-Medium, sans-serif' }}
    className={`px-10 py-2 border rounded-md transition duration-200 cursor-pointer ${
      selectedPack === '6' ? 'bg-black text-white' : 'bg-white text-black'
    }`}
  >
    Pack of 6
  </button>
  <button
  style={{ fontFamily: 'HelveticaNowText-Medium, sans-serif' }}
    onClick={() => setSelectedPack('12')}
    className={`px-10 py-2 border rounded-md transition duration-200 cursor-pointer ${
      selectedPack === '12' ? 'bg-black text-white' : 'bg-white text-black'
    }`}
  >
    Pack of 12
  </button>
</div>


        {/* Price */}
        <div className="text-center text-2xl font-semibold mb-6">₹450.00</div>

        {/* Add to cart button */}
        <div className="text-center mb-4">
          <button className="bg-black text-white px-8 py-2 rounded text-sm hover:bg-gray-900 transition duration-200">
  ADD TO CART
</button>

        </div>

        {/* View details link */}
        <div className="text-center">
          <a href="#" className="text-purple-800 underline text-sm">
            VIEW DETAILS
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
