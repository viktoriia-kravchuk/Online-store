import React from "react";
import { PureComponent } from "react";
import Products from "../components/Products/Products";

class Home extends PureComponent {

  render() {
    return (
      <div>
        <Products/>
      </div>
    );
  }
}


export default Home;
