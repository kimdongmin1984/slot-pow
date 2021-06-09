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
  HelpStatus,
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

export enum helpView {
  none = "none",
  write = "write",
  detail = "detail",
  view = "view",
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
  helps : any
  detail : any

  title: string;
  contents: string;
}

class help extends Component<Props, State> {
  divElement: any;
  static propTypes: { classes: PropTypes.Validator<object> };
  miniService = new MiniService();
  balanceService = new BalanceService();
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: helpView.view,
      helps : [],
      detail : {},
      
      title: '',
      contents: ''
    };

    this.handleGetNotices();
  }

  handleGetNotices = () => {
    this.userService.get_help_list().then((data: any) => {
      console.log(data);
      if (data.status === "success") {
        this.setState({ helps: data.helps });
      }
    });
  };


  componentDidMount() {

  }

  

  handleSaveHelp = (title: string, contents: string) => {

    if(title == '' ){
      confirmAlert({
        title: "고객센터",
        message: "타이틀을 입력해주세요.",
        buttons: [
          {
            label: "확인",
            onClick: () => {
              this.handleGetNotices();
            },
          },
        ],
      });
      return 
    }
    if(contents == ''){
      confirmAlert({
        title: "고객센터",
        message: "내용을 입력해주세요.",
        buttons: [
          {
            label: "확인",
            onClick: () => {
              this.handleGetNotices();
            },
          },
        ],
      });
      return 
    }

    this.userService.user_wirte_help(title, contents).then((date: any) => {
      if (date.status === "success") {
        confirmAlert({
          title: "고객센터",
          message: "게시물이 등록되었습니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {
                this.handleGetNotices();
                this.setState({mode :  helpView.view})
              },
            },
          ],
        });
      } else {
        confirmAlert({
          title: "고객센터",
          message: "게시물이 등록되었습니다.",
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

  RenderView = () => {

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
            <div className="title">고객센터</div>
          </div>
            <div className="con_box05">
           


                { 
                  this.state.mode === helpView.view && (

                    <table  style={{width : '100%'}}>
                    <tbody>
                    <tr>
                        <td  className="list_title1" >
                          제목
                        </td>
                        <td className="list_title1" style={{width : '25%'}}>
                        작성일
                        </td>
                        <td className="list_title1" style={{width : '15%'}}> 
                            상태
                        </td>
                    
                    </tr> 
                    {
                      this.state.helps.map((help: any) => (
                          <tr onClick={()=>{this.setState({detail : help, mode :  helpView.detail})}}>
                            <td className="list2">{help.title}</td>
                            <td className="list2" style={{width : '25%'}}>{ConvertDate(help.regDate)}</td>
                            <td  className="list2" style={{width : '15%'}}>{HelpStatus(help.status)}</td>
                          </tr>
                      )) 
                      
                    }
                  
                </tbody>
                </table>
                )
                }

                
                
                { 
                  this.state.mode === helpView.detail && (
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

                        {
                          (this.state.detail.ref != null && this.state.detail.ref.contents != null ) && (
                            <tr>
                              <td className="view2">
                                <div style={{color:'#fff'}}>답변</div>
                                <div dangerouslySetInnerHTML={{ __html: this.state.detail.ref.contents }}></div>
                              </td>
                            </tr>
                          ) 
                          
                        }
                        </tbody>
                    </table>


                    )
                }
                
                { 
                  this.state.mode === helpView.detail && (
                    <div className="con_box10">
                            <table style={{width : '100%'}}>
                            <tbody>
                            <tr>
                              <td style={{width : '10%'}}>
                                <a  onClick={()=>{this.setState({mode :  helpView.view})}}><span className="m_btn2">목록</span></a>
                              </td>
                            </tr>
                            </tbody>
                            </table>
                          </div>
                    
                    )
                }

                { 
                  this.state.mode === helpView.write && (
                    <div id="contents_wrap">
                    <div className="contents_box">
                      <div className="contents_start1">
                        <div className="contents_start2">
                          <div className="con_box10">
                            <table  className="write_title_top" style={{width : '100%'}}>
                            <tbody>
                            <tr>
                              <td className="write_title">
                                제목
                              </td>
                              <td className="write_basic">
                                <input className="input1 " type="text" id="wr_subject" name="wr_subject" placeholder="제목" style={{width : '100%'}}
                                  onChange={(e) => this.setState({title: e.target.value})}
                                  />
                              </td>
                            </tr>
                            <tr>
                              <td className="write_title">
                                내용
                              </td>
                              <td className="write_basic">
                                <textarea id="wr_content" name="wr_content" className="input1 " style={{width:'100%', height:'300px'}}
                                  onChange={(e) => this.setState({contents: e.target.value})}

                                ></textarea>
                              </td>
                            </tr>
                            
                            </tbody>
                            </table>
                          </div>
                          <div className="con_box10">
                            <div className="btn_wrap_center">
                              <ul>
                                <li><a  onClick={() => { this.handleSaveHelp( this.state.title, this.state.contents);}}><span className="btn3_1">등록완료</span></a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                    )
                }
                 {
                  this.state.mode === helpView.view && (
                    <div className="con_box10">
                       <table style={{width : '100%'}}>
                       <tbody>
                       <tr>
                         <td style={{width : '10%'}}>
                           <a  onClick={()=>{this.setState({mode :  helpView.write})}}><span className="m_btn2">글쓰기</span></a>
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
    );
  }
}

help.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Help = withStyles(styles, { withTheme: true })(help);
export default Help;
