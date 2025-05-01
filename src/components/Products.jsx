import { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { fetchProducts, fetchCategories } from '../api/fakeStoreApi';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext'; // Add this import

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get favorites functionality
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  // Add cart functionality
  const { addToCart } = useCart();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleFavoriteClick = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Add this function for cart click
  const handleCartClick = (product) => {
    addToCart(product);
  };

  if (loading) return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-2">Loading products...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-8 text-red-500">
      <p>Error loading products: {error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-20 py-8"> 
      {/* Category Filter Only */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-bold mb-4 md:mb-0"> Products</h1>
        <select
          className="w-full md:w-64 p-2 rounded-lg bg-gray-100 focus:outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 px-4">
          <p className="text-xl text-gray-500">No products found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group transition-all shadow-md hover:shadow-lg rounded-lg overflow-hidden" 
            >
              <div className="bg-white p-6 flex justify-center"> 
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="h-90 object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6"> 
                <h2 className=" font-bold text-xl mb-2 text-gray-800">{product.title}</h2>
                
                <p className="text-gray-600 text-m mb-4 line-clamp-2"> 
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center px-2">
                  <span className="text-black text-lg font-bold">${product.price}</span>
                  <div className="flex gap-4">
                    <FaHeart 
                      className={`cursor-pointer text-3xl ${
                        isFavorite(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                      onClick={() => handleFavoriteClick(product)}
                    /> 
                    <FaShoppingCart 
                      className="text-gray-400 hover:text-blue-500 cursor-pointer text-3xl"
                      onClick={() => handleCartClick(product)} // Add this onClick
                    /> 
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;