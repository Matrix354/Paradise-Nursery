import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from './redux/cartSlice';

const CartPage = ({ goToProducts }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Carrito</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))
              }
            />
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button onClick={goToProducts}>Volver a productos</button>
    </div>
  );
};

export default CartPage;
