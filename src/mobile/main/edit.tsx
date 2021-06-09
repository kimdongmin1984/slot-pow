
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
 
}

class edit extends Component<Props, State> {
  divElement: any;
  static propTypes: { classes: PropTypes.Validator<object> };
  miniService = new MiniService();
  balanceService = new BalanceService();
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = {

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


  render() {
    const classes = this.props.classes;

    const user = this.props.user

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
                    <div className="title">정보수정</div>
                </div>

                <div id="contents_wrap">
                    <div className="contents_box">
                        <div className="contents_start1">
                            <div className="contents_start2">
                                <div className="con_box10">
                                    <table  className="write_title_top" style={{width : '100%'}}>
                                    <tbody>
                                    <tr>
                                        <td className="write_title">
                                    ID
                                </td>
                                <td className="write_basic">
                                    <input className="input1" value={user.id} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td className="write_title">
                                    비밀번호
                                </td>
                                <td className="write_basic">
                                    * 비밀번호 변경시 고객센터에 문의 바랍니다.
                                </td>
                            </tr>
                            <tr>
                                <td className="write_title">
                                    예금주
                                </td>
                                <td className="write_basic">
                                    <input className="input1 userName" readOnly  value={user.bankowner} />
                                </td>
                                </tr>
                                <tr>
                                    <td className="write_title">
                                        은행명
                                    </td>
                                    <td className="write_basic">
                                        <input className="input1 userBankName" readOnly  value={user.bankname} />
                                    </td>
                                </tr>
                            <tr>
                                <td className="write_title">
                                    계좌번호
                                </td>
                                <td className="write_basic">
                                    <input className="input1 userAccountNumber"readOnly value={user.banknum}  />
                                </td>
                            </tr>
                            </tbody>
                            </table>
                        </div>
                     
                    </div>
                </div>
            </div>
        </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

edit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Edit = withStyles(styles, { withTheme: true })(edit);
export default Edit;
// import React, { Component } from "react";

// import styled from "styled-components";

// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import CardContent from "@material-ui/core/CardContent";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

// import Card from "@material-ui/core/Card";
// import PropTypes from "prop-types";
// import Paper from "@material-ui/core/Paper";
// // import Iframe from "react-iframe";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { Footer } from "../share/footer";

// import {
//   ConvertDate,
//   ConverMoeny,
//   ConvertBalanceStateToText,
// } from "../../utility/help";

// import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

// import { FxService } from "../../service/fx.service";
// import { UserService } from "../../service/user.service";
// import { BalanceService } from "../../service/balance.service";

// import { TopBar } from "../share/topBar";
// import { BetBtn } from "../share/bet-btn";
// import { MiniService } from "../../service/mini.service";
// import { colors } from "@material-ui/core";

// const drawerWidth = 240;

// const styles = (theme: any) => ({
//   root: {
//     display: "flex",
//     backgroundColor: "#424242",
//   },
//   paper: {
//     paddingTop: 100,
//   },

//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     backgroundColor: "#fff",
//     color: "#000",
//   },

//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerContainer: {
//     overflow: "auto",
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   title: {
//     flexGrow: 1,
//     alignSelf: "flex-end",
//     display: "inline",
//     padding: "10px",
//     fontSize: "16px",
//   },
//   investing: {
//     fontSize: "18px",
//   },
// });

// const CustomCardContent = styled(CardContent)`
//   padding: 0px;
// `;

// const CustomButton = styled(Button)`
//   width: 29%;
//   font-size: 11px;
//   margin: 4px;
// `;

// // const classes = useStyles();

// interface Props {
//   classes: any;
//   user: any;
// }

// interface State {
//   pass1: any;
//   pass2: any;
// }

// class mypage extends Component<Props, State> {
//   divElement: any;
//   static propTypes: { classes: PropTypes.Validator<object> };
//   userService = new UserService();

//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       pass1: "",
//       pass2: "",
//     };
//   }

//   componentDidMount() {}

//   updateUserDate = () => {
//     // this.userService.getUserInfo().then((ss) => {
//     //   if (ss.status === "success") {
//     //     this.setState({ user: ss.user });
//     //   }
//     // });
//   };

//   handleDoExchange = () => {
//     if (
//       this.state.pass1 !== this.state.pass2 ||
//       this.state.pass1 !== "" ||
//       this.state.pass1.length <= 3 ||
//       this.state.pass1.length >= 20
//     ) {
//       confirmAlert({
//         title: "회원정보",
//         message: "비밀번호를 확인해주세요.",
//         buttons: [
//           {
//             label: "확인",
//             onClick: () => {},
//           },
//         ],
//       });
//       return;
//     }
//     confirmAlert({
//       title: "회원정보",
//       message: "비밀번호를 변경하시겠습니까?",
//       buttons: [
//         {
//           label: "확인",
//           onClick: () => {
//             this.userService
//               .user_exchange_to_pass(this.state.pass1)
//               .then((data) => {
//                 if (data.status === "success") {
//                   confirmAlert({
//                     title: "입금",
//                     message: "입금 신청이 완료되습니다.",
//                     buttons: [
//                       {
//                         label: "확인",
//                         onClick: () => {
//                           window.location.reload();
//                         },
//                       },
//                     ],
//                   });
//                 } else {
//                   confirmAlert({
//                     title: "예러...",
//                     message: "로그인을 확인해주세요.",
//                     buttons: [
//                       {
//                         label: "확인",
//                         onClick: () => {
//                           window.location.reload();
//                         },
//                       },
//                     ],
//                   });
//                 }
//               });
//           },
//         },
//         {
//           label: "취소",
//           onClick: () => {},
//         },
//       ],
//     });
//     return;
//   };

//   render() {
//     return (
//       <React.Fragment>
//         {/* <div className="header_wrap">
//           <TopBar user={this.props.user}></TopBar>
//         </div> */}

//         <div className="contents_wrap">
//           <div className="contents_box">
//             <div className="con_box00">
//               <div className="m_tab_wrap">
//                 <ul>
//                   <li>
//                     <a
//                       onClick={() => {
//                         window.location.hash = "mypage";
//                       }}
//                     >
//                       <span className="m_tabon">회원정보</span>
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       onClick={() => {
//                         window.location.hash = "depositandwithdraw";
//                       }}
//                     >
//                       <span className="m_tab">입금출 기록</span>
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       onClick={() => {
//                         window.location.hash = "note";
//                       }}
//                     >
//                       <span className="m_tab">쪽지함</span>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="con_box05">
//               <table className="write_title_top">
//                 {/* <tr>
//                   <td className="write_title">이전 비밀번호</td>
//                   <td className="write_basic">
//                     <input className="input1" />
//                   </td>
//                 </tr> */}
//                 <tr>
//                   <td className="write_title">새 비밀번호</td>
//                   <td className="write_basic">
//                     <input
//                       className="input1"
//                       value={this.state.pass1}
//                       onChange={(e: any) => {
//                         this.setState({ pass1: e.target.value });
//                       }}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="write_title">새 비밀번호 확인</td>
//                   <td className="write_basic">
//                     <input
//                       className="input1"
//                       value={this.state.pass2}
//                       onChange={(e: any) => {
//                         this.setState({ pass2: e.target.value });
//                       }}
//                     />
//                   </td>
//                 </tr>
//               </table>
//             </div>
//             <div className="con_box05">
//               <div className="btn_wrap_center">
//                 <ul>
//                   <li>
//                     <a
//                       onClick={() => {
//                         this.handleDoExchange();
//                       }}
//                     >
//                       <span className="btn3_1">수정</span>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         <CssBaseline />

//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

// mypage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export let MyPage = withStyles(styles, { withTheme: true })(mypage);
// export default MyPage;
