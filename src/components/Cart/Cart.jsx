import React from "react";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Link } from "react-router-dom";
import getPriceByCurrency from "../../utils/getPriceByCurrency";
import Attributes from "./Attributes/Attributes";
import CounterButton from "./CounterButton/CounterButton";
import ImagesSlider from "./ImagesSlider/ImagesSlider";
import CartSummary from "./CartSummary/CartSummary";
import "./Cart.css";

class Cart extends PureComponent {
  handleQuantityChange = (product) => (action) => {
    if (action === "add") {
      this.props.addProductToCart(product);
    } else {
      this.props.removeProductFromCart(product.id);
    }
  };

  render() {
    const cart = this.props.cart;
    return (
      <div className="cartContainer">
        <div className="cartTitle">Cart</div>
        <hr size="1" color="#E5E5E5" width="auto" />
        {cart.items.length === 0 ? (
          <div>Your Cart Is Empty </div>
        ) : (
          <div className="productsContainer">
            {cart.items.map((item,i) => {
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
                        className="itemTitle"
                      >
                        <span className="itemBrand">{item.brand}</span>
                        <p className="itemName">{item.name}</p>
                      </Link>
                      <div className="itemPrice">
                        {this.props.shop.currency}
                        {price}
                      </div>
                      <Attributes
                        attributes={item.attributes}
                        handleRadioChange={()=>{}}
                        inStock={item.inStock}
                        productId={i}
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
                        <ImagesSlider images={item.gallery} />
                      </div>
                    </div>
                  </div>
                  <hr size="1" color="#E5E5E5" width="auto" />
                </div>
              );
            })}
            <CartSummary />
          </div>
        )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
