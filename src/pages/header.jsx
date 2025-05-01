import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineCheckSquare,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BsBox } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';



const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/',
      icon: <AiOutlineHome size={20} /> 
    },
    { 
      name: 'Tasks', 
      path: '/taskmanager',
      icon: <AiOutlineCheckSquare size={20} /> 
    },
    { 
      name: 'Products', 
      path: '/products',
      icon: <BsBox size={20} /> 
    },
    { 
      name: 'Favorites', 
      path: '/favorites',
      icon: <FiHeart size={20} /> 
    },
    { 
      name: 'Cart', 
      path: '/cart',
      icon: <AiOutlineShoppingCart size={20} /> 
    },
  ];

  // Determine active tab based on current route
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.name : 'Dashboard';
  };

  return (
    <div className="bg-white shadow-md px-35 md: py-6 flex">
      <div className="flex space-x-10">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={`flex items-center space-x-2 cursor-pointer pb-2 border-b-2 ${
              getActiveTab() === item.name
                ? 'border-blue-500 text-black font-medium'
                : 'border-transparent text-gray-500 hover:text-black'
            } transition-colors duration-200`}
          >
            {item.icon}
            <span className='text-base font-medium'>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;