import axios from "axios";

import { AxiosService } from "./axios.service";

export class BalanceService extends AxiosService {
  doDeposit(balance: any) {
    // return  this.SendMessageByPost('/user/get_member')
    return axios
      .post("assets/data/deposit_list.json", { balance: balance })
      .then((res) => res.data);
  }

  askToAccount() {
    return axios
      .post("/community/user_ask_account_wirte_help", {})
      .then((res) => res.data.data);
  }

  askToAccountPass(pass : any) {
    return axios
      .post("/balance/user_ask_to_account_expass", {pass})
      .then((res) => res.data.data);
  }

  applyUserDeposit(balance: any) {
    return axios
      .post("/balance/apply_user_deposit", { balance: balance })
      .then((res) => res.data.data);
  }

  applyUserWithdraw(balance: any) {
    return axios
      .post("/balance/apply_user_withdraw", { balance: balance })
      .then((res) => res.data.data);
  }

  applyUserWithdrawV3(balance: any) {
    return axios
      .post("/slot/withdrawV3", { balance: balance })
      .then((res) => res.data.data);
  }


  get_deposit_and_withdraw(skip: any) {
    return axios
      .post("/balance/get_deposit_and_withdraw", { skip: skip })
      .then((res) => res.data.data);
  }


  

  //   doDeposit() {
  //   }

  delAllBalance() {
    // return  this.SendMessageByPost('/user/get_member')
    return axios
      .post("/balance/user_del_all_balance", {})
      .then((res) => res.data.data);
  }


  

  getDepositList() {
    // return  this.SendMessageByPost('/user/get_member')
    return axios
      .post("/balance/get_deposit_list", {})
      .then((res) => res.data.data);
  }

  delDeposit() {
    // return  this.SendMessageByPost('/user/get_member')
    return axios
      .post("/balance/user_del_deposit", {})
      .then((res) => res.data.data);
  }

  getWithdrawList() {
    // return  this.SendMessageByPost('/user/get_member')
    return axios
      .post("/balance/get_withdraw_list", {})
      .then((res) => res.data.data);
  }

  delWithdraw() {
    // return  this.SendMessageByPost('/user/get_member')
    return axios
      .post("/balance/user_del_withdraw", {})
      .then((res) => res.data.data);
  }

  get_balance_deposit_lock() {
    return this.SendMessageByPost("/balance/get_balance_deposit_lock", {});
  }

  get_balance_withdraw_lock() {
    return this.SendMessageByPost("/balance/get_balance_withdraw_lock", {});
  }
}
