import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { UserService } from "../../service/user.service";

interface Props {
  tryLogin: (id: any, pw: any) => any;
  handleClose: () => any;
  handleActive: (active:string) => any;
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
          <div className="modal loginModal fade show" role="dialog" style={{paddingRight: '17px', display: 'block'}} aria-modal="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  {/* <img className="logo-modal" src="/last/image/logo/logo-footer.png" alt="" /> */}
                  <div className="modal-header">
                      <div className="title text-left">
                          <h5>로그인</h5>
                          <span>LOGIN</span>
                      </div>
                      <button className="close-btn" data-dismiss="modal"  onClick={()=> this.props.handleClose()}></button>
                  </div>
                  <div className="modal-body">
                      <div className="modal-menu">
                          <button type="button" className="mm-btn active">로그인</button>
                          <button type="button" className="mm-btn join-link"  onClick={()=> this.props.handleActive('reg')}>회원가입</button>
                      </div>
                      <div className="form-container">
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>아이디</span>
                              </div>
                              <div className="infos">
                                  <input name="user_id" type="text" onChange={({ target: { value } }) => this.setState({ ID: value }) } />
                              </div>
                          </div>
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>비밀번호</span>
                              </div>
                              <div className="infos">
                                  <input className="submit_on_enter" name="password" type="password"  onChange={({ target: { value } }) => this.setState({ PW: value })} />
                              </div>
                          </div>
                      </div>
                      <div className="modal-footer">
                          <div className="btn-grp">
                              <button className="login-btn" onClick={()=>{this.doLogin()}}><i className="fa fa-check-square-o" aria-hidden="true"></i> 로그인</button>
                              <button type="button" className="gray join-link"><i className="fa fa-user-plus" aria-hidden="true"></i> 회원가입</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
            // <div className="depositModal modal fade in" style={{display: 'block', paddingRight: '17px'}}>
            //   <div className="dep_with_modal cg_modal modal-dialog" style={{height :  '640px'}}>
            //     <div className="header">
            //       <i className="fa fa-credit-card"></i>
            //       <p>로그인   <span>Login</span></p>
            //       <button data-dismiss="modal"  onClick={()=>{this.props.handleClose()}}></button>
            //     </div>
            //     <div className="modal_body">
            //       <div className="login_mobile">
            //         <div className="input">
            //           <div>
            //             <i className="fa fa-user"></i>
            //           </div>
            //           <input type="text" name="mb_id" id="ol_id" placeholder="아이디" onChange={({ target: { value } }) => this.setState({ ID: value }) }
            //           />
            //         </div>
            //         <div className="input">
            //           <div>
            //             <i className="fa fa-key"></i>
            //           </div>
            //           <input type="password" name="mb_password" id="ol_pw" placeholder="비밀번호" onChange={({ target: { value } }) => this.setState({ PW: value })}
            //           />
            //         </div>
            //       </div>
            //       <div className="modal_btn_grp login">
            //         <button id="ol_submit"  onClick={()=>this.doLogin()}>로그인</button>
            //         <button data-dismiss="modal" onClick={()=>{this.props.handleClose()}}>취소하기</button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
  
            // <div id="fade_2" className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_63141101" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle'}} >
            //     <div className="login_wrap">
            //         <div className="login_close_box">
            //                 <a onClick={()=>{ this.props.handleClose()}} className="fade_2_close"><img src="/web/images/popup_close.png" /></a>
            //         </div>
            //             <div className="login_box_wrap">
            //                 <div className="login_tit"><img src="/web/images/in_login_logo.png" /></div>
            //                 <div className="login">
            //                     <table   className="login_table">
            //                         <tbody><tr>
            //                             <td className="login_td1">
            //                               <input name="login_id" id="login_id" type="text" className="input_login" placeholder="아이디" 
            //                                 onChange={({ target: { value } }) =>
            //                                   this.setState({ ID: value })
            //                                 }
            //                             /></td>
            //                         </tr>
            //                         <tr>
            //                             <td className="login_td2"><input type="password" name="login_pw" id="login_pw" className="input_login" placeholder="비밀번호"
            //                                                    onChange={({ target: { value } }) =>
            //                                                    this.setState({ PW: value })
            //                                                  }
                                      
            //                             /></td>
            //                         </tr>
            //                         <tr>
            //                             <td className="login_td3"><a onClick={()=>this.doLogin()}><img src="/web/images/login_btn.png" /></a></td>
            //                         </tr>
            //                     </tbody></table>
            //                 </div>
            //             </div>
            //         </div>

            //         </div>
            )}
        </Popup>

    );
  }
}
