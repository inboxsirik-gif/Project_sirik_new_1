import Header from '../components/Header';
import Footer from '../components/Footer';

const Shop = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#FE5E33]">
        <Header darkcolor={true} />
      </div>

      <main className="flex-grow min-h-screen flex flex-col items-center justify-center text-center px-4 py-12">
        <h1
          className="text-[#FE5E33] font-bold leading-none"
          style={{
            fontFamily: 'OntrobucjDemo, sans-serif',
          }}
        >
          <span className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[250px] xl:text-[300px] 2xl:text-[350px]">
            Sirik
          </span>
        </h1>

        <p className="mt-6 text-[#333] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Coming Soon...
        </p>
      </main>

      <div className="bg-[#7E27FF]">
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
