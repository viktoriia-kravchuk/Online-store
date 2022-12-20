import React from "react";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { Query } from "@apollo/client/react/components";
import { getProductsByCategory } from "../../queries/getProducts";
import ProductCard from "./ProductCard/ProductCard";
import "./products.css";

class Products extends PureComponent {
  render() {
    return (
      <div className="container">
        <p className="title">{this.props.shop.category}</p>
        <Query
          query={getProductsByCategory}
          variables={{ category: { title: this.props.shop.category } }}
          fetchPolicy="no-cache"
        >
          {({ loading, error, data }) => {
            if (error) return console.log(error);
            if (loading || !data) return null;
            const products = data.category.products;
            return (
              <div className="products">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { shop: state.shop };
};

export default connect(mapStateToProps)(Products);
