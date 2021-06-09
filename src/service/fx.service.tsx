import { AxiosService } from "./axios.service";

export class FxService extends AxiosService {
  // doDeposit = () => {
  //   // return  this.SendMessageByPost('/user/get_member')
  //   return axios
  //     .post("assets/data/deposit_list.json", { balance: balance })
  //     .then((res) => res.data);
  // };

  doBet = (currency: any, minute: any, type: any, balance: any) => {
    return this.SendMessageByPost("/fx/doBet?", {
      type,
      balance,
      minute,
      currency,
    });
  };

  healthCheck = () => {
    return this.SendMessageByPost("/user/user_health_check", {});
  };

  getFxHistory = (currency: any, page: any) => {
    return this.SendMessageByPost("/fx/user_get_user_histroy", {
      currency: currency,
      skip: page,
    });
  };
}
