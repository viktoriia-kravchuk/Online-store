import React from "react";
import { PureComponent } from "react";
import "./Button.css";

class Button extends PureComponent {
  render() {
    const additionalClass = this.props.additionalClass ? this.props.additionalClass: "";
    return (
      <button
        onClick={() => this.props.onClick()}
        className={`button ${additionalClass}`}
        disabled={this.props.disabled}
        
      >
        {this.props.buttonText}
      </button>
    );
  }
}

export default Button;
