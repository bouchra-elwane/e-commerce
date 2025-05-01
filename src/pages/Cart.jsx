import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, total } = useCart();
  const [customerName, setCustomerName] = useState('');

  const handleWhatsAppCheckout = () => {
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }

    const message = `New Order from: ${customerName}\n\nOrder Details:\n${
      cart.map(item => `- ${item.title} ($${item.price.toFixed(2)} x ${item.quantity})`).join('\n')
    }\n\nTotal: $${total.toFixed(2)}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-4xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl p-6 space-y-6">
          <div className="bg-gray-100 rounded p-4 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-35 object-contain rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold flex text-gray-700  items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-xl"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <hr />

          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Total: <span>${total.toFixed(2)}</span>
            </h2>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Your Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>

            <button 
              onClick={handleWhatsAppCheckout}
              className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700 flex items-center justify-center space-x-2 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Checkout via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;