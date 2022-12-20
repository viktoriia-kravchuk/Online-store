import React from "react";
import { PureComponent } from "react";
import "./Attributes.css";

class Attributes extends PureComponent {
  render() {
    const attributes  = this.props.attributes;
    const inStock = this.props.inStock;
    const productId = this.props.productId;

    return (
      <div className="allAttributes">
        {attributes.map((attribute) => (
          <div
            className="attributeContainer"
            key={`${attribute.id}`}
          >
            <p className="attributeTitle">{`${attribute.name}:`}</p>
            <div className="attributeOptions">
              {attribute.items.map((item) => (
                <div key={`${attribute.id}_${item.id}`}>
                  <input
                    type="radio"
                    name={`${attribute.name}_${productId}`}
                    id={`${attribute.id}_${item.id}_${productId}`}
                    value={item.value}
                    checked={item.selected}
                    onChange={this.props.handleRadioChange}
                    disabled={!inStock}
                  />
                  <label htmlFor={`${attribute.id}_${item.id}_${productId}`}>
                    <div
                      className={
                        attribute.type === "swatch" ? "colorRadio" : "textRadio"
                      }
                      style={
                        attribute.type === "swatch"
                          ? {
                              background: item.value,
                              border: `1px solid ${
                                item.id === "White" ? "black" : item.value
                              }`,
                            }
                          : null
                      }
                    >
                      {attribute.type === "swatch" ? "" : item.value}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Attributes;
