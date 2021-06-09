import React, { Component } from "react";

import styled from "styled-components";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  createMuiTheme,
  makeStyles,
  withStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
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
import Pagination from "@material-ui/lab/Pagination";

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

// const styles = (theme: Theme) =>
//   createStyles<
//     | "paperRoot"
//     | Extract<PaginationClassKey, "colorInheritCurrent" | "colorInheritOther">,
//     Record<string, unknown>
//   >({
//     paperRoot: {
//       margin: theme.spacing(2),
//       padding: theme.spacing(2),
//     },
//     colorInheritCurrent: {
//       color: deepOrange.A200,
//       "&:hover": {
//         backgroundColor: fade(
//           deepOrange.A200,
//           theme.palette.action.hoverOpacity
//         ),
//       },
//     },
//     colorInheritOther: {
//       color: green["500"],
//       "&:hover": {
//         backgroundColor: fade(green["500"], theme.palette.action.hoverOpacity),
//       },
//     },
//   });
interface Props {
  classes: any;
  session: any;
  user: any;
}

interface State {
  balances: any;
  maxCount: number;
  page: number;
}

class depositandwithdraw extends Component<Props, State> {
  static propTypes: { classes: PropTypes.Validator<object> };
  balanceService = new BalanceService();

  constructor(props: Props) {
    super(props);
    this.state = {
      balances: [],
      maxCount: 1,
      page: 1,
    };
  }

  componentDidMount() {
    this.handleBalance(1);
  }

  handleBalance = (skip: number) => {
    // this.balanceService.get_deposit_and_withdraw(skip).then((data: any) => {
    //   if (data.status === "success") {
    //     this.setState({
    //       balances: data.balances,
    //       maxCount: data.maxCount === 0 ? 1 : data.maxCount,
    //     });
    //   }
    // });
  };

  render() {
    const balances = this.state.balances;

    const classes = this.props.classes;

    return (
      <React.Fragment>
        {/* <div className="header_wrap">
          <TopBar user={this.props.user}></TopBar>
        </div> */}

        <div className="contents_wrap">
          <div className="contents_box">
            <div className="con_box00">
              <div className="m_tab_wrap">
                <ul>
                  <li>
                    <a
                      onClick={() => {
                        window.location.hash = "mypage";
                      }}
                    >
                      <span className="m_tab">회원정보</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        window.location.hash = "depositandwithdraw";
                      }}
                    >
                      <span className="m_tabon">입금출 기록</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        window.location.hash = "note";
                      }}
                    >
                      <span className="m_tab">쪽지함</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="con_box05">
              <table className="write_title_top" style={{ width: "100%" }}>
                <tr>
                  <td className="list_title1">날짜</td>
                  <td className="list_title1">타입</td>
                  <td className="list_title1">금액</td>
                  <td className="list_title1">상태</td>
                </tr>
                {balances.map((s: any) => {
                  return (
                    <tr>
                      <td className="list1">{ConvertDate(s.regdate)}</td>
                      <td className="list1">
                        <span className="font05">
                          {s.type === "deposit" ? "충전" : "환전"}
                        </span>
                      </td>
                      <td className="list1">
                        <span className="font05">{ConverMoeny(s.balance)}</span>
                        원
                      </td>
                      <td className="list1">
                        {s.status === "already"
                          ? "완료"
                          : s.status === "cansel"
                          ? "취소"
                          : "신청"}
                      </td>
                    </tr>

                    // ConvertDate,
                    // ConverMoeny,
                  );
                })}
              </table>
            </div>
            <div className="con_box05">
              <Pagination
                count={Math.ceil(this.state.maxCount / 10)}
                variant="outlined"
                shape="rounded"
                onChange={(e: any, page: number) => {
                  this.handleBalance(page);
                }}
              />
            </div>
          </div>
        </div>

        <CssBaseline />

        <Footer />
      </React.Fragment>
    );
  }
}

depositandwithdraw.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let DepositAndWithdraw = withStyles(
  {},
  { withTheme: true }
)(depositandwithdraw);
export default DepositAndWithdraw;
