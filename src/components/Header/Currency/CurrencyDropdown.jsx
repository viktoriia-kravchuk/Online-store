import React from "react";
import { PureComponent } from "react";
import ReactDOM from "react-dom";
import { Query } from "@apollo/client/react/components";
import { shopActions } from "../../../store/shop-slice";
import { connect } from "react-redux";
import { getCurrencies } from "../../../queries/getProperties";
import { ReactComponent as Arrow } from "../../../pictures/arrow.svg";
import "../header.css";


class CurrencyDropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false,
    };
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        openDropdown: false,
      });
    }
  };

  handleChange = (event) => {
    this.setState({ openDropdown: !this.state.openDropdown });
    this.props.changeCurrency(event.target.dataset.value);
  };

  render() {
    return (
      <div
        className="dropdown"
        onClick={() =>
          this.setState({ openDropdown: !this.state.openDropdown })
        }
      >
        <span>{this.props.shop.currency} </span>
        <Arrow
          className={`dropbtn ${this.state.openDropdown && "active-dropbtn"}`}
        />
        <div
          className={`dropdown-content ${
            this.state.openDropdown && "active-dropdown"
          }`}
        >
          <Query query={getCurrencies}>
            {({ loading, error, data }) => {
              if (error) return console.log(error);
              if (loading || !data) return null;
              return data.currencies.map((currency) => {
                return (
                  <p
                    onClick={this.handleChange}
                    data-value={currency.symbol}
                    key={currency.symbol}
                    className="currencyOption"
                  >
                    {currency.symbol} {currency.label}
                  </p>
                );
              });
            }}
          </Query>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currency) =>
      dispatch(
        shopActions.changeProperty({ property: "currency", value: currency })
      ),
  };
};

const mapStateToProps = (state) => {
  return { shop: state.shop };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);
