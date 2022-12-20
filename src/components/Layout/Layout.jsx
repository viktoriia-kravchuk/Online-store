import React from "react";
import { PureComponent } from "react";
import Header from "../Header/Header";

class Layout extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <main>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
