import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/Homepage';
import TaskManager from './components/TaskManager';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import Products from './components/Products';
import Favorites from './pages/favorites';
import Cart from './pages/Cart'; 
import Header from './pages/header';
import { ThemeProvider } from './context/ThemeContext';
function App() {
 
  return (
    <ThemeProvider>
    <FavoritesProvider>
  <CartProvider>
    <Router>
    <Header />
    <Routes>
    <Route path="/" element={<HomePage />} />
      <Route path="/taskmanager" element={<TaskManager />} />
      <Route path="/products" element={<Products />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>
  </CartProvider>
  </FavoritesProvider>
  </ThemeProvider>
  )
}

export default App
