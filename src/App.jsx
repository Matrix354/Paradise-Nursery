// src/App.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from './features/cart/cartSlice';
import './App.css';

const LandingPage = ({ goToProducts }) => (
  <div className="landing-page">
    <header className="header">
      <div className="welcome-container">
        <h1>Welcome to <span>Paradise Nursery</span></h1>
        <p>Discover a variety of beautiful indoor plants for your space.</p>
        <button className="primary-button" onClick={goToProducts}>Shop Now</button>
      </div>
    </header>
    <header>
      <div className="about-container">
        <h2>About Us</h2>
        <p>We are a family-owned business dedicated to providing high-quality indoor plants for your home and office. Our passion is helping people create beautiful, green spaces.</p>
      </div>
    </header>
  </div>
);

const ProductListPage = ({ products, addToCart, goToCart }) => (
  <div className="product-list-page">
    <header className="header">
      <h1>Explore Our <span>Collection</span></h1>
      <p>Find the perfect plant for your home or office.</p>
    </header>
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <button 
            className="add-to-cart"
            onClick={() => addToCart(product)}
            disabled={product.added}
          >
            {product.added ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
    <footer className="footer">
      <button className="secondary-button" onClick={goToCart}>View Cart</button>
    </footer>
  </div>
);

const CartPage = ({ cartItems, updateQuantity, removeFromCart, goToProducts }) => {
  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="cart-page">
      <header className="header">
        <h1>Your <span>Cart</span></h1>
      </header>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Start shopping now!</p>
      ) : (
        <div className="cart-container">
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-details">
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  />
                  <button onClick={() => removeFromCart(item.id)} className="remove-from-cart">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="cart-total">Total: ${total.toFixed(2)}</h2>
        </div>
      )}
      <footer className="footer">
        <button className="secondary-button" onClick={goToProducts}>Back to Products</button>
      </footer>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState('landing');
  const [products, setProducts] = useState([
    { id: 1, name: 'Fiddle Leaf Fig', price: 45.99, image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ6w6g6jfEr4qUc8zNB5T5e7DFfLHds9yuJHWv6xMmb9EdF7maX_Z_rG5e9NKa-h5rmyuYvSZNclVpo43lSKR6nuw' },
    { id: 2, name: 'Snake Plant', price: 29.99, image: 'https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1610074066643-OP8HDJUWUH8T5MHN879K/Snake+Plant.jpg?format=1000w' },
    { id: 3, name: 'Peace Lily', price: 35.99, image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSMW5SpBIWHlWtA2Q_CR-e3qg1X8ZvKoYTwn9L1UJiLf9gL7G6i-afb6BJqVoxhLKTXD99DgsoCx0EFajfcxsQDow' },
    { id: 4, name: 'Monstera', price: 39.99, image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcREWrQFcYha0x8wkJYOAvlV_Ns3ubialwsfIRmLDsTSkI3WTgDwQCdwCFfKqEu7vdXJirHrgA2yrs_USjwbs6HR_Q' },
    { id: 5, name: 'Spider Plant', price: 25.99, image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQkLBlWvbZndcEKk7w6Wp0urHZQeuxOjeLtaJBQRMeP0Bbp2oM5drmv83ZZby0ZBFgyfJOpwmO7cLERCToTZntMzQ' },
    { id: 6, name: 'Pothos', price: 20.99, image: 'https://www.plantvine.com/plants/Jade-Pothos-3G-HB-Variation-800x1000.jpg' },
    { id: 7, name: 'Rubber Plant', price: 40.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ37Ka8l5Lm4OK-GI1i9uF2yB8viZoOSAcaT1aN4gid6eVXEkJHCHPaeqhBE7xBxL6ECSKr79PcOn5KzT06AkHiDw' },
    { id: 8, name: 'Calathea', price: 34.99, image: 'https://media.admagazine.com/photos/660a733195c996caa69c1c27/1:1/w_2250,h_2250,c_limit/calathea-roseopicta-significado.jpg' },
    { id: 9, name: 'Chinese Evergreen', price: 30.99, image: 'https://images.squarespace-cdn.com/content/v1/5e1a9e93d343ec0c523f4074/1690891844770-LD69WX6Y8ISVFKCV0NC5/Amazon_Chinese_Evergreen_Red.jpg' },
    { id: 10, name: 'ZZ Plant', price: 32.99, image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTcK9tKGo7YPEitE0p7VO7T9Crr8T7UPpH2QWyXSwYakv2SggXt4kb_fHb6jxeYGCRkyRulGCaQ-UkwfF5yM8dc-g' },
  ]);
  const cart = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    setProducts(products.map(p => p.id === product.id ? { ...p, added: true } : p));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQuantityHandler = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="app">
      <header className="header">
        <div className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">{cartCount}</span>
        </div>
      </header>

      {page === 'landing' && <LandingPage goToProducts={() => setPage('products')} />}
      {page === 'products' && (
        <ProductListPage
          products={products}
          addToCart={addToCartHandler}
          goToCart={() => setPage('cart')}
        />
      )}
      {page === 'cart' && (
        <CartPage
          cartItems={cart}
          updateQuantity={updateQuantityHandler}
          removeFromCart={removeFromCartHandler}
          goToProducts={() => setPage('products')}
        />
      )}
    </div>
  );
};

export default App;
