import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartSlice';

const ProductListPage = ({ goToCart }) => {
  const dispatch = useDispatch();
  const products = [
    { id: 1, name: 'Fiddle Leaf Fig', price: 45.99 },
    { id: 2, name: 'Snake Plant', price: 29.99 },
    // Otros productos...
  ];

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
      <button onClick={goToCart}>Ir al carrito</button>
    </div>
  );
};

export default ProductListPage;
