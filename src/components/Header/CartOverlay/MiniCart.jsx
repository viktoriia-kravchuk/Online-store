import React from "react";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../../store/cart-slice";
import getPriceByCurrency from "../../../utils/getPriceByCurrency";
import getTotalAmount from "../../../utils/getTotalAmount";
import Attributes from "../../Cart/Attributes/Attributes";
import CounterButton from "../../Cart/CounterButton/CounterButton";
import ImagesSlider from "../../Cart/ImagesSlider/ImagesSlider";
import Button from "../../UI/Button/Button";
import "./MiniCart.css";

class MiniCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleQuantityChange = (product) => (action) => {
    if (action === "add") {
      this.props.addProductToCart(product);
    } else {
      this.props.removeProductFromCart(product.id);
    }
  };

  handleCheckOut = () => {
    this.props.setIsOpen();
    this.props.checkOut();
  }

  render() {
    const cart = this.props.cart;
    const { total } = getTotalAmount(
      this.props.shop.currency,
      this.props.cart.items.map((item) => ({
        quantity: item.quantity,
        prices: item.prices,
      }))
    );

    return (
      <div className="dropdown-content active-dropdown open-modal">

          <div>
            <div className="label">
              My bag, {this.props.cart.totalQuantity}{" "}
              {this.props.cart.totalQuantity > 1 ? "items" : "item"}{" "}
            </div>
            <div className="productsContainer_mini">
              {cart.items.map((item) => {
                const price = getPriceByCurrency(
                  item.prices,
                  this.props.shop.currency
                );
                return (
                  <div key={`${item.id}_${item.name}`}>
                    <div className="cartElement" key={item.id}>
                      <div>
                        <Link
                          to={`/products/${item.id.split("_")[0]}`}
                          className="itemTitle_mini"
                        >
                          <span>{item.brand}</span>
                          <div>{item.name}</div>
                        </Link>
                        <div className="itemPrice_mini">
                          {this.props.shop.currency}
                          {price}
                        </div>
                        <Attributes
                          attributes={item.attributes}
                          handleRadioChange={() => {}}
                          inStock={item.inStock}
                          productId={item.id}
                        />
                      </div>

                      <div className="itemImages">
                        <div className="buttonsWrapper">
                          <CounterButton
                            sign="+"
                            addOrRemove={this.handleQuantityChange(item)}
                          />
                          <div className="itemQty">
                            <span>{item.quantity}</span>
                          </div>
                          <CounterButton
                            sign="-"
                            addOrRemove={this.handleQuantityChange(item)}
                          />
                        </div>
                        <div>
                          <ImagesSlider images={[item.gallery[0]]} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="buttonsContainer">
                <div className="totalMiniTitle">Total</div>
                <div className="totalMiniPrice">{this.props.shop.currency}{total}</div>
            </div>
            <div className="buttonsContainer">
            <Link to={"/cart"}>
              <Button buttonText="View Bag" onClick={this.props.setIsOpen} additionalClass={"whiteButton"}/>
            </Link>
            <Button buttonText="Check out" onClick={this.handleCheckOut} />
            </div>
          </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { shop: state.shop, cart: state.cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) => dispatch(cartActions.addItemToCart(product)),
    removeProductFromCart: (product) =>
      dispatch(cartActions.removeItemFromCart(product)),
    checkOut: () => dispatch(cartActions.clearCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
