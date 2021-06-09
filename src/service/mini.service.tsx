import axios from "axios";

import { AxiosService } from "./axios.service";

export class MiniService extends AxiosService {
  getMiniGameOption = () => {
    return axios.post("/mini/get_minis_option").then((res) => res.data);
  };

  getMiniGameByGameType = (type: any) => {
    return axios
      .post("/mini/get_mini_game_by_game_type", { type: type })
      .then((res) => res.data.data);
  };

  getMiniGameBetByType = (type: any) => {
    return axios
      .post("/mini/get_user_mini_game_bet_by_type", { type: type })
      .then((res) => res.data.data);
  };

  getMiniGameBetList = (skip: any) => {
    return axios
      .post("/mini/get_user_mini_bet_list", { skip: skip })
      .then((res) => res.data.data);
  };

  doBetMiniGame = (mini: any) => {
    return axios
      .post("/mini/do_mini_betting", mini)
      .then((res) => res.data.data);
  };

  getDepositWarningList = () => {
    return axios
      .get("assets/data/deposit_warning.json")
      .then((res) => res.data.depositw_warning);
  };

  getDepositBalanceList = () => {
    return axios
      .get("assets/data/deposit_balnce.json")
      .then((res) => res.data.deposit_balnce);
  };

  getHelpList = () => {
    return axios
      .get("assets/data/help_list.json")
      .then((res) => res.data.deposit_balnce);
  };
}
