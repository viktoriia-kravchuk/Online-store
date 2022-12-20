import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import shopSlice from "./shop-slice";
import { getConfiguredCache } from "money-clip";
import getPersistMiddleware from "redux-persist-middleware";

const cache = getConfiguredCache();

const actionMap = {
  "shop/changeProperty": ["shop"],
  "cart/addItemToCart": ["cart"],
  "cart/removeItemFromCart": ["cart"]
};

const clearActionMap = {
  "cart/clearCart": ["cart"]
 };

const persistMiddleware = getPersistMiddleware({
  cacheFn: cache.set,
  logger: console.info,
  actionMap,
});
const clearMiddleware = getPersistMiddleware({
  cacheFn: cache.del,                 
  logger: console.info,              
  actionMap: clearActionMap         
 });

export default cache.getAll().then((data) => {
  const store = configureStore({
    reducer: {
      shop: shopSlice,
      cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(persistMiddleware, clearMiddleware),
    preloadedState: {
      shop: data.shop,
      cart: data.cart,
    },
  });
  return store;
});
