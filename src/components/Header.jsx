import { useState } from 'react';
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import companylogo from '../assets/images/companylogo.svg';

const Header = (props) => {
  const navigate = useNavigate();
  const cartCount = 3;
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <header className={`h-[75px] container mx-auto flex items-center justify-between px-4 text-white`}>
        {/* Mobile Menu Icon */}
        <div className='flex-1 flex items-center justify-start md:hidden'>
          <MenuOutlined
            className='text-2xl cursor-pointer'
            onClick={() => setShowMobileMenu(true)}
          />
        </div>

        {/* Logo */}
        <div className='flex-1 flex items-center justify-center md:justify-start'>
          <img
            src={companylogo}
            alt='Company Logo'
            onClick={() => navigate('/')}
            className='w-[150px] md:w-[180px] cursor-pointer'
          />
        </div>
        <div className='flex-1 flex items-center justify-end gap-6'>
          <nav className='hidden md:flex items-center justify-center gap-6 text-lg' style={{ fontFamily: 'quincycf, sans-serif' }}>
            <Link to='/shop' className='hover:text-primary transition'>Shop</Link>
            <Link to='/about' className='hover:text-primary transition'>About</Link>
            <Link to='/contact' className='hover:text-primary transition'>Contact</Link>
            <Link to="/cart" className="relative inline-block">
              <img src="/cart.svg" alt="Cart" className="w-8" />
              {/* {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#BAD42C] text-black text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )} */}
            </Link>
          </nav>
         <Link to="/cart" className="relative md:hidden inline-block">
              <img src="/cart.svg" alt="Cart" className="w-8" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#BAD42C] text-black text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className='fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black/70 z-50'>
          {/* Close Icon */}
          <div
            className='absolute top-4 right-4 text-white text-3xl cursor-pointer'
            onClick={() => setShowMobileMenu(false)}
          >
            ✕
          </div>
          {/* Mobile Links */}
          <nav
            className='gap-4 flex text-center flex-col text-white text-3xl'
            style={{ fontFamily: 'HelveticaNowText-Medium, sans-serif' }}
          >
            <Link to='/' onClick={() => setShowMobileMenu(false)} className='hover:text-primary transition'>Home</Link>
            <Link to='/shop' onClick={() => setShowMobileMenu(false)} className='hover:text-primary transition'>Shop</Link>
            <Link to='/about' onClick={() => setShowMobileMenu(false)} className='hover:text-primary transition'>About</Link>
            <Link to='/contact' onClick={() => setShowMobileMenu(false)} className='hover:text-primary transition'>Contact</Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
