import React from "react";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { Query } from "@apollo/client/react/components";
import { getProductById } from "../../queries/getProducts";
import { cartActions } from "../../store/cart-slice";
import parse from "html-react-parser";
import getPriceByCurrency from "../../utils/getPriceByCurrency";
import Attributes from "../Cart/Attributes/Attributes";
import Notification from "../UI/Notification/Notification";
import "./DetailsPage.css";

class DetailsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: window.location.pathname.slice(10),
      allAttributes: [],
      mainImage: null,
      status: null,
      message: "",
    };
  }
  setAsLargeImage(image) {
    this.setState({ mainImage: image });
  }

  handleRadioChange = (event) => {
    const defaultAttributes = this.state.allAttributes;

    const changedAttributes = defaultAttributes.map((attribute) => {
      const name = event.target.name.split("_")[0];
      if (attribute.name !== name) {
        return attribute;
      }
      return {
        ...attribute,
        items: attribute.items.map((item) => {
          const selected = item.value === event.target.value;
          return {
            ...item,
            selected: selected,
          };
        }),
      };
    });
    this.setState({ allAttributes: changedAttributes });
  };

  addProductToCart = (product) => {
    const chosenAttributes = this.state.allAttributes.map((attribute) => {
      return attribute.items.find((x) => x.selected === true);
    });
    if (chosenAttributes.every((item) => item !== undefined)) {
      const uniqueId =
        product.id + "_" + chosenAttributes.map((atr) => atr.id).join("_");
      const newProduct = {
        ...product,
        id: uniqueId,
        attributes: this.state.allAttributes,
        quantity: 1,
      };
      this.props.addProductToCart(newProduct);
      this.setState({
        status: "success",
        message: "Product was added to the cart!",
      });
    } else {
      this.setState({
        status: "error",
        message: "Please select all attributes!",
      });
    }

    setTimeout(() => this.setState({ status: null, message: "" }), 4000);
  };

  render() {
    return (
      <div>
        <Query
          query={getProductById}
          variables={{ id: this.state.id }}
          onCompleted={(data) =>
            this.setState({ allAttributes: data.product.attributes })
          }
        >
          {({ loading, error, data }) => {
            if (error) return console.log(error);
            if (loading || !data) return null;
            const product = data.product;
            const price = getPriceByCurrency(
              product.prices,
              this.props.shop.currency
            );
            return (
              <div className="detailsContainer">
                <div className="imagesContainer">
                  <div className="smallImagesContainer">
                    {product.gallery.map((image, i) => (
                      <img
                        src={image}
                        alt={image}
                        key={i}
                        className="smallImageItem"
                        onClick={() => this.setAsLargeImage(image)}
                      />
                    ))}
                  </div>
                  <img
                    src={
                      this.state.mainImage
                        ? this.state.mainImage
                        : product.gallery[0]
                    }
                    className="largeImage"
                    alt="largeImage"
                  />
                </div>
                <div className="cartSection">
                  <span className="productBrand">{product.brand}</span>
                  <p className="productName">{product.name}</p>

                  <Attributes
                    attributes={product.attributes}
                    inStock={product.inStock}
                    handleRadioChange={this.handleRadioChange}
                    productId={product.id}
                  />
                  <div className="priceSection">
                    <div className="attributeTitle">Price:</div>
                    <div className="price">
                      {this.props.shop.currency}
                      {price}
                    </div>
                  </div>

                  <div className="buttonSection">
                    <button
                      onClick={() => this.addProductToCart(product)}
                      className="addButton"
                      disabled={!product.inStock}
                    >
                      Add to cart
                    </button>
                    {this.state.status && (
                      <Notification
                        status={this.state.status}
                        message={this.state.message}
                      />
                    )}
                  </div>
                  <div className="description">
                    {parse(product.description)}
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
