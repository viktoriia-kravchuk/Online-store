import React from "react";
import { PureComponent } from "react";
import { ReactComponent as SliderArrow } from "../../../pictures/slider-arrow.svg";
import "./ImagesSlider.css";


class ImagesSlider extends PureComponent {
  state = {
    currentIndex: 0,
    images: this.props.images,
  };
  nextSlide = () => {
    this.setState({
      currentIndex: (this.state.currentIndex + 1) % this.state.images.length,
    });
  };
  prevSlide = () => {
    this.setState({
      currentIndex:
        (this.state.currentIndex - 1 + this.state.images.length) %
        this.state.images.length,
    });
  };

  render() {
    return (
      <div className="sliderContainer">
        {this.state.images.length > 1 ? (
          <div className="arrowsWrapper">
            <div className="leftSide arrow" onClick={this.prevSlide}>
              <SliderArrow />
            </div>
            <div className="rightSide arrow" onClick={this.nextSlide}>
              <SliderArrow />
            </div>
          </div>
        ) : null}
        {this.state.images.map((image, i) => {
          return (
            <div key={i}>
              {this.state.currentIndex === i && (
                <img className="slideImg" src={image} alt={image} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ImagesSlider;
