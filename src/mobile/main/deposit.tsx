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
import { colors } from "@material-ui/core";

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

  
}

class deposit extends Component<Props, State> {
  divElement: any;
  static propTypes: { classes: PropTypes.Validator<object> };
  miniService = new MiniService();
  balanceService = new BalanceService();
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = {
      id :  '',
      userName :  '',
      userBankName:  '',
      userAccountNumber: '',
      balance : 0,
     
  
    };
  }

  componentDidMount() {


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

  handleAskAccount = () => {
    confirmAlert({
      title: "계좌문의",
      message: "통장 문의 를 하시겠습니까?",
      buttons: [
        {
          label: "확인",
          onClick: () => {
            this.userService
              .user_wirte_help("입금계좌문의", "-")
              .then((data) => {
                if (data.status === "success") {
                  confirmAlert({
                    title: "계좌문의",
                    message: "계좌문의 신청이 완료되습니다.",
                    buttons: [
                      {
                        label: "확인",
                        onClick: () => {
                          window.location.reload();
                        },
                      },
                    ],
                  });
                } else {
                  confirmAlert({
                    title: "예러...",
                    message: "로그인을 확인해주세요.",
                    buttons: [
                      {
                        label: "확인",
                        onClick: () => {
                          window.location.reload();
                        },
                      },
                    ],
                  });
                }
              });
          },
        },
        {
          label: "취소",
          onClick: () => {},
        },
      ],
    });
    return;
  };

  handleDoDeposit = () => {
    let balance = this.state.balance;
    if (balance <= 0) {
      confirmAlert({
        title: "입금",
        message: "입금금액을 입력해주세요.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }
    confirmAlert({
      title: "입금",
      message: "입금신청을 하시겠습니까?",
      buttons: [
        {
          label: "확인",
          onClick: () => {
            this.balanceService.applyUserDeposit(balance).then((data) => {
              if (data.status === "success") {
                confirmAlert({
                  title: "입금",
                  message: "입금 신청이 완료되습니다.",
                  buttons: [
                    {
                      label: "확인",
                      onClick: () => {
                        window.location.reload();
                      },
                    },
                  ],
                });
              } else {
                confirmAlert({
                  title: "예러...",
                  message: "로그인을 확인해주세요.",
                  buttons: [
                    {
                      label: "확인",
                      onClick: () => {
                        window.location.reload();
                      },
                    },
                  ],
                });
              }
            });
          },
        },
        {
          label: "취소",
          onClick: () => {},
        },
      ],
    });
    return;
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
                  <TableCell align="right">충전 금액</TableCell>
                  <TableCell align="right">충전 일</TableCell>
                  <TableCell align="right">상태</TableCell>
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
              입금신청	   
            </div>
          </div>
          <div className="con_box05">
            <div className="info_wrap">
                <div className="info2">주의사항</div>
                <div className="info3">
                  - 입금 최소 1만원부터 가능하며 입금전 꼭! 본사의 충전계좌 확인 후 입금바랍니다.<br />
                  - 수표 및 토스입금시 충전처리가 불가합니다.
                </div>
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
                  <td className="write_title">입금자명</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.props.user.bankowner}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="write_title">회원은행</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.props.user.bankname}
                      readOnly
                      
                    />
                  </td>
                </tr>
                <tr>
                  <td className="write_title">회원계좌번호</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.props.user.banknum}
                      readOnly
                    />
                    <br/>
                    회원가입한 정보와 입금,출금 이름이 동일해야만 출금이 가능하오니 확인하시고 신청하기 바랍니다.
                  </td>
                </tr>
                <tr>
                  <td className="write_title">입금계좌</td>
                  <td className="write_basic">
                    <input
                      className="input1 userID"
                      value={this.state.userAccountNumber}
                      readOnly

                      style={{width:'150px',padding:'4px'}}
                    />
                    <span id="bank_call_btn" className="btn1_2" onClick={()=>this.handleAskAccount()} style={{cursor:'pointer'}}>문의</span>
                  </td>
                </tr>
                <tr>
                  <td className="write_title">입금금액</td>
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
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 10000 }); }} ><span className="m_btn1">1만원</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 50000 }); }}  ><span className="m_btn1">5만원</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 100000 }); }}  ><span className="m_btn1">10만원</span></a></td>                
                            </tr>            
                            <tr>
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 500000 }); }}  ><span className="m_btn1">50만원</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 1000000 }); }}  ><span className="m_btn1">100만원</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 5000000 }); }}  ><span className="m_btn1">500만원</span></a></td>
                            </tr>
                            <tr>
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 10000000 }); }}  ><span className="m_btn1">1000만원</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: this.state.balance + 15000000 }); }}  ><span className="m_btn1">1500만원</span></a></td>                
                                <td style={{width: '10%'}} align="center"><a onClick={() => { this.setState({ balance: 0 }); }}  ><span className="m_btn2">정정</span></a></td>
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
                      onClick={() => this.handleDoDeposit()}
                    >
                      <span className="m_btn3">확인</span>
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

deposit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Deposit = withStyles(styles, { withTheme: true })(deposit);
export default Deposit;
