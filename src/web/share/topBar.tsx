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
import { Even } from "./even";
import { Coupon } from "./coupon";
import { Edit } from "./edit";
import { Message } from "./message";


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
  message= "message",
  
  
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

  postCount: number;

  note: any;
  isOpen: boolean;

  popupStatuses: string;
}



// const RenderCss = ()=>{

//   var head  = document.getElementsByTagName('head')[0];

//   var link  = document.createElement('link');
//   link.rel  = 'stylesheet';
//   link.type = 'text/css';
//   link.href = '/web/css/logo.css';
//   link.media = 'all';
//   head.appendChild(link);
// } 

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
    if(this.state.popupStatuses === popupView.message){
      return 
    }
    
    this.userService.get_user_note().then((data: any) => {
      if (data.status === "success") {

        if(data.count > 0){
          this.handleSetState(popupView.message)
        }

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

  handleSetState = (state: string)=>{
    this.setState({popupStatuses: state})
  }

  handleClosePopup = () => {
    this.setState({ popupStatuses: popupView.none });
  };

  render() {
    const classes = this.props.classes;
    const user = this.props.user;
    const authenticated = this.props.authenticated;

    const RenderPopup = () => {
      
      

      if (this.state.popupStatuses === popupView.reg) {
        return <Reg handleClose={this.handleClosePopup}></Reg>;
      }
      
      if (this.state.popupStatuses === popupView.login) {
        return <Login handleClose={this.handleClosePopup} tryLogin={this.props.tryLogin}></Login>;
      }

      if((user == null || user.id == '' || user.id == null)  && this.state.popupStatuses != popupView.none && this.state.popupStatuses != popupView.message ){
        confirmAlert({
          title: '로그인 이후 사용가능합니다.',
          buttons: [
            {
              label: '확인',
              onClick: () => { },
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
        return <Notie 
          handleClose={this.handleClosePopup}
          handleActive={this.handleSetState}        ></Notie>
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
        user={this.props.user}
          handleClose={this.handleClosePopup}       ></Edit>;
      }

      if (this.state.popupStatuses === popupView.message) {
        return <Message 
        user={this.props.user}
        handleClose={this.handleClosePopup} 
        handleActive={this.handleSetState}        ></Message>;
      }
      
      
      return <div></div>;
    };

    const RenderLogin = () => {
      if (authenticated === false) {
        return (      
        <div className="util_right">
          <div className="my">
            <a onClick={() => { this.setState({popupStatuses: popupView.login});}} className="fade_2_open" data-popup-ordinal="0" ><img src="/web/images/top_btn_001.png" /></a> 
            <a onClick={() => { this.setState({popupStatuses:  popupView.reg});}} className="fade_3_open" data-popup-ordinal="0" ><img src="/web/images/top_btn_002.png" /></a>
          </div>
        </div>

        );
      }

      return (
        <div className="util_right">
          <div className="my_a">
            <span style={{margin:'0 0 10px 0', display:'inline-block'}}>
              <span style={{lineHeight:'15px', display:'table', float:'left', paddingTop:'5px', fontWeight:'bold', fontSize:'15px'}}>
                <img src={`/web/images/icon4_${user.level}.png`} style={{width : '24px'}} />
              </span>&nbsp;&nbsp;
              <span className="font07">{user.id}</span> 님&nbsp;&nbsp;지갑 : 
              <span className="font05" id="myWallet"> {ConverMoeny(this.state.balance)}</span>
              <a onClick={() => { this.handleUpdateInBalance();}}><img src="/web/images/icon_re.png" className="icon_re" /></a>
              <span style={{fontSize: '14px' , marginLeft : '10px'}}>새로고침 해주세요.</span>

              </span><br />
            <a onClick={() => { this.setState({popupStatuses: popupView.user,});}} className="fade_1_open" data-popup-ordinal="6" id="open_75076113"><img src="/web/images/top_btn_003.png" /></a> 
            <a onClick={() => { this.setState({popupStatuses: popupView.edit,});}} className="fade_3_open" data-popup-ordinal="0" id="open_55563334"><img src="/web/images/top_btn_005.png" /></a>
            <a onClick={() => {
               this.props.tryLoginOut();
               window.location.reload();
             }}>
               <img src="/web/images/top_btn_004.png" />
             </a>

          </div>
        </div>

      );
    };

    return (
      <>
      
      <div id="header_wrap">
        <div className="util_wrap">
          <div className="header_box">
            <div className="util_left">
              <img src="/web/images/top_icon.png" />&nbsp;&nbsp;&nbsp;필독! 입금신청시 계좌 확인 필수 입니다.
            </div>
            <a href="./" className="bs-logo" style={{display: 'block'}}>
              {/* <img src="/web/images/logo_01.png"  /> */}
              <img src="/web/images/logo_02.png"  />
              {/* <img src="/web/images/logo_03.png" />
              <img src="/web/images/logo_04.png"  />
              <img src="/web/images/logo_05.png"  /> */}
            </a>

            
            {RenderLogin()}
          </div>
        </div>
          <div className="gnb_wrap">
            <div className="gnb">
              <ul>
                <li><a  onClick={() => { this.setState({popupStatuses: popupView.deposit,});}}><img src="/web/images/gnb01.png" /> 입금신청</a></li>
                <li><a  onClick={() => { this.setState({popupStatuses: popupView.withdraw,});}}><img src="/web/images/gnb02.png" /> 출금신청</a></li>
                {/* <li><a  onClick={() => { this.setState({popupStatuses: popupView.coupon});}}><img src="/web/images/gnb04.png" /> 쿠폰발급현황</a></li> */}
                {/* <li><a  onClick={() => { this.setState({popupStatuses: popupView.even});}}><img src="/web/images/gnb06.png" /> 이벤트</a></li> */}
                <li><a  onClick={() => { this.setState({popupStatuses: popupView.notice,});}}><img src="/web/images/gnb07.png" /> 공지사항</a></li>
                <li><a  onClick={() => { this.setState({popupStatuses: popupView.help,});}}><img src="/web/images/gnb05.png" /> 고객센터</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="visual_ling_2"></div>

        <div className="visual_wrap">
          <div className="visual">
            <div className="jack_wrap">
              <div className="jack_tit">
              </div>
              <div className="jack_num" style={{height:'50px'}}>

              </div>

              <div style={{width:'1000px', height: '180px', overflow: 'hidden', position: 'relative'}}>
                <table id="realtimeWithdraw" style={{marginLeft:'370px',position:'absolute'}}></table>
              </div>

            </div>
            <div className="container demo-2">
              <div id="slider" className="sl-slider-wrapper">
                <div className="sl-slider" style={{width: '1170px', height: '392px'}}>
                  <div className="sl-slides-wrapper"><div className="sl-slide sl-slide-horizontal" data-orientation="horizontal" data-slice1-rotation="-25" data-slice2-rotation="-25" data-slice1-scale="2" data-slice2-scale="2" style={{display: 'block'}}>
                    <div className="sl-content-wrapper" style={{width: '1170px', height: '392px'}}><div className="sl-content"><div className="sl-slide-inner">
                      <div className="bg-img bg-img-1"></div>
                    </div></div></div>
                  </div></div>
                </div>
                <nav id="nav-dots" className="nav-dots">
                  <span className="nav-dot-current"></span>
                  <span></span>
                  <span></span>
                </nav>
              </div>
            </div>	
          </div>
          
        </div>
        <div className="visual_ling_2"></div>
           {RenderPopup()}

       </>

      // <div className="header_wrap">
      //   {RenderLogin()}
      //   <div className="gnb">
      //     <div>
      //       <div>
      //         <div
      //           className="fade_1_1_open slide_open"
      //           onClick={() => {
      //             this.setState({
      //               popupStatuses: popupView.deposit,
      //             });
      //           }}
      //         >
      //           입금신청
      //         </div>
      //       </div>
      //       <div>
      //         <img src={"/web/images/gnb_line.png"} />
      //       </div>
      //       <div>
      //         <div
      //           className="fade_2_1_open"
      //           onClick={() => {
      //             this.setState({
      //               popupStatuses: popupView.withdraw,
      //             });
      //           }}
      //         >
      //           출금신청
      //         </div>
      //       </div>
      //       <div>
      //         <img src="/web/images/gnb_line.png" />
      //       </div>
      //       <div>
      //         <div
      //           className="fade_3_1_open"
      //           onClick={() => {
      //             this.setState({
      //               popupStatuses: popupView.help,
      //             });
      //           }}
      //         >
      //           고객센터
      //         </div>
      //       </div>
      //       <div>
      //         <img src="/web/images/gnb_line.png" />
      //       </div>
      //       <div>
      //         <div
      //           className="fade_5_1_open"
      //           onClick={() => {
      //             this.setState({
      //               popupStatuses: popupView.user,
      //             });
      //           }}
      //         >
      //           마이페이지
      //         </div>
      //       </div>
      //       <div>
      //         <img src="/web/images/gnb_line.png" />
      //       </div>
      //       <div>
      //         <div
      //           className="fade_6_1_open"
      //           onClick={() => {
      //             this.setState({
      //               popupStatuses: popupView.notice,
      //             });
      //           }}
      //         >
      //           공지사항
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="notice_wrap">
      //     {/* <div className="notice_box">
      //       <img src="/web/images/notice_title.png" /> 안녕하십니까? 카지노에
      //       오신것을 진심으로 환영합니다.{" "}
      //       <span className="font05">
      //         입금 계좌는 수시로 변경되오니 입금전 꼭 계좌번호를 고객센터로 문의
      //       </span>
      //       해 주시기 바랍니다.
      //     </div> */}
      //   </div>

      //   {RenderPopup()}
      // </div>
    );
  }
}

topBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let TopBar = withStyles(styles, { withTheme: true })(topBar);
export default TopBar;
