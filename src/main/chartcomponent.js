import React from "react";
import { render } from "react-dom";
import CandleStickChart from "./chart";
import { getData, getFxData, ConvertTime } from "../help/utils";

import { TypeChooser } from "react-stockcharts/lib/helper";

// var CanvasJSReact = require("../assets/canvasjs.react");

import CanvasJSReact from "../assets/canvasjs.react";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

//import { CanvasJSReact } from "../assets/canvasjs.react";

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// interface Prop {
//   minute: Number;
//   currency: string;
// }
export class ChartComponent extends React.Component {
  componentDidMount() {
    // getData().then((data) => {
    //   console.log(data);
    //   this.setState({ data });
    // });
  }
  render() {
    if (this.props.data == null || this.props.data.length <= 1) {
      return <div>Loading...</div>;
    }

    const options = {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "",
      },
      axisX: {
        valueFormatString: "hh:mm",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      axisY: {
        includeZero: false,
        prefix: " ",
        //prefix: "$",
        title: "Price",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      toolTip: {
        content:
          "시간: {x}<br />시가: {y[0]}<br /> 종가: {y[3]}<br />고가: {y[1]}<br /> 저가: {y[2]}<br />",
      },
      data: [
        {
          type: "candlestick",

          color: "red",
          fontSize: "4px",
          risingColor: "#F73830",
          fallingColor: "#2E6FCD",

          // fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
          // risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
          // risingColor: { stroke: "red", fill: "white" },
          // fallingColor: { stroke: "blue" },

          // stemColor: "red",
          showInLegend: false,
          name: "Intel Corporation",
          yValueFormatString: "###0.00000",
          xValueFormatString: " hh:mm",
          dataPoints: this.props.data,
        },
        // {
        //   type: "column",
        //   fillOpacity: 0.3, //**Try various Opacity values **//
        //   dataPoints: this.props.data,
        // },
      ],

      candlestick: {
        risingColor: { stroke: "#4CAF50", fill: "white" },
        fallingColor: { stroke: "#F44336" },
      },
    };

    function changeBorderColor() {
      var dataSeries;
      for (var i = 0; i < options.data.length; i++) {
        dataSeries = options.data[i];
        for (var j = 0; j < dataSeries.dataPoints.length; j++) {
          dataSeries.dataPoints[j].color =
            dataSeries.dataPoints[j].y[0] <= dataSeries.dataPoints[j].y[3]
              ? dataSeries.risingColor
                ? dataSeries.risingColor
                : dataSeries.color
              : dataSeries.fallingColor
              ? dataSeries.fallingColor
              : dataSeries.color;
        }
      }
    }
    changeBorderColor();
    return (
      <CanvasJSChart
        options={options}
        onRef={(ref) => {
          this.chart = ref;
        }}
      ></CanvasJSChart>

      // <TypeChooser>
      //   {/* {(type) => <CandleStickChart type={type} data={this.props.data} />} */}
      // </TypeChooser>
    );
  }
}

// render(
// 	<ChartComponent />,
// 	document.getElementById("root")
// );

// import React from "react";
// import { render } from "react-dom";
// import CandleStickChart from "./chart";
// import { getData, getFxData } from "./utils";

// import { TypeChooser } from "react-stockcharts/lib/helper";

// var CanvasJSReact = require("../assets/canvasjs.react");

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// // interface Prop {
// //   minute: Number;
// //   currency: string;
// // }
// export class ChartComponent extends React.Component {
//   componentDidMount() {
//     // getData().then((data) => {
//     //   console.log(data);
//     //   this.setState({ data });
//     // });
//   }
//   render() {
//     // if (this.props.data == null || this.props.data.length <= 1) {
//     //   return <div>Loading...</div>;
//     // }

//     // return (
//     //   <TypeChooser>
//     //     {(type) => <CandleStickChart type={type} data={this.props.data} />}
//     //   </TypeChooser>
//     // );

//     return (
//       <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
//     );
//   }
// }

// render(
// 	<ChartComponent />,
// 	document.getElementById("root")
// );
