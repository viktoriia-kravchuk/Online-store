import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id===newItem.id
      );
      state.totalQuantity++;
      state.changed = true;

      // adding a product that is not in the cart yet
      if (!existingItem) {
        state.items.push(newItem);
        //adding a product that already exists
      } else {
        existingItem.quantity = existingItem.quantity + 1;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
      }
    },
    clearCart(state){

      return{
        ...state,
        items: [],
        totalQuantity: 0
      }
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
