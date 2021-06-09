import React, { Component } from "react";

import styled from "styled-components";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

import {
  ConvertDate,
  ConverMoeny,
  ConvertBalanceStateToText,
} from "../../utility/help";

import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

import { FxService } from "../../service/fx.service";
import { BalanceService } from "../../service/balance.service";

import { TopBar } from "../share/topBar";
import { BetBtn } from "../share/bet-btn";
import { MiniService } from "../../service/mini.service";
import { UserService } from "../../service/user.service";

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

const CustomButton = styled(Button)`
  width: 29%;
  font-size: 11px;
  margin: 4px;
`;

// const classes = useStyles();

interface Props {
  classes: any;
  session: any;
  user: any;
}

interface State {
  user: any;
  minis: any;
  withdraws: any;
  history: any;
  endDate: any;
  minute: number;
  maxCount: number;
  page: number;
  point: number;
}

class point extends Component<Props, State> {
  divElement: any;
  static propTypes: { classes: PropTypes.Validator<object> };
  miniService = new MiniService();
  balanceService = new BalanceService();
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = {
      minis: null,
      history: [],
      withdraws: [],
      minute: 1,
      maxCount: 1,
      endDate: "",
      page: 1,
      point: 0,
      user: {
        balance: 0,
      },
    };
  }

  componentDidMount() {
    // this.miniService.getMiniGameByGameType("pwball").then((s: any) => {
    //   if (s.status === "success") {
    //     this.setState({ minis: s.minis[0] });
    //   }
    // });
    // this.userService.getWithdrawList().then((data: any) => {
    //   if (data.status === "success") {
    //     this.setState({ withdraws: data.deposits });
    //   }
    // });
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

  handleDoDeposit = () => {
    let point = this.state.point;
    if (point <= 0) {
      confirmAlert({
        title: "포인트",
        message: "포인트를 입력해주세요.",
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
      title: "포인트",
      message: "포인트 변환을 하시겠습니까?",
      buttons: [
        {
          label: "확인",
          onClick: () => {
            this.userService.user_chang_to_point().then((data) => {
              if (data.status === "success") {
                confirmAlert({
                  title: "포인트",
                  message: "출금 신청이 완료되습니다.",
                  buttons: [
                    {
                      label: "확인",
                      onClick: () => {
                        window.location.reload();
                      },
                    },
                  ],
                });
              } else if (data.status === "low_point") {
                confirmAlert({
                  title: "포인트",
                  message:
                    "변환할 포인트가 부족합니다 포인트 확인후 신청해주세요.",
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
                  message: "예러가 계속발생되면 관리자에게 문의 부탁드림니다.",
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

  RenderPointTable = (rows: any) => {
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
                  <TableCell align="right">포인트 금액</TableCell>
                  <TableCell align="right">날자</TableCell>
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
    const withdraws = this.state.withdraws;

    return (
      <React.Fragment>
        {/* <TopBar user={this.props.user}></TopBar> */}

        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h6">포인트</Typography>
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}>
              <Typography variant="h6"></Typography>
            </Grid>

            <Grid item xs={10}>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={() => {
                  this.handleDoDeposit();
                }}
              >
                포인트 전환
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>

        <CssBaseline />
        <br />
        <br />

        {this.RenderPointTable(withdraws)}
      </React.Fragment>
    );
  }
}

point.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Point = withStyles(styles, { withTheme: true })(point);
export default Point;
