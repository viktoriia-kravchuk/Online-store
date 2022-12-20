import React from "react";
import { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { getCategories } from "../../../queries/getProperties";
import { connect } from "react-redux";
import { shopActions } from "../../../store/shop-slice";
import { Link } from "react-router-dom";
import "../header.css";

class Categories extends PureComponent {
  render() {
    return (
      <div className="navigation">
        <Query query={getCategories}>
          {({ loading, error, data }) => {
            if (error) return console.log(error);
            if (loading || !data) return null;
            return data.categories.map((category, index) => {
              return (
                <Link
                  to={"/"}
                  className={"navigationElement"}
                  id={
                    category.name === this.props.shop.category ? "active" : ""
                  }
                  key={index}
                  onClick={() => this.props.changeCategory(category.name)}
                >
                  {category.name}
                </Link>
              );
            });
          }}
        </Query>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (categoryValue) =>
      dispatch(
        shopActions.changeProperty({
          property: "category",
          value: categoryValue,
        })
      ),
  };
};

const mapStateToProps = (state) => {
  return { shop: state.shop };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
