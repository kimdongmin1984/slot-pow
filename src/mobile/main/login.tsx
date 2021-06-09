import React, { Component, useState } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import { TopBar } from "../share/topBar";
import { Footer } from "../share/footer";
// import { getData, getFxData, getFxNowData } from "../../help/utils";

import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

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
    marginTop: theme.spacing(15),
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
  tryLogin: (id: any, pw: any) => any;
}

interface State {
  ID: string;
  PW: string;
}

export class login extends Component<Props, State> {
  static propTypes: { classes: PropTypes.Validator<object> };

  constructor(props: Props) {
    super(props);
    this.state = {
      ID: "",
      PW: "",
    };
  }

  componentDidMount() {}

  render() {
    const classes = this.props.classes;

    const handleClick = () => {
      try {
        this.props.tryLogin(this.state.ID, this.state.PW);
        window.location.hash = "/";
      } catch (e) {
        alert("Failed to login");
      }
    };

    return (
      <React.Fragment>
        {/* <div className="header_wrap">
          <TopBar user={null}></TopBar>
        </div> */}
        <div className="mo_contents_wrap">
          <div className="mo_contents_box">
            <div className="mo_con_box00">
              <div className="mo_info_wrap2">
                <div className="mo_login_box">
                  <ul>
                    <li>
                      <input
                        name=""
                        type="text"
                        className="mo_input_login"
                        style={{
                          backgroundImage: "url(images/login_className.png)",
                          backgroundRepeat: "no-repeat",
                        }}
                        onChange={(e: any) => {
                          this.setState({ ID: e.target.value });
                        }}
                      />
                    </li>
                    <li style={{ padding: "5px 0 0 0" }}>
                      <input
                        name=""
                        type="text"
                        className="mo_input_login"
                        style={{
                          backgroundImage: "url(images/login_pw.png)",
                          backgroundRepeat: "no-repeat",
                        }}
                        onChange={(e: any) => {
                          this.setState({ PW: e.target.value });
                        }}
                      />
                    </li>
                    <li style={{ padding: "20px 0 0 0" }}>
                      <a
                        onClick={() => {
                          handleClick();
                        }}
                      >
                        <span className="mo_m_btn3">로그인</span>
                      </a>
                    </li>
                    <li style={{ padding: "10px 0 0 0" }}>
                      <a
                        onClick={() => {
                          window.location.hash = "/reg";
                        }}
                      >
                        <span className="mo_m_btn3">회원가입</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Login = withStyles(styles, { withTheme: true })(login);
export default Login;

// export default withStyles(styles)(Game);

// export default withStyles(useStyles)(Game);
