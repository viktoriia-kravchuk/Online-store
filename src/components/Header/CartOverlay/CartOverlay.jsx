import React from "react";
import { PureComponent } from "react";
import "./CartOverlay.css";
import { connect } from "react-redux";
import cartIcon from "../../../pictures/trolley.png";
import MiniCart from "./MiniCart";

class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMiniCart: false,
    };
  }

  openMiniCart = () => {
    this.setState({ showMiniCart: !this.state.showMiniCart });
  };
  

  render() {
    return (
      <div className="cartOverlay">
        <div className={`dropdown`}>
          <div className="" onClick={this.openMiniCart}>
            <div className="iconWrapper">
              <div>
                <img
                  src={cartIcon}
                  alt="cartIcon"
                  className="cartIcon"
                  height={22}
                />
                {this.props.cart.totalQuantity > 0 ? (
                  <div className="cartIconQuantity">
                    {this.props.cart.totalQuantity}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {this.state.showMiniCart && (
            <MiniCart setIsOpen={this.openMiniCart} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(CartOverlay);
