import React from "react";
import { PureComponent } from "react";
import "./Notification.css";

class Notification extends PureComponent {
  render() {
    return (
      <div className={`popup ${this.props.status}`}>
        <div>{this.props.message}</div>
      </div>
    );
  }
}

export default Notification;
