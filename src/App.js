import "./App.css";
import React from "react";
import { PureComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import MainCart from "./pages/MainCart";

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<MainCart/>} />
        </Routes>
      </div>
    );
  }
}

export default App;
