import axios from "axios";

console.log(process.env.REACT_APP_API_URL);

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export class AxiosService {
  static SetSession = (_session: any) => {
    //session = _session;
    axios.defaults.headers.post["session"] = _session;
    // axios.headers["session"] = _session;
  };

  async SendMessageByGet(url: any) {
    // console.log("SendMessageByPost ");

    if (axios.defaults.baseURL != null) {
      axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    }

    var response = await axios.get(url);

    // console.log("recive data");
    // console.log(response.data);

    return response.data;
  }

  async SendMessageByPost(url: any, params: any) {
    // console.log("SendMessageByPost ");

    if (axios.defaults.baseURL != null) {
      axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    }

    var response = await axios.post(url, JSON.stringify(params), {
      headers: { "Content-Type": "application/json" },
    });

    // console.log("recive data");
    // console.log(response.data.data);

    return response.data.data;
  }
}
