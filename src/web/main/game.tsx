import React, { Component } from "react";

import Moment from "moment";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { makeStyles, withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import CircularProgress from "@material-ui/core/CircularProgress";

import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import Timer from "react-compound-timer";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import WifiIcon from "@material-ui/icons/Wifi";
import Switch from "@material-ui/core/Switch";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
// import CountUp from 'react-countup';

// import Iframe from "react-iframe";

import {
  ConvertDate,
  ConverMoeny,
  ConvertBalanceStateToText,
  GetTimeStemp
} from "../../utility/help";

import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

import { FxService } from "../../service/fx.service";
import { UserService } from "../../service/user.service";
import { MiniService } from "../../service/mini.service";

import { TopBar } from "../share/topBar";
import { AniSlider } from "../share/ani-slider";
import { Footer } from "../share/footer";

import { Companylist } from "../share/companylist";
import { BalanceList } from "../share/balancelist";
import { BalanceService } from "../../service/balance.service";


// import { ConverStatus, ConverBuySell, ConverMoeny } from "../utility/help";

const drawerWidth = 240;

const styles = (theme: any) => ({
  root: {
    display: "flex",
  },
  paper: {
    paddingTop: 110,
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

const CustomBetButton = styled(Button)`
  width: 24%;
  font-size: 10px;

  box-shadow: inset 0px 1px 0px 0px #f9eca0;
  background: linear-gradient(to bottom, #f0c911 5%, #f2ab1e 100%);
  background-color: #f0c911;
  border-radius: 6px;
  border: 1px solid #e65f44;
  display: inline-block;
  cursor: pointer;
  color: #c92200;
  font-family: Arial;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ded17c;
`;

const CustomList = styled(List)`
  box-shadow: inset 0px 1px 0px 0px #cf866c;
  background: linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
  background-color: #d0451b;
  border-radius: 3px;
  border: 1px solid #942911;
  color: #ffffff;
  font-family: Arial;
  font-size: 12px;
  margin-top: 12px;
`;

const CustomTableCell = styled(TableCell)`
  color: white;
  width: 24%;
  font-size: 10px;
  padding: 5px;
`;

// const CustomCardContent = styled(Typography)``;

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

  start : number
  end :number
  deposits : any
}

class game extends Component<Props, State> {
  divElement: any;
  static propTypes: { classes: PropTypes.Validator<object> };
  // fxService = new FxService();
  // userService = new UserService();
  miniService = new MiniService();
  balanceService = new BalanceService();

  constructor(props: Props) {
    super(props);
    this.state = {
      deposits : [],
      start : (GetTimeStemp() / 1000) % 100000000,
      end : ((GetTimeStemp() / 1000) % 100000000)+ 1, 
    };

    
    setInterval(() => {
      this.setState({
        start : (GetTimeStemp() / 1000) % 100000000,
        end : ((GetTimeStemp() / 1000) % 100000000 )+ 1, 
        })
    }, 2000);
    
     
    this.balanceService.get_balance_deposit_lock().then((s) => {
      if (s.status === "success") {
         this.setState({ deposits: s.deposits.slice(0, 6) });
      }
    });
  }

  componentDidMount() {
    if (this.divElement != null) {
      this.setState({});
    }
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

  // updateMiniHistroy = (page: any) => {
  //   this.miniService.getMiniGameBetList(page).then((s: any) => {
  //     if (s.status === "success") {
  //       this.setState({ history: s.minis });
  //     }
  //   });
  // };

  updateNowDate = (currency: string, minute: number) => {};

  updateGameDate = (currency: string, minute: number) => {};

  handleDobet = (episode: string) => {};

  render() {
    // if (this.state.minis == null) {
    //   return <></>;
    // }
    // let episode = this.state.minis.episode;

    return (
      <div>
      <div className="wrapper">
        
          <TopBar 
            tryLogin={this.props.tryLogin}
            tryLoginOut={this.props.tryLoginOut}
            user={this.props.user}
            authenticated={this.props.authenticated}
          ></TopBar>

          <section className="banner-section">

          <div className="background-images">
              <img className="glow-left" src="/last/image/main/glow-left.png" />
              <img className="glow-right" src="/last/image/main/glow-right.png" />
              <img className="girl" src="/last/image/main/girl.png" />
              <img className="caishen" src="/last/image/main/caishen.png" />
          </div>
      </section>
    
    {<Companylist></Companylist>}



    <section className="board-section">
    <div className="board-pane">
        <div className="header">
            <p>파워 메가 슬롯 공지</p>
        </div>
        <table>
                    </table>
    </div>
    <div className="board-pane withdraw">
        <div className="header">
            <p>실시간 출금리스트</p>
        </div>
        <div className="rolling-realtime" style={{overflow: 'hidden', position: 'relative', height: '110px'}}>
            <ul style={{position: 'absolute', margin: '0px', padding: '0px', top: '-2.64302px'}}>
                {
                  this.state.deposits.map((s : any) => (
                     <li className="tr" style={{margin: '0px', padding: '0px', height: '22px'}}>
                       <div className="user">
                           <span className="bullet"></span>
                           <span>{s.id}</span>
                       </div>
                       <div className="amount">
                        <span>{ConverMoeny(s.balance)}</span>
                       </div>
                       <div className="date">
                           <span>{ConvertDate(s.regdate)}</span>
                       </div>
                   </li>
                  ))
                }
                   </ul>
                  </div>
              </div>
              <div className="board-pane service">
                  <div className="header">
                      <p>24시 고객서비스센터</p>
                  </div>
                  <div className="service-content">
                      <a href="https://www.google.co.kr/chrome/browser/desktop/" className="dl-link">
                          <img src="/last/image/main/chrome.png" alt="" />
                          <p className="mt-4 mb-0">크롬다운로드</p>
                      </a>
                      <a href="https://get.adobe.com/kr/flashplayer/" className="dl-link">
                          <img src="/last/image/main/flash.png" alt="" />
                          <p className="mt-4 mb-0">플래시다운로드</p>
                      </a>
                      <div className="info text-left ml-md-auto">
                          <p>원활한 게임서비스를 위해서
                              크롬 및 플래시를 다운로드를
                              받으세요. 더 궁금한 사항은
                              고객센터로 문의바랍니다.</p>
                          <button ><img src="/last/image/main/arrow.png" alt="" /> 고객센터문의하기</button>
                      </div>
                  </div>
              </div>
          </section>
          

              <div className="sn-overlay"></div>
          </div>

      </div>
    );
  }
}

game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Game = withStyles(styles, { withTheme: true })(game);
export default Game;

// export default withStyles(styles)(Game);
///C:\WORK\pw-yun\src\web\main\pw.tsx
// export default withStyles(useStyles)(Game);
