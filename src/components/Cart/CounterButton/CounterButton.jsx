import React from "react";
import { PureComponent } from "react";
import "./CounterButton.css";

class CounterButton extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.props.addOrRemove(event.target.getAttribute("name"));
  }

  render() {
    const action = this.props.sign === "+" ? "add" : "remove";
    return (
      <div className="counterButton" name={action} onClick={this.handleClick}>
        {this.props.sign}
      </div>
    );
  }
}

export default CounterButton;
