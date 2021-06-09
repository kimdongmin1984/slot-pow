import axios from "axios";

import { AxiosService } from "./axios.service";

export class UserService extends AxiosService {
  //  static _instance = new UserService();

  regUser = (params: any) => {
    return this.SendMessageByPost("/User/regUsed?", params);
  };

  regCheckID = (params: any) => {
    return this.SendMessageByPost("/User/check_user_id?", { id: params });
  };

  healthCheck = () => {
    return this.SendMessageByPost("/User/user_health_check", {});
  };

  getUserInfo = () => {
    return this.SendMessageByPost("/User/get_member?", {});
  };

  doLogin = (id: any, pw: any) => {
    return this.SendMessageByPost("/User/do_login?", { id: id, pw: pw });
  };

  get_user_notices = () => {
    return this.SendMessageByPost("/community/user_get_notices", {});
  };

  get_user_note = () => {
    return this.SendMessageByPost("/community/usre_get_note", {});
  };

  get_user_note_list = () => {
    return this.SendMessageByPost("/community/usre_get_note_list_time", {});
  };

  
  get_event_list = () => {
    return this.SendMessageByPost("/community/get_event_list", {});
  };

  
  do_del_all_note = () => {
    return this.SendMessageByPost('/community/do_del_all_note', {});
  };


  do_read_note = (id: string) => {
    return this.SendMessageByPost("/community/usre_do_read_note", { id: id });
  };

  do_del_note = (id: string) => {
    return this.SendMessageByPost("/community/usre_do_del_note", { id: id });
  };

  get_advertisement = (type: string) => {
    return this.SendMessageByPost("/community/user_get_advertisement", {
      type: type,
    });
  };

  get_notice_popup = () => {
    return this.SendMessageByPost("/community/user_get_notice_popup", {});
  };

  get_help_list = () => {
    return this.SendMessageByPost("/community/get_help_list", {});
  };

  user_wirte_help = (title: string, contents: string) => {
    return this.SendMessageByPost("/community/user_wirte_help", {
      title: title,
      contents: contents,
    });
  };

  user_del_help = (id: string) => {
    return this.SendMessageByPost("/community/user_del_help", { id: id });
  };

  user_chang_to_point = () => {
    return this.SendMessageByPost("/user/user_chang_to_point", {});
  };

  user_exchange_to_pass = (pass: any) => {
    return this.SendMessageByPost("/user/user_exchange_to_pass", { pass });
  };
}

// export const UserMgr = UserService.getInstance(); // do something with the instance...
