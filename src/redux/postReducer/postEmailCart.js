import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailAll: [],
};

const cartSlice = createSlice({
  name: "Emailcart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const email = action.payload;
      console.log(state)
      const existingemail = state.cart.find((item) => item.id === email.id);

      if (!existingemail) {
        state.cart = [email, ...state.cart];
      } else {
        existingemail.quantity++;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
   
  },
});

export const { addToCart, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;