import React from "react";
import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as CartButton } from "../../../pictures/cart.svg";
import "./ProductCard.css";
import { cartActions } from "../../../store/cart-slice";
import getPriceByCurrency from "../../../utils/getPriceByCurrency";

class ProductCard extends PureComponent {

  addItemToCart(product) {
    let newProduct = {};
    if (product.attributes.length === 0) {
      newProduct = {
        ...product,
        id: `${product.id}`,
        quantity: 1,
      };
      this.props.addProductToCart(newProduct);
    } else {
      const defaultAttributes = product.attributes.map((attribute) => {
        return {
          ...attribute,
          items: attribute.items.map((item, index) => {
            return index === 0
              ? { ...item, selected: true }
              : { ...item, selected: false };
          }),
        };
      });
      const chosenAttributes = defaultAttributes.map((attribute) => {
        return attribute.items.find((x) => x.selected === true);
      });
      const uniqueId =
        product.id + "_" + chosenAttributes.map((atr) => atr.id).join("_");
      newProduct = {
        ...product,
        id: uniqueId,
        attributes: defaultAttributes,
        quantity: 1,
      };
      this.props.addProductToCart(newProduct);
    }
  }

  render() {
    const { product } = this.props;
    const price = getPriceByCurrency(product.prices, this.props.shop.currency);

    return (
      <Link to={`/products/${product.id}`} className="productCard">
        <div
          className={`productContainer ${!product.inStock && "disableImage"} `}
        >
          <div className="imageContainer">
            <img
              src={product.gallery[0]}
              className="image"
              alt={product.name}
            />
            {!product.inStock && <div className="stockInfo">OUT OF STOCK</div>}
          </div>
          {product.inStock && (
            <CartButton
              className="cartButton"
              onClick={(event) => {
                event.preventDefault();
                this.addItemToCart(product);
              }}
            />
          )}
          <div className="productInfo">
            <p>{product.brand} {product.name}</p>
            <div className="price">
              {this.props.shop.currency}
              {price}
            </div>
          </div>
        </div>

      </Link>
    );
  }
}
const mapStateToProps = (state) => {
  return { shop: state.shop, cart: state.cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) => dispatch(cartActions.addItemToCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
