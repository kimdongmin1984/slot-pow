import axios from "axios";

import { AxiosService } from "./axios.service";

export class SlotService extends AxiosService {
  constructor() {
    super(); // exception thrown here when not called
  }

  getSlotSetting() {
    return axios.post("/casino/get_slot_setting").then((res) => res.data.data);
  }

  get_slot_by_company(company: any) {
    return this.SendMessageByPost("/casino/get_slot_by_company", {
      company: company,
    }).then((res) => res);
  }

  ///
  getCasinoSetting() {
    return this.SendMessageByPost("/casino/get_casino_setting", {}).then((res : any) => res);
  }
  ///
  get_slot_bets_list(params: any) {
    return this.SendMessageByPost("/slot/get_slot_bets_list", params).then(
      (res) => res
    );
  }

  OpenSlot(code: string, company: string ) {
    return axios
      .post("/slot/user_open_slotv4", { code: code , company : company})
      .then((res) => res.data.data);
  }

  get_in_game_balance() {
    return axios
      .post("/slot/get_in_game_balance", {})
      .then((res) => res.data.data);
  }


  get_help_no_read_message() {
    return axios
      .post("/community/admin_get_help_no_read_message", {})
      .then((res) => res.data.data);
  }


  TransferIn(balance: string) {
    return axios
      .post("/casino/user_transfer_in", { balance: balance })
      .then((res) => res.data.data);
  }

  // TransferOut(balance: string) {
  //   return axios
  //     .post("/casino/user_transfer_out", { balance: balance })
  //     .then((res) => res.data.data);
  // }

  withdraw(balance: string) {
    return axios
      .post("/slot/withdrawV3", { balance: balance })
      .then((res) => res.data.data);
  }

  
  get_slot_bets(skip : number) {
    return axios
      .post("/slot/get_slot_bets", {skip })
      .then((res) => res.data.data);
  }
}
