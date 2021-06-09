import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import CopyrightIcon from "@material-ui/icons/Copyright";
// const drawerWidth = 440;
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import RefreshIcon from "@material-ui/icons/Refresh";
import { confirmAlert } from "react-confirm-alert"; // Import

import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ConvertDate,
  ConverMoeny,
  ConvertBalanceStateToText,
} from "../../utility/help";
import { normalizeUnits } from "moment";
import { UserService } from "../../service/user.service";
import { SlotService } from "../../service/slot.service";

import { Deposit } from "./deposit";
import { Withdraw } from "./withdraw";
import { Help } from "./help";
import { User } from "./user";
import { Notie } from "./notie";
import { Reg } from "./reg";
import { Login } from "./login";
import zIndex from "@material-ui/core/styles/zIndex";

export enum popupView {
  none = "none",
  deposit = "deposit",
  withdraw = "withdraw",
  notice = "notice",
  note = "note",
  help = "help",
  user = "user",
  login = "login",

  reg = "reg",
}
const CustomButton = styled(Button)`
  /* background-color: #6772e5; */
  /* color: #000;
  line-height: normal;
  font-size: 12px;
  font: bold; */

  box-shadow: inset 0px 1px 0px 0px #cf866c;
  background: linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
  background-color: #d0451b;
  border-radius: 3px;
  border: 1px solid #942911;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 16px;
  /* padding: 6px 24px; */
  text-decoration: none;
  width: 20%;
  text-shadow: 0px 1px 0px #854629;
`;

const styles = (theme: any) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
    color: "#000",
  },

  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
    display: "inline",
    padding: "10px",
    fontSize: "16px",
  },
  investing: {
    fontSize: "18px",
  },
});

const CustomToolbar = styled(Toolbar)`
  /* .muitoolbar-regular : {
  } */
`;

interface Props {
  classes: any;
  user: any;
  authenticated: boolean;
  isGame? : boolean;
  tryLogin: (id: any, pw: any) => any;
  tryLoginOut: () => any;

  //   session: any;
}

interface State {
  ID: string;
  PW: string;

  balance: number;

  postCount: number;

  note: any;
  isOpen: boolean;
  isLogin: boolean;
  isMenu: boolean;
  
  popupStatuses: string;
}
class topBar extends Component<Props, State> {
  static propTypes: { classes: PropTypes.Validator<object> };
  userService = new UserService();
  slotService = new SlotService();

  constructor(props: Props) {
    super(props);
    this.state = {
      balance: 0,
      ID: "",
      PW: "",
      postCount: 0,
      note: [],
      isOpen: false,
      isLogin: false,
      isMenu: false,
      
      popupStatuses: popupView.none,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.handleUpdateNote();
    }, 30000);
    this.handleUpdateNote();
    this.handleUpdateInBalance();
  }

  handleUpdateInBalance = () => {
    this.slotService.get_in_game_balance().then((data: any) => {
      if (data.status === "success") {
        this.setState({
          balance: data.balance ?? 0,
        });
      } else {
      }
    });
  };

  handleUpdateNote = () => {
    this.userService.get_user_note().then((data: any) => {
      if (data.status === "success") {
        this.setState({
          postCount: data.count,
          note: data.note,
          isOpen: data.count > 0 ? true : false,
        });
      } else if (this.props.authenticated) {
        this.props.tryLoginOut();
      }
    });
  };

  handleClosePopup = () => {
    this.setState({ popupStatuses: popupView.none });
  };

  render() {
    const classes = this.props.classes;
    const user = this.props.user;
    const authenticated = this.props.authenticated;

    const RenderPopup = () => {
      if (this.state.popupStatuses === popupView.deposit) {
        return <Deposit handleClose={this.handleClosePopup}></Deposit>;
      }

      if (this.state.popupStatuses === popupView.withdraw) {
        return (
          <Withdraw
            handleClose={this.handleClosePopup}
            user={this.props.user}
          ></Withdraw>
        );
      }
      if (this.state.popupStatuses === popupView.notice) {
        return <Notie handleClose={this.handleClosePopup}></Notie>;
      }

      if (this.state.popupStatuses === popupView.reg) {
        return <Reg handleClose={this.handleClosePopup}></Reg>;
      }

      if (this.state.popupStatuses === popupView.login) {
        return <Login handleClose={this.handleClosePopup} tryLogin={this.props.tryLogin}></Login>;
      }

      if (this.state.popupStatuses === popupView.help) {
        return <Help handleClose={this.handleClosePopup}></Help>;
      }
      if (this.state.popupStatuses === popupView.user) {
        return <User handleClose={this.handleClosePopup}></User>;
      }

      return <div></div>;
    };

    const RenderLogin = () => {
      if (authenticated === false) {
        return (
          <div className="mo_top_wrap">
            <div className="mo_top_box">
              <div className="mo_logo">
                <a
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <img src="/web/images/logo.png" />
                </a>
              </div>
               <div className="mo_login_wrap">
                <div className="mo_login">
                  <div>
                    {/* <div>
                      <img src="/web/images/login_title.png" />
                    </div> */}
                    {/* <div>
                      <input
                        name=""
                        type="text"
                        className="mo_input_login"
                        onChange={({ target: { value } }) =>
                          this.setState({ ID: value })
                        }
                      />
                    </div>
                    <div>
                      <input
                        name=""
                        type="text"
                        className="mo_input_login"
                        onChange={({ target: { value } }) =>
                          this.setState({ PW: value })
                        }
                      />
                    </div> */}
                     <div>
                      <a
                        title="로그인"
                        onClick={() => {
                          this.setState({
                            popupStatuses: popupView.login,
                          });
                        }}
                      >
                        <img src="/web/images/btn_login.png"  style={{height: "32px"}}/>
                      </a>
                    </div>
                    <div>
                      <a
                        className="mo_fade_0_1_open"
                        title="회원가입"
                        onClick={() => {
                          this.setState({
                            popupStatuses: popupView.reg,
                          });
                        }}
                      >
                        <img src="/web/images/btn_logout.png"  style={{height: "32px"}}/>
                      </a>
                    </div> 
                  </div>
                </div>
              </div> 
            </div>
          </div>
        );
      }

      return (
        <div className="mo_top_wrap">
          <div className="mo_top_box">
            <div className="mo_logo">
              <a
                onClick={() => {
                  window.location.reload();
                }}
              >
                <img src="/web/images/logo.png" />
              </a>
            </div>
            <div className="mo_login_wrap">
              <div className="mo_login">
                <div>
                  {/* <div>
                    <span className="mo_font05">{user.id}</span> 님 환영합니다. /{" "}
                  </div> */}
                  <div>
                    <i className="mo_gui gui-slot3"></i> 슬롯머니{" "}
                    <span className="mo_font05">
                      {ConverMoeny(this.state.balance)}
                    </span>
                    <RefreshIcon
                      onClick={() => {
                        this.handleUpdateInBalance();
                      }}
                    ></RefreshIcon>
                    원 /
                  </div>
                  <div>
                    <i className="mo_gui gui-envelope-o"></i> 쪽지{" "}
                    <span className="mo_font05">({this.state.postCount})</span>통{" "}
                  </div>
                  {/* <div>
                    <a
                      onClick={() => {
                        this.props.tryLoginOut();
                      }}
                    >
                      <img src="/web/images/btn_logout.png" />
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };


    console.log(this.props.user)
    console.log(this.props.authenticated)

    return (
  
      
      <div id="wrap">
        <div id="header_wrap">
          <div className="top">
            <div className="logo"><a href="./" ><img src="/mo/images/m_logo.png"/></a></div>
            <div className="m_menu"><a href="#"   onClick={()=>{this.setState({isMenu : true})}} ><img src="/mo/images/m_menu.png" /></a></div>

            {
              this.props.authenticated === true ? (
                <div className="m_login">
                  <a  onClick={()=> this.props.tryLoginOut()}  className="fade_1_open" data-popup-ordinal="0" id="open_76847357">
                    <img src="/mo/images/m_logout.png"/>
                  </a>
                </div>
              ) : (
                <div className="m_login">
                  <a href="#" onClick={()=>{this.setState({isLogin : true})}} className="fade_1_open" data-popup-ordinal="0" id="open_76847357">
                  <img src="/mo/images/m_login_btn.png"/></a>
                </div>
              )
            }
          </div>
      </div>


        {this.props.isGame && (
                  <div id="jssor_1" style={{position: 'relative', top: '0px', left: '0px', width: '100%', height: '218.5px', overflow: 'hidden', visibility: 'visible', margin: '0px',}} data-jssor-slider="1">
                  <div style={{position: 'absolute', display: 'block', top: '0px', left: '0px', width: '100%', height: '218.5px',}}>
                    <div style={{position: 'absolute', display: 'block', top: '-80.75px', left: '-153px', width: '720px', height: '380px', transform: 'scale(0.575)',}} data-scale-ratio="0.575">
                      <div data-u="slides" style={{cursor: 'default', position: 'absolute', top: '0px', left: '0px', width: '720px', height: '380px', overflow: 'hidden', zIndex: 0}}>
                      <div style={{top: '0px', left: '0px', width: '720px', height: '380px', position: 'absolute', zIndex: 0, pointerEvents: 'none'}}></div></div>
                      <div data-u="slides" style={{cursor: 'default', position: 'absolute', top: '0px', left: '0px', width: '720px', height: '380px', overflow: 'hidden', zIndex: 0}}>
                        <div style={{top: '0px', left: '0px', width: '720px', height: '380px', position: 'absolute', backgroundColor: 'rgb(0, 0, 0)', opacity: 0, zIndex: 0, display: 'none'}}></div>
                        <div style={{zIndex: 1, top: '0px', left: '0px', width: '720px', height: '380px', position: 'absolute', overflow: 'hidden',}}>
                          <img data-u="image" src="/mo/images/m_visual_001.jpg" style={{top: '0px', left: '0px', width: '720px', height: '380px', zIndex: 1, position: 'absolute',}} />
                          <div style={{top: '0px', left: '0px', width: '720px', height: '380px', zIndex: 1000, display: 'none'}}></div>
                        </div>
                        <a data-u="any" href="/" style={{display: 'none', zIndex: 1}}>slider bootstrap</a>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{position: 'absolute', display: 'block', right: '6.9px', bottom: '9.2444px', left: '200.175px', width: '13.6492px', height: '13.6492px',}}>
                    <div data-u="navigator" className="jssorb051" style={{position: 'absolute', inset: '-2.17541px 12px 14px -2.17541px', width: '18px', height: '18px', transform: 'scale(0.758288)'}} data-autocenter="1" data-scale="0.5" data-scale-bottom="0.75" data-scale-ratio="0.758287544405155">
                      <div data-u="prototype" className="i iav" style={{width: '18px', height: '18px', position: 'absolute', left: '0px', top: '0px'}} data-jssor-button="1">
                        <svg viewBox="0 0 16000 16000" style={{position:'absolute',top:0,left:0,width:'100%', height:'100%'}}>
                          <circle className="b" cx="8000" cy="8000" r="5800"></circle>
                          </svg>
                        </div>
                    </div>
                  </div>
                </div>
        )}


        
        {this.state.isLogin && (
         <div  className="popup_wrapper popup_wrapper_visible" style={{opacity: 1, visibility: 'visible', position: 'fixed', cursor: 'pointer', overflow: '', zIndex: 100001, transition: 'all 0.3s ease 0s', width: '100%', height: '100%', top: '0px', left: '0px', textAlign: 'center', display: 'block', backgroundColor: 'rgb(0, 0, 0)'}}>
            <div className="popup_none popup_content"  style={{opacity: '1', visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle'}}>
            <div className="login_wrap2">
              <div className="login_close_box">
                <a onClick={()=>{this.setState({isLogin : false})}} className="fade_1_close"><img src="/mo/images/popup_close.png" height="40" /></a>
              </div>
              <div className="login_box_wrap">
                <div className="login_tit"><img src="/mo/images/in_login_logo.png" /></div>
                <div className="login">
                  <table  className="login_table">
                    <tbody>
                      <tr>
                        <td className="login_td1"><input name="input" type="text" id="login_id" className="input_login2" placeholder="아이디"  
                            value={this.state.ID}
                            onChange={(e: any) => {
                              this.setState({ ID: e.target.value });
                            }}
                        /></td>
                      </tr>
                    <tr>
                      <td className="login_td2">
                        <input name="input" type="password" id="login_pw" className="input_login2" placeholder="비밀번호"
                           value={this.state.PW}
                           onChange={(e: any) => {
                             this.setState({ PW: e.target.value });
                           }}
                        />
                        </td>
                      </tr>
                      <tr>
                        <td className="login_td3"><a onClick={()=>{ this.props.tryLogin(this.state.ID, this.state.PW)}} ><img src="/mo/images/login_btn.png" style={{width:'100%'}} /></a></td>
                      </tr>
                      <tr>
                        <td className="login_td3"><a onClick={()=>{ window.location.hash = 'reg'}}><img src="/mo/images/join_btn.png" style={{width:'100%'}} /></a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="popup_align" style={{display: 'inline-block', verticalAlign: 'middle', height: '100%'}}></div>
        </div> 
        ) }
        {
           this.state.isMenu  && this.props.user != null &&(
            <div className="popup_wrapper" style={{
              position: 'fixed',
              overflow: 'auto',
              zIndex: 99,
              transition: 'all 0.3s ease 0s',
              width: '100%',
              height: '100%',
              top: '0px',
              left: '0px',
              textAlign: 'center'}}>
            <div className="aside2 in">
            <div className="aside_wrap">
              <div className="aside_top_wrap">
                <div className="aside_top_left">
                  <a href="./"><img src="/mo/images/m_logo.png" /></a>
                </div>
                <div data-dismiss="aside" className="aside_top_right"  onClick={()=>{this.setState({isMenu : false})}} ><img src="/mo/images/m_close.png" /></div>        
              </div>
              
              <span id="UserInfo" data-accountholder="" data-checkedupdate="" data-moneymoveused="" data-bankinfo="" data-moneyinfo="" ></span>
                <div className="aside2_box1_wrap">
                  <div className="aside2_box1">
                    <div className="my_left">
                      <span className="font02" style={{margin : '10px'}}>{this.props.user.id}</span>님
                    </div>
                    <div className="my_right">
                      지갑머니 : <span className="font02" id="myWallet">{ConverMoeny(this.state.balance)}</span> 
                      <a onClick={() => { this.handleUpdateInBalance();}} style={{margin : '5px'}} ><img src="/mo/images/icon_re.png" height="20" /></a>  
                    </div>
                  </div>
                </div>
            
          
              <div className="line"></div>
              <div className="aside2_box2_wrap">
                <div className="aside2_box2">
                  <table  style={{width : '100%'}}>
                    <tbody><tr>
                      <td  align="center" style={{width : '33.3333%'}}> 

                        {
                          this.props.authenticated ?
                          (
                            <a onClick={()=>{ window.location.hash = 'deposit'}}><img src="/mo/images/m_gnb01.png" /></a>
                          ) 
                          :
                          (
                            <a onClick={()=>{ 
                              confirmAlert({
                                title: "로그인",
                                message: "로그인이후 사용가능한 기능입니다 ",
                                buttons: [
                                  {
                                    label: "확인",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }}><img src="/mo/images/m_gnb01.png" /></a>
                          )
                        }
                        
                        <br/><br/>
                        <span className="menufont01">입금신청</span>
                      </td>
                      <td  align="center" style={{width : '33.3333%'}}>

                      {
                          this.props.authenticated ?
                          (
                            <a onClick={()=>{ window.location.hash = 'withdraw'}}><img src="/mo/images/m_gnb02.png" /></a>
                          ) 
                          :
                          (
                            <a onClick={()=>{ 
                              confirmAlert({
                                title: "로그인",
                                message: "로그인이후 사용가능한 기능입니다 ",
                                buttons: [
                                  {
                                    label: "확인",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }}><img src="/mo/images/m_gnb02.png" /></a>
                          )
                        }
                        
                        <br/><br/>
                        <span className="menufont01">출금신청</span>
                      </td>
                      
                      {/* <td  align="center" style={{width : '33.3333%'}}>
                                  {
                          this.props.authenticated ?
                          (
                            <a onClick={()=>{ window.location.hash = 'withdraw'}}><img src="/mo/images/m_gnb04.png" /></a>
                          ) 
                          :
                          (
                            <a onClick={()=>{ 
                              confirmAlert({
                                title: "로그인",
                                message: "로그인이후 사용가능한 기능입니다 ",
                                buttons: [
                                  {
                                    label: "확인",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }}><img src="/mo/images/m_gnb04.png" /></a>
                          )
                        }
                        <br/><br/>
                        <span className="menufont01">쿠폰발급현황</span>
                      </td> */}
                    </tr>
                    <tr>
           
                      {/* <td  align="center" style={{width : '33.3333%'}}>
                        {
                          this.props.authenticated ?
                          (
                            <a onClick={()=>{ window.location.hash = 'even'}}><img src="/mo/images/m_gnb06.png" /></a>
                          ) 
                          :
                          (
                            <a onClick={()=>{ 
                              confirmAlert({
                                title: "로그인",
                                message: "로그인이후 사용가능한 기능입니다 ",
                                buttons: [
                                  {
                                    label: "확인",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }}><img src="/mo/images/m_gnb06.png" /></a>
                          )
                        }
                        <span className="menufont01">이벤트</span>
                      </td> */}
          
                      <td  align="center" style={{width : '33.3333%'}}>
                       {
                          this.props.authenticated ?
                          (
                            <a onClick={()=>{ window.location.hash = 'notice'}}><img src="/mo/images/m_gnb07.png" /></a>
                          ) 
                          :
                          (
                            <a onClick={()=>{ 
                              confirmAlert({
                                title: "로그인",
                                message: "로그인이후 사용가능한 기능입니다 ",
                                buttons: [
                                  {
                                    label: "확인",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }}><img src="/mo/images/m_gnb07.png" /></a>
                          )
                        }
                        <br/><br/>
                        <span className="menufont01">공지사항</span>
                      </td>
                      
                      <td  align="center" style={{width : '33.3333%'}}>
                       {
                          this.props.authenticated ?
                          (
                            <a onClick={()=>{ window.location.hash = 'help'}}><img src="/mo/images/m_gnb05.png" /></a>
                          ) 
                          :
                          (
                            <a onClick={()=>{ 
                              confirmAlert({
                                title: "로그인",
                                message: "로그인이후 사용가능한 기능입니다 ",
                                buttons: [
                                  {
                                    label: "확인",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }}><img src="/mo/images/m_gnb05.png" /></a>
                          )
                        }
                        <br/><br/>
                        <span className="menufont01">고객센터</span>
                      </td>
                    </tr>
                    <tr>
                      <td  align="center" style={{width : '33.3333%'}}>
                      {
                          this.props.authenticated ?
                          (
                            <a onClick={()=>{ window.location.hash = 'mypage'}}><img src="/mo/images/m_gnb05.png" /></a>
                          ) 
                          :
                          (
                            <a onClick={()=>{ 
                              confirmAlert({
                                title: "로그인",
                                message: "로그인이후 사용가능한 기능입니다 ",
                                buttons: [
                                  {
                                    label: "확인",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }}><img src="/mo/images/m_gnb08.png" /></a>
                          )
                        }
                        <br /><br/>
                        <span className="menufont01">마이페이지</span>
                      </td>
                      <td  align="center" style={{width : '33.3333%'}}>
                        {
                          this.props.authenticated ?
                          (
                            <a onClick={()=>{ window.location.hash = 'edit'}}><img src="/mo/images/m_gnb09.png" /></a>
                          ) 
                          :
                          (
                            <a onClick={()=>{ 
                              confirmAlert({
                                title: "로그인",
                                message: "로그인이후 사용가능한 기능입니다 ",
                                buttons: [
                                  {
                                    label: "확인",
                                    onClick: () => {},
                                  },
                                ],
                              })
                            }}><img src="/mo/images/m_gnb08.png" /></a>
                          )
                        }
                        <br /><br />
                        <span className="menufont01">정보수정</span>
                      </td>
                        {
                          this.props.authenticated ?
                          (
                            <td  align="center" style={{width : '33.3333%'}}>
                            <a onClick={()=> {this.props.tryLoginOut()}} ><img src="/mo/images/m_logout.png" /></a><br /><br/>
                            <span className="menufont01">로그아웃</span>
                            </td>
                          ) 
                          : 
                          (
                            <td  align="center" style={{width : '33.3333%'}}>
                            </td>

                          )
                     
                        }
          
                    </tr>
              
                  </tbody></table> 
                </div>
              </div>
            </div>
          </div>
          </div>
           ) 

        }
      </div>
    );
  }
}

topBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let TopBar = withStyles(styles, { withTheme: true })(topBar);
export default TopBar;
