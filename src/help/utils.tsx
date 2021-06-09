// import { tsvParse, csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse: any) {
  return function (d: any) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    console.log(d);

    return d;
  };
}

function convertData(parse: any) {
  return function (d: any) {
    for (let json of JSON.parse(parse)) {
      console.log(json);
      // d.date = parse(d.date);
      // d.open = +d.open;
      // d.high = +d.high;
      // d.low = +d.low;
      // d.close = +d.close;
      // d.volume = +d.volume;
    }
    // d.date = parse(d.date);
    // d.open = +d.open;
    // d.high = +d.high;
    // d.low = +d.low;
    // d.close = +d.close;
    // d.volume = +d.volume;

    return d;
  };
}

// export function getData() {
//   const promiseIntraDayDiscontinuous = fetch(
//     "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT_INTRA_DAY.tsv"
//   )
//     .then((response) => response.text())
//     .then((data) =>
//       tsvParse(
//         data,
//         parseData((d: any) => new Date(+d))
//       )
//     );
//   return promiseIntraDayDiscontinuous;
// }

// console.log();


export const GetTimeStemp = (): number => {
  return new Date().getTime()
}


export function getFxData(currency: any, minute: any) {
  const promiseIntraDayDiscontinuous = fetch(
    `${process.env.REACT_APP_API_URL}fx/get_fx_history`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ currency, minute }), // body data type must match "Content-Type"
    }
  )
    .then((response) => response.text())
    .then(
      (data) => {
        let ex = [];
        let json = JSON.parse(data).data.fx;
        for (let json1 of json) {
          let fix = 1;
          let begin = json1.beginAsk;
          let end = json1.progressBid;
          let newChart = {
            _id: json1._id.toString(),
            date: new Date(json1.endDate),
            endDate: json1.endDate,
            beginDate: json1.beginDate,
            beginGameDate: json1.beginGameDate,
            minute: json1.minute,
            currency: json1.currency,
            high: json1.high,

            low: json1.low,

            close: json1.close,
            open: json1.open,
          };
          ex.push(newChart);
        }

        return ex.sort((a, b) => {
          return a.date.getTime() - b.date.getTime();
        });
      }

      //   tsvParse(
      //     data,
      //     parseData((d) => new Date(+d))
      //   )
    );
  return promiseIntraDayDiscontinuous;
}

export function getFxNowData(currency: any, minute: any) {
  const promiseIntraDayDiscontinuous = fetch(
    `${process.env.REACT_APP_API_URL}fx/get_now_fx`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ currency, minute }), // body data type must match "Content-Type"
    }
  )
    .then((response) => response.text())
    .then(
      (data) => {
        let json = JSON.parse(data).data;
        // for (let json1 of json) {
        //   let fix = 1;
        //   let begin = json1.beginAsk;
        //   let end = json1.progressBid;
        //   let newChart = {
        //     date: new Date(json1.beginDate),
        //     high: json1.high,
        //     low: json1.low,
        //     close: json1.close,
        //     open: json1.beginBid,
        //   };
        //   ex.push(newChart);
        // }

        return json;
      }

      //   tsvParse(
      //     data,
      //     parseData((d) => new Date(+d))
      //   )
    );
  return promiseIntraDayDiscontinuous;
}
