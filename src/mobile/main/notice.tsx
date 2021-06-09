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

export enum EvenView {
  none = "none",
  write = "write",
  view = "view",
  detail = "detail",
}


interface Props {
  classes: any;
  authenticated: boolean;

  session: any;
  user: any;

  tryLogin: (id: any, pw: any) => any;
  tryLoginOut: () => any;
}

interface State {
  mode : string 

  notices : any
  detail : any
  
}

class notice extends Component<Props, State> {
  divElement: any;
  static propTypes: { classes: PropTypes.Validator<object> };
  miniService = new MiniService();
  balanceService = new BalanceService();
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = {
      mode : EvenView.view,
      notices : [],
      detail : {},
    };

    this.handleGetNotices()
  }

  componentDidMount() {

  }

  handleGetNotices = () => {
    this.userService.get_user_notices().then((data: any) => {
      console.log(data);
      if (data.status === "success") {
        this.setState({ notices: data.notices });
      }
    });
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
              <div className="title">공지사항</div>
            </div>
              <div className="con_box05">

                {
                  this.state.mode === EvenView.view && (
                    <table  style={{width : '100%'}}>
                      <tbody>
                      <tr>
                          <td className="list_title1">제목</td>
                          <td className="list_title1" style={{width : '30%'}}>작성일</td>
                      </tr>
      
                      {
                        this.state.notices.map((row: any) => (
                        <tr onClick={()=>{this.setState({detail : row, mode :  EvenView.detail})}}>
                          <td className="list2">{row.title}</td>
                          <td className="list2" style={{width : '30%'}}>{ConvertDate(row.regDate)}</td>
                        </tr>
                        ))
                      }
                      </tbody>
                    </table>
                  )
                }

                {
                  this.state.mode === EvenView.detail && (
                      <table  className="write_title_top" style={{width : '100%'}}>
                        <tbody>
                        <tr>
                          <td className="view1">{this.state.detail.title}</td>
                        </tr>
                        <tr>
                          <td className="view1 font03">
                            <span className="view_box">글쓴이</span>운영자 &nbsp; <span className="view_box">작성일</span> {ConvertDate(this.state.detail.regdate)}
                          </td>
                        </tr>
                        <tr>
                          <td className="view2">
                            <div dangerouslySetInnerHTML={{ __html: this.state.detail.contents }}></div>
                          </td>
                        </tr>
                        </tbody>
                    </table>

                    )
                }
                
                
                {
                  this.state.mode === EvenView.detail && (
                    <div className="con_box10">
                      <table style={{width : '100%'}}>
                      <tbody>
                      <tr>
                        <td style={{width : '10%'}}>
                          <a  onClick={()=>{this.setState({mode :  EvenView.view})}}><span className="m_btn2">목록</span></a>
                        </td>
                      </tr>
                      </tbody>
                      </table>
                    </div>
                )
                }


            
              </div>

            </div>
          </div>

          <Footer />
        </div>
      // <div>
      // <TopBar
      //     tryLogin={this.props.tryLogin}
      //     tryLoginOut={this.props.tryLoginOut}
      //     user={this.props.user}
      //     authenticated={this.props.authenticated}
      //   ></TopBar>


      //   <div className="contents_wrap">
      //     <div className="contents_box">
      //     <div id="title_wrap">
      //       <div className="title">공지사항</div>
      //     </div>
      //       <div className="con_box05">
      //           <table  style={{width : '100%'}}>
      //           <tbody>
      //           <tr>
      //               <td  className="list_title1" style={{width : '15%'}}>
      //                   번호
      //               </td>
      //               <td className="list_title1">
      //                   제목
      //               </td>
      //               <td className="list_title1" style={{width : '20%'}}> 
      //                   작성일
      //               </td>
          
      //           </tr>
      //               {
      //                 this.state.notices.map((notice : any)=> (
      //                   <tr>
      //                     <td className="list_title1">{notice.title}</td>
      //                     <td className="list_title1" style={{width : '20%'}}>{ConvertDate(notice.regDate)}</td>
      //                   </tr>
      //                 ))
      //               }
        
      //           </tbody>
      //           </table>
      //       </div>

      //     </div>
      //   </div>

      //   <Footer />
      // </div>
    );
  }
}

notice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Notice = withStyles(styles, { withTheme: true })(notice);
export default Notice;
