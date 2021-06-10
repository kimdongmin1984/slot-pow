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
import { Point } from "./point";



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

      if((user == null || user.id == '' || user.id == null)  && this.state.popupStatuses != popupView.none)
      {
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

      if (this.state.popupStatuses === popupView.point) {
        return <Point 
        user={this.props.user}
          handleClose={this.handleClosePopup}       ></Point>;
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
              </span><br />
            <a onClick={() => { this.setState({popupStatuses: popupView.user,});}} className="fade_1_open" data-popup-ordinal="6" id="open_75076113"><img src="/web/images/top_btn_003.png" /></a> 
            <a  onClick={() => { this.setState({popupStatuses: popupView.edit,});}} className="fade_3_open" data-popup-ordinal="0" id="open_55563334"><img src="/web/images/top_btn_005.png" /></a>
            <a onClick={() => {
               this.props.tryLoginOut();
               window.location.reload();
             }}><img src="/web/images/top_btn_004.png" /></a>

          </div>
        </div>

      );
    };

    return (
      <>
      
      <div className="cg_top">
		
		
		<div className="nav_main">
			<div className="center">
				<div className="logo">
					<div><a href="/"><img src="/webk/image/logo.png" className="picaz" title="" /></a></div>
				</div>

				<button className="mobile_menu"><i className="fa fa-bars"></i></button>

				<div className="links_main">
					<div className="links_mobile_cont">
						<div className="sidenav_head">
							<p></p>
							<button className="close_sidenav"><i className="fa fa-close"></i></button>
						</div>
						<div className="mobile_al">
							<div data-toggle="modal" data-target=".mypageModal" data-type="1">
								<img className="level" src="http://ks0801.com/theme/bootstrap_basic/res/images/icon/level/level_vip.png" />
								<p></p>
							</div>
							<div data-toggle="modal" data-target=".mypageModal" data-type="5" id="_btn_memo">
								<i className="fa fa-envelope"></i>
								<p>0</p>
							</div>
							<div data-toggle="modal" data-target=".mypageModal" data-type="2">
								<i className="fa fa-krw"></i>
								<p className="_has_cash">0</p>
							</div>
							<div >
								<i className="fa fa-recycle"></i>
								<p>게임머니</p>
								<p className="_has_reel_point">0</p>
							</div>
							<div id="returnPoint">
								<i className="fa fa-product-hunt"></i>
								<p>머니회수</p>
							</div>
							<div data-toggle="modal" data-target=".mypageModal" data-type="4">
								<i className="fa fa-comment"></i>
								<p>1:1문의</p>
							</div>
							<div className="logout_btn" >
								<i className="fa fa-sign-out"></i>
								<p>로그아웃</p>
							</div>
						</div>

						<div className="cont" style={{paddingLeft: '30px', paddingRight: '30px',}}>
							<span >
              {
                this.props.authenticated ?( <a onClick={() => { this.setState({popupStatuses: popupView.point,});}} ><img src="/webk/image/menu_5.png" /></a> )
                : ( <a onClick={()=>{ 
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
                }} ><img src="/webk/image/menu_5.png" /></a> )
              }
									<p style={{color : 'rgb(125, 133, 148)'}}>금고</p>
								</span>
						</div>
						<div className="cont" style={{paddingLeft: '30px', paddingRight: '30px',}}>
							<span >
              {
                this.props.authenticated ?( <a onClick={() => { this.setState({popupStatuses: popupView.deposit,});}} ><img src="/webk/image/menu_1.png" /></a> )
                : ( <a onClick={()=>{ 
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
                }} ><img src="/webk/image/menu_1.png" /></a> )
              }
								<p>입금신청</p>
							</span>
						</div>
						<div className="cont" style={{paddingLeft: '30px', paddingRight: '30px',}}>
							<span >

              {
                this.props.authenticated ?( <a  onClick={() => { this.setState({popupStatuses: popupView.withdraw,});}}><img src="/webk/image/menu_2.png" /></a> )
                : ( <a onClick={()=>{ 
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
                }} ><img src="/webk/image/menu_2.png" /></a> )
              }
								<p>출금신청</p>
							</span>
						</div>
						<div className="cont" style={{paddingLeft: '30px', paddingRight: '30px',}}>
							<span >
              {
                this.props.authenticated ?( <a onClick={() => { this.setState({popupStatuses: popupView.help,});}}><img src="/webk/image/menu_3.png" /></a> )
                : ( <a onClick={()=>{ 
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
                }} ><img src="/webk/image/menu_3.png" /></a> )
              }


								<p>FAQ</p>
							</span>
						</div>
						<div className="cont" style={{paddingLeft: '30px', paddingRight: '30px',}}>
							<span >

              {
                this.props.authenticated ?( <a  onClick={() => { this.setState({popupStatuses: popupView.notice,});}}><img src="/webk/image/menu_4.png" /></a> )
                : ( <a onClick={()=>{ 
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
                }} ><img src="/webk/image/menu_4.png" /></a> )
              }

								<p  style={{color: ' rgb(125, 133, 148)'}}>공지사항</p>
							</span>
						</div>
												

					</div>
				</div>
          <div className="_real_notice_out">
						<div className="_real_notice">
							<div style={{display: 'block-inline', width: '700px', height: '24px', overflow: 'hidden'}}>
                <div style={{float: 'left', whiteSpace: 'nowrap', padding: '0px 700px'}}>
                  {/* <marquee>입금 계좌를 꼭 1대1상담란에 문의하시고 입금 바랍니다.</marquee> */}
																															
                  <span className="_space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
								</div>
              </div>
						</div>
					</div>

					{
          this.props.authenticated != true && (
          <div className="login_panel">
            <div className="input">
              <div><i className="fa fa-user"></i></div>
              <input type="text" name="mb_id" id="ol_id" placeholder="아이디"
                      value={this.state.ID}
                      onChange={(e: any) => {
                        this.setState({ ID: e.target.value });
                      }}
              />
            </div> 
            <div className="input">
              <div><i className="fa fa-key"></i>
            </div>
              <input type="password" name="mb_password" id="ol_pw" placeholder="비밀번호" 
                value={this.state.PW}
                onChange={(e: any) => {
                  this.setState({ PW: e.target.value });
                }}
              />
            </div>
              <button className="login_btn" id="ol_submit"  onClick={()=>{ this.props.tryLogin(this.state.ID, this.state.PW)}} >로그인</button>
              <button type="button" data-toggle="modal"    onClick={() => {
                          this.setState({
                            popupStatuses: popupView.reg,
                          });
                        }}>회원가입</button>
          </div>
          )}
	
			</div>
		</div>
				<div className="casino_slot_toggle">
			<div className="cont">
				<img className="border" src="/webk/image/jackpot_border.png" />
				<button className="casino_btn">
					<img src="/webk/image/casino_btn_on.png" />
					<img src="/webk/image/casino_btn.png" />
				</button>
				<img className="deco" src="/webk/image/line_cs_toggle.png" />
				<button className="slot_btn active">
					<img src="/webk/image/slot_btn_on.png" />
					<img src="/webk/image/slot_btn.png" />
				</button>
			</div>
</div>
	</div>
{/* 
      
      <div id="header_wrap">
        <div className="util_wrap">
          <div className="header_box">
            <div className="util_left">
              <img src="/web/images/top_icon.png" />&nbsp;&nbsp;&nbsp;필독! 입금신청시 계좌 확인 필수 입니다.
            </div>
            <a href="./" className="bs-logo" style={{display: 'block'}}>
              <img src="/web/images/logo.gif"  />
              <img src="/web/images/logo.png"  />
            </a>

            
            {RenderLogin()}
          </div>
        </div>
          <div className="gnb_wrap">
            <div className="gnb">
              <ul>
                <li><a  onClick={() => { this.setState({popupStatuses: popupView.deposit,});}}><img src="/web/images/gnb01.png" /> 입금신청</a></li>
                <li><a  onClick={() => { this.setState({popupStatuses: popupView.withdraw,});}}><img src="/web/images/gnb02.png" /> 출금신청</a></li>
                <li><a  onClick={() => { this.setState({popupStatuses: popupView.coupon});}}><img src="/web/images/gnb04.png" /> 쿠폰발급현황</a></li>
                <li><a  onClick={() => { this.setState({popupStatuses: popupView.even});}}><img src="/web/images/gnb06.png" /> 이벤트</a></li>
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
           {RenderPopup()} */}
    {RenderPopup()} 
       </>

    );
  }
}

topBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let TopBar = withStyles(styles, { withTheme: true })(topBar);
export default TopBar;
