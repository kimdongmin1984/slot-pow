


import React, { Component } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { confirmAlert } from "react-confirm-alert"; // Import
import { TopBar } from "../share/topBar";
import { Footer } from "../share/footer";

// import { getData, getFxData, getFxNowData } from "../../help/utils";

import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";
// import { ChartComponent } from "./chartcomponent";

import { UserService } from "../../service/user.service";

const drawerWidth = 240;

const styles = (theme: any) => ({
  root: {
    display: "flex",
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

  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
  },
  //   avatar: {
  //     margin: theme.spacing(1),
  //     backgroundColor: theme.palette.secondary.main,
  //   },
  //   form: {
  //     width: "100%", // Fix IE 11 issue.
  //     marginTop: theme.spacing(3),
  //   },
  //   submit: {
  //     margin: theme.spacing(3, 0, 2),
  //   },
});

// const classes = useStyles();

interface Props {
  classes: any;
}

interface State {
  id: string;
  pass: string;
  pass_check: string;
  phone: string;
  bankname: string;
  banknumber: string;
  bankowner: string;
  exchange_pw: string;
  code: string;
}

class reg extends Component<any, State> {
  static propTypes: { classes: PropTypes.Validator<object> };
  userService = new UserService();

  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      pass: "",
      pass_check: "",
      phone: "",
      bankname: "",
      banknumber: "",
      bankowner: "",
      exchange_pw: "",
      code: "",
    };
  }

  componentDidMount() {}

  handleCheck = () => {
    if (
      this.state.id === undefined ||
      this.state.id.length <= 3 ||
      20 <= this.state.id.length
    ) {
      confirmAlert({
        title: "회원 가입",
        message: "아이디를 입력 또는 4자리 이상 20자리 이하로 작성해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    this.userService.regCheckID(this.state.id).then((s: any) => {
      if (s.status === "success") {
        confirmAlert({
          title: "회원 가입",
          message: "사용 할수있는 아이디 입니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
        return;
      } else {
        confirmAlert({
          title: "회원 가입",
          message: "사용 불가능한 아이디 입니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {
                this.setState({ id: "" });
              },
            },
          ],
        });
        return;
      }
    });
  };

  handleReg = () => {
    if (
      this.state.id === undefined ||
      this.state.id.length <= 3 ||
      20 <= this.state.id.length
    ) {
      confirmAlert({
        title: "회원 가입",
        message: "아이디를 입력 또는 4자리 이상 20자리 이하로 작성해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (
      this.state.pass == null ||
      this.state.pass_check == null ||
      this.state.pass !== this.state.pass_check
    ) {
      confirmAlert({
        title: "회원 가입",
        message: "비밀번호를 확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }
    

    if (this.state.phone == null || this.state.phone.length <= 10) {
      confirmAlert({
        title: "회원 가입",
        message: "휴대폰 번호를 확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (this.state.bankname == null) {
      confirmAlert({
        title: "회원 가입",
        message: "은행명을 확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (this.state.banknumber == null) {
      confirmAlert({
        title: "회원 가입",
        message: "계좌 번호를  확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });

      return;
    }

    if (this.state.bankowner == null) {
      confirmAlert({
        title: "회원 가입",
        message: "예금주 이름을 확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });

      return;
    }

    this.userService
      .regUser({
        id: this.state.id,
        pw: this.state.pass,
        pass_check: this.state.pass_check,
        phone: this.state.phone,
        bankname: this.state.bankname,
        banknumber: this.state.banknumber,
        bankowner: this.state.bankowner,
        exchange_pw: this.state.exchange_pw,
        code: this.state.code,
      })
      .then((data: any) => {
        if (data.status === "alread_have_user") {
          confirmAlert({
            title: "회원 가입",
            message: "생성할수 없는 유저아이디 입니다.",
            buttons: [
              {
                label: "확인",
                onClick: () => {},
              },
            ],
          });
          return;
        } else if (data.status === "cant_find_code") {
          confirmAlert({
            title: "회원 가입",
            message: "회원 가입코드를 확인해주세요.",
            buttons: [
              {
                label: "확인",
                onClick: () => {},
              },
            ],
          });

          return;
        } else {
          confirmAlert({
            title: "회원 가입",
            message: "회원 가입에 성공하였습니다.",
            buttons: [
              {
                label: "확인",
                onClick: () => {},
              },
            ],
          });

          return;
        }
      });
  };

  render() {
    const classes = this.props.classes;

    // const { classes } = this.props;

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
            <div className="con_box00">
              <table className="write_title_top">
                <tr>
                  <td className="write_title">회원 아이디</td>
                  <td className="write_basic">
                    <input
                      className="input1"
                      value={this.state.id}
                      onChange={(e: any) => {
                        this.setState({ id: e.target.value });
                      }}
                    />
               
                    (영어또는 숫자조합6~12자리입니다. )
                  </td>
                </tr>
                <tr>
                  <td className="write_title">비밀번호</td>
                  <td className="write_basic">
                    <input
                      className="input1"
                      value={this.state.pass}
                      onChange={(e: any) => {
                        this.setState({ pass: e.target.value });
                      }}
                    />
                    (패스워드는 6자리 이상~16자리 입니다.)
                  </td>
                </tr>
                <tr>
                  <td className="write_title">비밀번호 확인</td>
                  <td className="write_basic">
                    <input
                      className="input1"
                      value={this.state.pass_check}
                      onChange={(e: any) => {
                        this.setState({ pass_check: e.target.value });
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="write_title">전화번호</td>
                  <td className="write_basic">
                    <input
                      className="input1"
                      value={this.state.phone}
                      onChange={(e: any) => {
                        this.setState({ phone: e.target.value });
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="write_title">은행명</td>
                  <td className="write_basic">

                  <select className="input1" name="bankname" id="bankname"  value={this.state.bankname}   onChange={(e: any) => { this.setState({ bankname: e.target.value });}} >
                    <option value="">은행선택</option>
											<option value="기업은행">기업은행</option>
											<option value="국민은행">국민은행</option>
											<option value="외환은행">외환은행</option>
											<option value="수협">수협</option>
											<option value="농협중앙회">농협중앙회</option>
											<option value="단위농협">단위농협</option>
											<option value="우리은행">우리은행</option>
											<option value="SC제일은행">SC제일은행</option>
											<option value="한국씨티은행">한국씨티은행</option>
											<option value="대구은행">대구은행</option>
											<option value="부산은행">부산은행</option>
											<option value="광주은행">광주은행</option>
											<option value="제주은행">제주은행</option>
											<option value="전북은행">전북은행</option>
											<option value="경남은행">경남은행</option>
											<option value="새마을금고">새마을금고</option>
											<option value="신협중앙회">신협중앙회</option>
											<option value="상호저축은행">상호저축은행</option>
											<option value="산림조합중앙회">산림조합중앙회</option>
											<option value="우체국">우체국</option>
											<option value="하나은행">하나은행</option>
											<option value="신한은행">신한은행</option>
											<option value="케이뱅크">케이뱅크</option>
											<option value="카카오뱅크">카카오뱅크</option>
											<option value="유안타증권">유안타증권</option>
											<option value="KB증권">KB증권</option>
											<option value="미래에셋">미래에셋</option>
											<option value="대우증권">대우증권</option>
											<option value="한국투자증권">한국투자증권</option>
											<option value="삼성증권">삼성증권</option>
											<option value="우리투자증권">우리투자증권</option>
											<option value="SK증권">SK증권</option>
											<option value="신한금융투자">신한금융투자</option>
											<option value="하이증권">하이증권</option>
											<option value="HMC증권">HMC증권</option>
											<option value="대신증권">대신증권</option>
											<option value="하나대투증권">하나대투증권</option>
											<option value="동부증권">동부증권</option>
											<option value="유진증권">유진증권</option>
											<option value="메리츠증권">메리츠증권</option>
											<option value="신영증권">신영증권</option>
											<option value="미래에셋증권">미래에셋증권</option>
											<option value="동양증권">동양증권</option>
											<option value="현대증권">현대증권</option>
											<option value="신한금융투자증권">신한금융투자증권</option>
											<option value="주택은행">주택은행</option>
											<option value="산업은행">산업은행</option>
		              </select>
                
                  </td>
                </tr>
                <tr>
                  <td className="write_title">계좌번호</td>
                  <td className="write_basic">
                    <input
                      className="input1"
                      value={this.state.banknumber}
                      onChange={(e: any) => {
                        this.setState({ banknumber: e.target.value });
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="write_title">이름</td>
                  <td className="write_basic">
                    <input
                      className="input1"
                      value={this.state.bankowner}
                      onChange={(e: any) => {
                        this.setState({ bankowner: e.target.value });
                      }}
                    />
                    (이름은 정보와 일치해야합니다.)
                  </td>
                </tr>
                <tr>
                  <td className="write_title">환전비번</td>
                  <td className="write_basic">
                    <input
                      className="input1"
                      value={this.state.exchange_pw}
                      onChange={(e: any) => {
                        this.setState({ exchange_pw: e.target.value });
                      }}
                    />
                    (이름은 정보와 일치해야합니다.)
                  </td>
                </tr>
                <tr>
                  <td className="write_title">추천코드</td>
                  <td className="write_basic">
                    <input
                      className="input1"
                      value={this.state.code}
                      onChange={(e: any) => {
                        this.setState({ code: e.target.value });
                      }}
                    />
                  </td>
                </tr>
              </table>
            </div>
            <div className="con_box05">
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <a
                      onClick={() => {
                        this.handleReg();
                      }}
                    >
                      <span className="m_btn3">확인</span>
                    </a>
                  </td>
                  <td>
                    <a
                      onClick={() => {
                        window.location.hash = "/";
                      }}
                    >
                      <span className="m_btn3">취소</span>
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

reg.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Reg = withStyles(styles, { withTheme: true })(reg);
export default Reg;

// export default withStyles(styles)(Game);

// export default withStyles(useStyles)(Game);



