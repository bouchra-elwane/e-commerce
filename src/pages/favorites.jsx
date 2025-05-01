import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext' // Add this import
import { FiHeart } from 'react-icons/fi'
import { FaShoppingCart } from 'react-icons/fa'

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart() 

  const handleCartClick = (product) => {
    addToCart(product)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6"> Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <FiHeart className="mx-auto text-4xl text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-4">
            Click the heart icon on products to add them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {favorites.map((product) => (
            <div 
              key={product.id} 
              className="group transition-all shadow-md hover:shadow-lg rounded-lg overflow-hidden" 
            >
              <div className="bg-white p-6 flex justify-center"> 
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="h-95 object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6"> 
                <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">{product.title}</h2>
                <p className="text-gray-600 text-m mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center px-2 mb-2">
                  <span className="text-black text-xl font-bold">${product.price}</span>
                </div>
                <div className="flex justify-end items-center gap-4 px-2">
                  <FiHeart
                    onClick={() => removeFromFavorites(product.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer text-3xl"
                    aria-label="Remove from favorites"
                  />
                  <FaShoppingCart 
                    className="text-gray-400 hover:text-blue-500 cursor-pointer text-3xl"
                    onClick={() => handleCartClick(product)} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites