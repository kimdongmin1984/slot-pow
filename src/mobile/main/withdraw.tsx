import React, { Component } from "react";

import styled from "styled-components";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
// import Iframe from "react-iframe";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Footer } from "../share/footer";

import {
  ConvertDate,
  ConverMoeny,
  ConvertBalanceStateToText,
} from "../../utility/help";

import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

import { FxService } from "../../service/fx.service";
import { UserService } from "../../service/user.service";
import { BalanceService } from "../../service/balance.service";

import { TopBar } from "../share/topBar";
import { BetBtn } from "../share/bet-btn";
import { MiniService } from "../../service/mini.service";
import { SlotService } from "../../service/slot.service";

import { colors } from "@material-ui/core";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";


const drawerWidth = 240;

const styles = (theme: any) => ({
  root: {
    display: "flex",
    backgroundColor: "#424242",
  },
  paper: {
    paddingTop: 100,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
    color: "#000",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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

const CustomCardContent = styled(CardContent)`
  padding: 0px;
`;

const CustomButton = styled(Button)`
  width: 29%;
  font-size: 11px;
  margin: 4px;
`;

// const classes = useStyles();

interface Props {
  classes: any;
  authenticated: boolean;

  session: any;
  user: any;

  tryLogin: (id: any, pw: any) => any;
  tryLoginOut: () => any;
}

interface State {
  id : any;
  userName : any;
  userBankName: any;
  userAccountNumber: any;

  balance : number
  inBalance : number
  
  
  
}

class withdraw extends Component<Props, State> {
  divElement: any;
  static propTypes: { classes: PropTypes.Validator<object> };
  miniService = new MiniService();
  balanceService = new BalanceService();
  userService = new UserService();
  slotService = new SlotService();
  
  
  constructor(props: Props) {
    super(props);
    this.state = {
      id :  '',
      userName :  '',
      userBankName:  '',
      userAccountNumber: '',
      balance : 0,
      inBalance : 0,
      
     
  
    };
  }

  componentDidMount() {

    this.balanceService.getDepositList().then((data: any) => {
      if (data.status === "success") {
      }
    });
  }

  createData = (
    name: any,
    balnce: any,
    fat: any,
    maxBalanceCount: any,
    carbs: any,
    protein: any
  ) => {
    return {
      name,
      balnce,
      fat,
      maxBalanceCount,
      buyCount: 0,
      sellCount: 0,
      carbs,
      protein,
    };
  };

  updateUserDate = () => {
    // this.userService.getUserInfo().then((ss) => {
    //   if (ss.status === "success") {
    //     this.setState({ user: ss.user });
    //   }
    // });
  };
  
  handleUpdateInBalance = () => {
    this.slotService.get_in_game_balance().then((data: any) => {
      if (data.status === "success") {
        this.setState({
          inBalance: data.balance ?? 0,
        });
      } else {
      }
    });
  };


  handleDoWithdraw = () => {
    if (10000 < this.state.balance % 10000) {
      confirmAlert({
        title: "??????",
        message: "????????? ?????? ????????? ???????????????.",
        buttons: [
          {
            label: "??????",
            onClick: () => {},
          },
        ],
      });
      return;
    }
    if (this.state.balance < 10000) {
      confirmAlert({
        title: "??????",
        message: "??????????????? ??????????????????.",
        buttons: [
          {
            label: "??????",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    this.balanceService.applyUserWithdrawV3(this.state.balance).then((data) => {
      console.log(data);
      if (data.status === "success") {
        confirmAlert({
          title: "??????",
          message: "??????????????? ?????????????????????.",
          buttons: [
            {
              label: "??????",
              onClick: () => {

              },
            },
          ],
        });
        return;
      } else if (data.status === "balance") {
        confirmAlert({
          title: "??????",
          message: "???????????? ???????????? ????????????????????? ????????????.",
          buttons: [
            {
              label: "??????",
              onClick: () => {},
            },
          ],
        });
        return;
      } else if (data.status === "wait") {
        confirmAlert({
          title: "??????",
          message: "???????????? ??????????????? ????????????.",
          buttons: [
            {
              label: "??????",
              onClick: () => {},
            },
          ],
        });
        return;
      } else {
        confirmAlert({
          title: "??????",
          message:
            "???????????? ????????? ????????????????????? ????????? ??????????????? ??????????????? ?????? ????????????.",
          buttons: [
            {
              label: "??????",
              onClick: () => {},
            },
          ],
        });
      }
    });
  };

  RenderDepositTable = (rows: any) => {
    return (
      <Grid container spacing={1}>
        {/* <Grid item xs={2}></Grid> */}

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="a dense table"
              style={{ backgroundColor: "#484848" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">?????? ??????</TableCell>
                  <TableCell align="right">?????? ???</TableCell>
                  <TableCell align="right">??????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row.name}>
                    <TableCell align="right">
                      {ConverMoeny(row.balance)}
                    </TableCell>
                    <TableCell align="right">
                      {ConvertDate(row.regdate)}
                    </TableCell>
                    <TableCell align="right">
                      {ConvertBalanceStateToText(row.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  };

  render() {
    const classes = this.props.classes;

    return (

      <div>
      <TopBar
          tryLogin={this.props.tryLogin}
          tryLoginOut={this.props.tryLoginOut}
          user={this.props.user}
          authenticated={this.props.authenticated}
        ></TopBar>


        <div className="contents_wrap">
          <div className="contents_box">
          <div id="title_wrap">
            <div className="title">
              
				????????????	   
				   
            </div>
          </div>
          <div className="con_box05">
            <div className="info_wrap">
                <div className="info2">????????????</div>
                <div className="info3">
                - ?????? ?????? 5???????????? ??????????????? ?????? ??????????????????.<br/>
                - ????????? ???????????? ?????? ??????????????? ???????????????.
                </div>
            </div>
        </div>
        <div className="con_box05">
			<div className="info_wrap">
        <div className="info2" style={{textAlign:'center'}}><span className="ww_font">?????????</span> 
          <img src="/mo/images/ww_icon.png" height="30" style={{ paddingTop: '10px'}}  onClick={()=>this.handleUpdateInBalance()} /> 
                <input className="input3 walletBalance" id="balance_offer" readOnly  value={this.state.inBalance} />  ???</div>
        </div>
		</div>
            <div className="con_box00">
              <table className="write_title_top" style={{    width: '100%'}}>
                <tr>
                  <td className="write_title">ID</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.props.user.id}
                      readOnly
                    />
               
                  </td>
                </tr>
                <tr>
                  <td className="write_title">????????????</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.props.user.bankowner}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="write_title">????????????</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.props.user.bankname}
                      readOnly
                      
                    />
                  </td>
                </tr>
                <tr>
                  <td className="write_title">??????????????????</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.props.user.banknum}
                      readOnly
                    />
                    <br/>
                    ??????????????? ????????? ??????,?????? ????????? ??????????????? ????????? ??????????????? ??????????????? ???????????? ????????????.
                  </td>
                </tr>
             
                <tr>
                  <td className="write_title">????????????</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.state.balance}

                      onChange={(e: any) => {
                        this.setState({ balance: e.target.value });
                      }}
                    />

                      <table style={{width: '100%'}}>
                            <tbody><tr>
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 10000 }); }} ><span className="m_btn1">1??????</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 50000 }); }}  ><span className="m_btn1">5??????</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 100000 }); }}  ><span className="m_btn1">10??????</span></a></td>                
                            </tr>            
                            <tr>
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 500000 }); }}  ><span className="m_btn1">50??????</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 1000000 }); }}  ><span className="m_btn1">100??????</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 5000000 }); }}  ><span className="m_btn1">500??????</span></a></td>
                            </tr>
                            <tr>
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 10000000 }); }}  ><span className="m_btn1">1000??????</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 15000000 }); }}  ><span className="m_btn1">1500??????</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: 0 }); }}  ><span className="m_btn2">??????</span></a></td>
                            </tr>                
                        </tbody></table>
                  </td>
                </tr>

     
              </table>
            </div>
            <div className="con_box05">
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <a
                      onClick={() => this.handleDoWithdraw()}
                    >
                      <span className="m_btn3">??????????????????</span>
                    </a>
                  </td>
            
                </tr>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

withdraw.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Withdraw = withStyles(styles, { withTheme: true })(withdraw);
export default Withdraw;
