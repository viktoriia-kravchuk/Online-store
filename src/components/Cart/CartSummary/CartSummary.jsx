import React from "react";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import getTotalAmount from "../../../utils/getTotalAmount";
import "./CartSummary.css";
import Button from "../../UI/Button/Button";

class CartSummary extends PureComponent {

  render() {
    const { total, tax } = getTotalAmount(
      this.props.shop.currency,
      this.props.cart.items.map((item) => ({
        quantity: item.quantity,
        prices: item.prices,
      }))
    );
    return (
      <div>
        <div className="summary">
          <div className="text">Tax 21%:</div>
          <div className="itemPrice">
            {this.props.shop.currency}
            {tax}
          </div>
          <div className="text">Quantity:</div>
          <div className="itemPrice">{this.props.cart.totalQuantity}</div>
          <div className="text">Total:</div>
          <div className="itemPrice">
            {this.props.shop.currency}
            {total}
          </div>
        </div>
        <Button
          buttonText={"Order"}
          onClick={() => this.props.checkOut()}
          disabled={false}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { shop: state.shop, cart: state.cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => dispatch(cartActions.clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
