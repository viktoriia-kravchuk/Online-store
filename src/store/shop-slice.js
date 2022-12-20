import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    category: "clothes",
    currency: "$",
    isOpen: false,
  },
  reducers: {
    changeCurrency(state, action) {
      const selectedCurrency = action.payload;
      if(selectedCurrency!== state.currency){
        state.currency = selectedCurrency;
      }
    },
    changeCategory(state, action) {
      const choosenCategory = action.payload;
      if (choosenCategory !== state.category) {
        state.category = choosenCategory;
      }
    },
    changeProperty(state,action){
      const selectedProperty = action.payload.property;
      const newValue = action.payload.value;

      if(selectedProperty!==state[selectedProperty]){
        state[selectedProperty] = newValue;
      }
    }
  },
});

export const shopActions = shopSlice.actions;

export default shopSlice.reducer;
