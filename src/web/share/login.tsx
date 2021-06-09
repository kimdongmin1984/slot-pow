import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { UserService } from "../../service/user.service";

interface Props {
  tryLogin: (id: any, pw: any) => any;
  handleClose: () => any;
}

interface State {
  ID: string;
  PW: string;
}

export class Login extends Component<Props, State> {
  userService = new UserService();
  constructor(props: Props) {
    super(props);

    this.state = {
      ID: "",
      PW: "",
   
    };
  }

  doLogin = ()=>{
    if(this.state.ID == '' || this.state.PW.length < 4)
    {
      confirmAlert({
        title: '로그인 아이디를 입력해주세요 .',
        buttons: [
          {
            label: '확인',
            onClick: () => { },
          },
        ],
      })
      return
    }

    if(this.state.PW == '' || this.state.PW.length < 4) 
    {
      confirmAlert({
        title: '로그인 비밀번호를 입력해주세요 .',
        buttons: [
          {
            label: '확인',
            onClick: () => { },
          },
        ],
      })
      return
    }

    this.props.tryLogin(this.state.ID, this.state.PW)
  }


  render() {
    return (
        <Popup
        // key={`main_popup_note_${pop.idx}`}
        open={true}
        contentStyle={{
          zIndex: 97,
          background: "none",
          border: "none",
          width: "none",
        }}
        onClose={() => {}}
      >
        {(close) => (
            <div id="fade_2" className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_63141101" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle', overflowY : 'auto'}} >
                <div className="login_wrap">
                    <div className="login_close_box">
                            <a onClick={()=>{ this.props.handleClose()}} className="fade_2_close"><img src="/web/images/popup_close.png" /></a>
                    </div>
                        <div className="login_box_wrap">
                            <div className="login_tit"><img src="/web/images/in_login_logo.png" /></div>
                            <div className="login">
                                <table   className="login_table">
                                    <tbody><tr>
                                        <td className="login_td1">
                                          <input name="login_id" id="login_id" type="text" className="input_login" placeholder="아이디" 
                                            onChange={({ target: { value } }) =>
                                              this.setState({ ID: value })
                                            }
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td className="login_td2"><input type="password" name="login_pw" id="login_pw" className="input_login" placeholder="비밀번호"
                                                               onChange={({ target: { value } }) =>
                                                               this.setState({ PW: value })
                                                             }
                                      
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td className="login_td3"><a onClick={()=>this.doLogin()}><img src="/web/images/login_btn.png" /></a></td>
                                    </tr>
                                </tbody></table>
                            </div>
                        </div>
                    </div>

                    </div>
            )}
        </Popup>

    );
  }
}
