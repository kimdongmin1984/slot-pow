import axios from "axios";

import { AxiosService } from "./axios.service";

export class UserService extends AxiosService {
  //  static _instance = new UserService();
  
  checkUserCode = (code: any) => {
    return this.SendMessageByPost("/User/check_user_code?", { code: code });
  };

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

  do_del_all_note = () => {
    return this.SendMessageByPost("/community/do_del_all_note", {});
  };
  
  get_user_note_list = () => {
    return this.SendMessageByPost("/community/usre_get_note_list", {});
  };

  
  get_event_list = () => {
    return this.SendMessageByPost("/community/get_event_list", {});
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

  user_balance_to_point = (balance : any) => {
    return this.SendMessageByPost("/user/money_to_point", { balance });
  };

  user_point_to_money = (point: any) => {
    return this.SendMessageByPost("/user/point_to_money", { point });
  };

  
  user_exchange_to_pass = (pass: any) => {
    return this.SendMessageByPost("/user/user_exchange_to_pass", { pass : pass });
  };

  
  
  do_help_message_read = (id : any) => {
    return this.SendMessageByPost("/community/admin_do_help_message_read", { id: id });
  };

    
  del_all_help = () => {
    return this.SendMessageByPost("/community/admin_del_all_help", {  });
  };
  
  
}

// export const UserMgr = UserService.getInstance(); // do something with the instance...
