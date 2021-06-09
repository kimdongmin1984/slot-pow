import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import { request } from "http";

interface Props {
  // odds: number;
  // name: string;
  // color: string;
  // checkBet: () => any;
  // clickBet: () => any;
}

interface State {}

const content = [
  {
    title: "Vulputate Mollis Ultricies Fermentum Parturient",
    description:
      "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
    button: "Read More",
    image: "https://i.imgur.com/ZXBtVw7.jpg",
    user: "Luan Gjokaj",
    userProfile: "https://i.imgur.com/JSW6mEk.png",
  },
  {
    title: "Tortor Dapibus Commodo Aenean Quam",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    button: "Discover",
    image: "https://i.imgur.com/DCdBXcq.jpg",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png",
  },
  {
    title: "Phasellus volutpat metus",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
    button: "Buy now",
    image: "https://i.imgur.com/DvmN8Hx.jpg",
    user: "Bruno Vizovskyy",
    userProfile: "https://i.imgur.com/4KeKvtH.png",
  },
];

export class AniSlider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    // let odds = this.props.odds;
    // let name = this.props.name;
    // let color = this.props.color;

    return (
      <div className="slideshow5_wrap">
        <div className="slideshow5_wrap_center">
          <div
            className="slide1 cycle-slideshow"
            data-cycle-fx="scrollHorz"
            data-cycle-timeout="6000"
            data-cycle-pause-on-hover="true"
            data-cycle-prev=".prev.slide_btn"
            data-cycle-next=".next.slide_btn"
            data-cycle-pager=".slide_pager"
            data-cycle-pager-event="mouseover"
            data-cycle-slides="> a"
          >
            <a>
              <img src="/web/images/visual_003.png" />
            </a>
            <a>
              <img src="/web/images/visual_002.png" />
            </a>
            {/* <a>
              <img src="/web/images/slideshow3.jpg" />
            </a>
            <a>
              <img src="/web/images/slideshow5.jpg" />
            </a> */}
            <div className="slide_pager"></div>
          </div>
        </div>
      </div>
    );
  }
}
