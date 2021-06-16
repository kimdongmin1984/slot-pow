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
import CircularProgress from "@material-ui/core/CircularProgress";
import { useCookies } from 'react-cookie'
import { confirmAlert } from 'react-confirm-alert' // Import

import {
  ConvertDate,
  ConverMoeny,
  ConvertBalanceStateToText,
} from "../../utility/help";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import { normalizeUnits } from "moment";
import { UserService } from "../../service/user.service";
import { SlotService } from "../../service/slot.service";
import { BalanceService } from "../../service/balance.service";


import { Deposit } from "./deposit";
import { DepositList } from "./depositlist";
import { Withdraw } from "./withdraw";
import { WithdrawList } from "./withdrawlist";
import { Help } from "./help";
import { User } from "./user";
import { Notice } from "./notice";
import { Reg } from "./reg";
import { Login } from "./login";
import { Even } from "./even";
import { Coupon } from "./coupon";
import { Edit } from "./edit";
import { Point } from "./point";
import { Note } from "./note";
import { BalanceList } from "./balancelist";
import { Bet } from "./bet";

import SoundPlays from "../../SoundPlay";




export enum popupView {
  none = "none",
  deposit = "deposit",
  withdraw = "withdraw",
  notice = "notice",
  even = "even",
  
  note = "note",
  help = "help",
  user = "user",

  reg = "reg",
  login = "login",
  coupon = "coupon",
  edit= "edit",
  point= "point",
  balance= "balance",
  bet = "bet",
  depositlist = "depositlist",
  withdrawlist = "withdrawlist",
  
  
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
  tryLogin: (id: any, pw: any) => any;
  tryLoginOut: () => any;

  //   session: any;
}

interface State {
  ID: string;
  PW: string;

  balance: number;
  messageCount: number;

  postCount: number;

  note: any;

  popupStatuses: string;
  mobileMenuOpen: boolean;

  width : number

  openSide : boolean

}


class topBar extends Component<Props, State> {
  static propTypes: { classes: PropTypes.Validator<object> };
  userService = new UserService();
  slotService = new SlotService();
  balanceService = new BalanceService();

  constructor(props: Props) {
    super(props);
    this.state = {
      balance: 0,
      ID: "",
      PW: "",
      postCount: 0,
      messageCount: 0,
      
      note: [],
      popupStatuses: popupView.none,
      mobileMenuOpen : false,
      width : window.innerWidth,
      openSide : false
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.handleUpdateNote();
    }, 30000);

    // setInterval(() => {
    //   this.handleUpdateMessage();
    // }, 10000);
    this.handleUpdateNote();
    this.handleUpdateInBalance();
    // this.handleUpdateMessage();
    
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

  
  // handleUpdateMessage = () => {
  //   // if(this.state.messageCount > 0){
  //   //   return 
  //   // }
  //   if(this.props.authenticated === false){
  //     return 
  //   }

  //   this.slotService.get_help_no_read_message().then((data: any) => {
  //     if (data.status === "success") {
  //       this.setState({
  //         messageCount: data.count ?? 0,
  //       });


  //       if( data.count > 0) {
  //         // SoundPlays('helpCount')
  //       }
  //     } else {
  //     }
  //   });
  // };

  handleUpdateNote = () => {
    if(this.props.authenticated === false || this.props.user == null){
      return 
    }

    if(this.state.popupStatuses === popupView.note){
      return 
    }

    // helpCount: s.helpCount,
    // noteCount: s.noteCount,
    if(this.props.user.helpCount > 0){
      this.handleSetState(popupView.help)
      return 
    }

    if(this.props.user.noteCount > 0){
      this.handleSetState(popupView.note)
      return 
    }
    // this.userService.get_user_note().then((data: any) => {
    //   if (data.status === "success") {
    //     // this.setState({
    //     //   postCount: data.count,
    //     //   note: data.note,
    //     //   isOpen: data.count > 0 ? true : false,
    //     // });
    //     if(data.count > 0){
    //       this.handleSetState(popupView.note)
    //       return 
    //     }

    //   } else if (this.props.authenticated) {
    //     this.props.tryLoginOut();
    //   }
    // });
  };

  handleSetState = (state: string)=>{
    this.setState({popupStatuses: state})
  }

  handleClosePopup = () => {
    this.setState({ popupStatuses: popupView.none });
  };

  

  handleAskToAccount = () => {
  
    this.balanceService.askToAccount().then((data) => {
      if (data.status === "success") {
        confirmAlert({
          title: "계좌문의",
          message: "계좌문의을 성공하였습니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {
              },
            },
          ],
        });
        return;
      } else if (data.status === "pass") {
        confirmAlert({
          title: "계좌문의",
          message: "환전 비밀번호를 확인해주세요.",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
        return;
      } else {
        confirmAlert({
          title: "계좌문의",
          message:
            "알수없는 예러가 발상하였습니다 문제가 지속된다면 관리자에게 문의 바람니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
      }
    });
  };

  render() {
    const classes = this.props.classes;
    const user = this.props.user;
    const authenticated = this.props.authenticated;

    const RenderPopup = () => {
      
      

      if (this.state.popupStatuses === popupView.reg) {
        return <Reg handleClose={this.handleClosePopup} handleActive={this.handleSetState} ></Reg>;
      }
      
      if (this.state.popupStatuses === popupView.login) {
        return <Login handleClose={this.handleClosePopup}  handleActive={this.handleSetState} tryLogin={this.props.tryLogin}></Login>;
      }

      if((user == null || user.id == '' || user.id == null)  && this.state.popupStatuses != popupView.none &&  this.state.popupStatuses != popupView.note ){
        confirmAlert({
          title: '로그인 이후 사용가능합니다.',
          buttons: [
            {
              label: '확인',
              onClick: () => { 

                this.setState({popupStatuses : popupView.none})
              },
            },
          ],
        })
        return
      }


      if (this.state.popupStatuses === popupView.deposit) {
        return <Deposit 
          handleClose={this.handleClosePopup} 
          user={this.props.user}
          handleActive={this.handleSetState}
        > </Deposit>;
      }

      if (this.state.popupStatuses === popupView.withdraw) {
        return <Withdraw
            handleClose={this.handleClosePopup}
            user={this.props.user}
            handleActive={this.handleSetState}></Withdraw>;
      }
      if (this.state.popupStatuses === popupView.notice) {
        return <Notice 
          handleClose={this.handleClosePopup}
          handleActive={this.handleSetState}        ></Notice>
      }


      
      if (this.state.popupStatuses === popupView.coupon) {
        return <Coupon 
          handleClose={this.handleClosePopup} 
          handleActive={this.handleSetState}        ></Coupon>;
      }
      
      

      if (this.state.popupStatuses === popupView.even) {
        return <Even 
          handleClose={this.handleClosePopup} 
          handleActive={this.handleSetState}        ></Even>;
      }
      

      if (this.state.popupStatuses === popupView.help) {
        return <Help 
          handleClose={this.handleClosePopup} 
          handleActive={this.handleSetState}        ></Help>;
      }
      if (this.state.popupStatuses === popupView.user) {
        return <User 
        user={this.props.user}
          handleClose={this.handleClosePopup} 
          handleActive={this.handleSetState}        ></User>;
      }

      if (this.state.popupStatuses === popupView.edit) {
        return <Edit 
        handleClose={this.handleClosePopup} 
        handleActive={this.handleSetState}   
        user={this.props.user}    ></Edit>;
      }

      if (this.state.popupStatuses === popupView.point) {
        return <Point 
          user={this.props.user}
          handleClose={this.handleClosePopup} 
          handleActive={this.handleSetState}   
        ></Point>;
      }
      
      
      if (this.state.popupStatuses === popupView.note) {
        return <Note   
        handleClose={this.handleClosePopup} 
        handleActive={this.handleSetState}     ></Note>;
      }
      

         
      if (this.state.popupStatuses === popupView.balance) {
        return <BalanceList   
        handleClose={this.handleClosePopup} 
        handleActive={this.handleSetState}     ></BalanceList>;
      }
      
      if (this.state.popupStatuses === popupView.bet) {
        return <Bet   
        handleClose={this.handleClosePopup} 
        handleActive={this.handleSetState}     ></Bet>;
      }
      
      
      if (this.state.popupStatuses === popupView.depositlist) {
        return <DepositList   
        handleClose={this.handleClosePopup} 
        handleActive={this.handleSetState}     ></DepositList>;
      }

      
      
      if (this.state.popupStatuses === popupView.withdrawlist) {
        return <WithdrawList   
        handleClose={this.handleClosePopup} 
        handleActive={this.handleSetState}     ></WithdrawList>;
      }
      
      
      return <div></div>;
    };


    return (
      <header className="header-main">
        <div className="header-top">
            <div className="container">
                <button className="left-menu-btn" onClick={()=>{this.state.openSide ? this.setState({openSide : false}) : this.setState({openSide : true})}}> 
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="logo-container">
                  <a href="/" className="ls-logo">
                      <img className="logo-img" src="/last/image/logo-img.png" alt="" />
                      <img className="slot-icon" src="/last/image/logo/slot-icon.png" alt="" />
                      {/* <img className="last" src="/last/image/logo/last.png" alt="" /> */}
                      <img className="chance" src="/last/image/logo/chance.png" alt="" />
                      <img className="slot" src="/last/image/logo/slot.png" alt="" />
                      <img className="kr-text" src="/last/image/logo/logo/kr-text.png" alt="" /> 
                  </a>
                  <button className="sound-btn active" >
                    <i className="fa sound-icon fa-volume-up" aria-hidden="true"></i>
                    <i className="fa fa-music deco" aria-hidden="true"></i>
                  </button>
                </div>
               <div className="bal-container">
                 {
                   this.props.authenticated ? (
                    <div className="after-login active">
                      <ul className="al-ul sidebar-right">
                          <button className="sb-close-btn"><i className="fa fa-window-close" aria-hidden="true"></i> 닫기</button>
                          <li>
                              <div className="labels">
                                  <i className="icon icon-User"></i>
                                  <p>아이디</p>
                              </div>
                              <div className="info">
                                  <p>{user.id}<span>님</span></p>
                              </div>
                          </li>
                     
                          <li>
                              <div className="labels">
                                  <i className="icon icon-Bag"></i>
                                  <p>게임머니</p>
                              </div>
                              <div className="info">
                                  <p id="_top_game_money">{ConverMoeny(this.state.balance)}</p>
                              </div>
                          </li>
                          <li>
                              <div className="labels">
                                  <i className="icon icon-Bag"></i>
                                  <p>쪽지</p>
                              </div>
                              <div className="info" onClick={()=>   this.handleSetState(popupView.note)}>
                                  <p id="_top_game_money">{ConverMoeny(this.props.user.noteCount)}</p>
                              </div>
                          </li>
                          
                          <li style={{display: 'none'}}>
                              <div className="labels">
                                  <i className="icon icon-Star"></i>
                                  <p>금고</p>
                              </div>
                              <div className="info">
                                  <p id="_top_point">0</p>
                              </div>
                          </li>
                          <li style={{display: 'none'}}>
                              <div className="labels">
                                  <i className="icon icon-Tag"></i>
                                  <p>보유쿠폰</p>
                              </div>
                              <div className="info">
                                  <p>3000 <span>개</span></p>
                              </div>
                          </li>
                          <li className="btn-grp">
                              <div className="mess-notif">
                                  <a onClick={()=>{window.location.reload()}} className="mess-icon" data-toggle="modal" data-target=".customerModal">

                                      <i className="fa fa-bell" aria-hidden="true"></i>
                                  </a>
                              </div>

                              <button className="logout-btn" onClick={()=> this.props.tryLoginOut()}><i className="icon icon-PowerOff"></i> 로그아웃</button>
                          </li>
                      </ul>
                  </div>
                   ) : (
                    <div className="before-login active">
                        <div className="desktop">
                            <button data-toggle="modal" data-target=".loginModal"  onClick={() => { this.setState({popupStatuses: popupView.login});}}><i className="fa fa-edit" aria-hidden="true"></i> 로그인</button>
                        </div>
                    </div>
                   )
                 }
           
               
                   </div>
            </div>
        </div>
        <div className="header-bottom">
            <div className="container">
                <ul className={this.state.openSide? 'bs-ul main-menu sidebar-left active' : 'bs-ul main-menu sidebar-left'}  >
                    <li>
                        <a onClick={()=>{ window.location.reload() }}>게임리스트</a>
                    </li>
                    <li>
                        <a onClick={()=>{ this.handleSetState(popupView.deposit) }}>입금신청</a>
                    </li>
                    <li>
                        <a onClick={()=>{ this.handleSetState(popupView.withdraw) }}>출금신청</a>
                    </li>
                    <li>
                        <a onClick={()=>{ this.handleSetState(popupView.point) }}>금고</a>
                    </li>
                    <li>
                        <a onClick={()=>{ this.handleSetState(popupView.notice) }}>공지사항</a>
                    </li>
                    {/* <li>
                        <a onClick={()=>{ this.handleSetState(popupView.even) }}>이벤트</a>
                    </li> */}
                    <li>
                        <a onClick={()=>{ this.handleSetState(popupView.edit) }}>마이페이지</a>
                    </li>
                    <li>
                        <a onClick={()=>{ this.handleSetState(popupView.help) }}>고객센터</a>
                    </li>
                </ul>
                <div className="bal-container">
                  <div className="before-login h-100 active">
                    <div className="desktop h-100">
                    {
                      !this.props.authenticated  && (
                        <button className="join-btn" data-toggle="modal" data-target=".joinModal" onClick={()=>{ this.handleSetState(popupView.reg) }}><img src="/last/image/logo/controller.png" /> 회원가입</button>
                      )
                    }
                    </div>
                    {
                      !this.props.authenticated  && (
                        <div className="mobile">
                            <button data-toggle="modal" data-target=".loginModal" onClick={()=>{ this.handleSetState(popupView.login) }}><i className="fa fa-edit" aria-hidden="true"></i> 로그인</button>
                            <button data-toggle="modal" data-target=".joinModal" onClick={()=>{ this.handleSetState(popupView.reg) }}><i className="fa fa-user-plus" aria-hidden="true"></i> 회원가입</button>
                        </div>)
                    }

                    {
                      this.props.authenticated  && (
                        <div className="mobile">
                            <button data-toggle="modal" data-target=".loginModal" style={{width : '24%'}}><i className="fa  fa-user" aria-hidden="true"></i> {user.id}</button>
                            <button data-toggle="modal" data-target=".loginModal" style={{width : '24%'}} onClick={()=>   this.handleSetState(popupView.note)}><i className="fa  fa-user" aria-hidden="true"></i> 쪽지함</button>
                            <button data-toggle="modal" data-target=".joinModal" style={{width : '24%'}}><i className="fa fa-user-plus" aria-hidden="true"></i> {ConverMoeny(this.state.balance)}</button>
                            <button data-toggle="modal" data-target=".joinModal" style={{width : '24%'}}  onClick={()=>   this.props.tryLoginOut()}>로그아웃</button>
                        </div>)
                    }

                    </div>
                  </div>
           

             
            </div>
        </div>

        {RenderPopup()}  
    </header>


    );
  }
}

topBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let TopBar = withStyles(styles, { withTheme: true })(topBar);
export default TopBar;
