import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Productos en el carrito
  count: 0,  // Contador de productos en el carrito
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [],
      count: 0, // Contador de productos en el carrito
    },
    reducers: {
      addToCart: (state, action) => {
        const product = action.payload;
        const existingProduct = state.items.find(item => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          state.items.push({ ...product, quantity: 1 });
        }
        state.count = state.items.reduce((sum, item) => sum + item.quantity, 0); // Actualiza el contador
      },
      removeFromCart: (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter(item => item.id !== productId);
        state.count = state.items.reduce((sum, item) => sum + item.quantity, 0); // Actualiza el contador
      },
      updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) item.quantity = quantity;
        state.count = state.items.reduce((sum, item) => sum + item.quantity, 0); // Actualiza el contador
      },
    },
  });

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
