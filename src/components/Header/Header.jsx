import React from "react";
import { PureComponent } from "react";
import "./header.css";
import Categories from "./Categories/Categories";
import CurrencyDropdown from "./Currency/CurrencyDropdown";
import CartOverlay from "./CartOverlay/CartOverlay";
import { ReactComponent as ShopLogo } from "../../pictures/logo.svg";

class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <Categories />
        <ShopLogo />
        <div className="endElements">
          <CurrencyDropdown />
          <CartOverlay />
        </div>
      </div>
    );
  }
}

export default Header;
