import React, { Component, useState } from "react";

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
import Pagination from "@material-ui/lab/Pagination";

import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
  styled,
} from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TopBar } from "../share/topBar";
import { Footer } from "../share/footer";
import { UserService } from "../../service/user.service";
import { ConvertDate } from "../../utility/help";

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

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: "100%",
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       flexBasis: "33.33%",
//       flexShrink: 0,
//     },
//     secondaryHeading: {
//       fontSize: theme.typography.pxToRem(15),
//       color: theme.palette.text.secondary,
//     },
//   })
// );
//
const NewExpansionPanel = styled(ExpansionPanel)({
  borderBottom: "1px solid #9E9E9E",
});

const NewExpansionPanelSummary = styled(ExpansionPanelSummary)({
  border: 0,
  borderRadius: 3,
  color: "white",
  padding: "none",
});

interface Props {
  classes: any;
  session: any;
  user: any;
}

interface State {
  ID: string;
  PW: string;
  notices: any;
  maxCount: number;
}

export class note extends Component<Props, State> {
  userService = new UserService();

  static propTypes: { classes: PropTypes.Validator<object> };

  constructor(props: Props) {
    super(props);
    this.state = {
      ID: "",
      PW: "",
      notices: [],
      maxCount: 0,
    };
  }

  componentDidMount() {
    this.userService.get_user_notices().then((data: any) => {
      if (data.status === "success") {
        this.setState({ notices: data.notices });
      }
    });
  }

  render() {
    //const [expanded, setExpanded] = React.useState<string | false>(false);

    let notices = this.state.notices;
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
                      <span className="m_tab">입금출 기록</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        window.location.hash = "note";
                      }}
                    >
                      <span className="m_tabon">쪽지함</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="con_box05">
              {notices.map((data: any) => (
                <NewExpansionPanel>
                  <NewExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>
                      <div className="m_list_notice">
                        {data.title}
                        <span className="m_list2">
                          관리자 | {ConvertDate(data.regDate)}
                          <img src="/mo/images/icon_notice.png" />
                        </span>
                      </div>
                    </Typography>
                  </NewExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      <div
                        dangerouslySetInnerHTML={{ __html: data.contents }}
                      ></div>
                    </Typography>
                  </ExpansionPanelDetails>
                </NewExpansionPanel>
              ))}
            </div>
          </div>
        </div>

        <div className="con_box05">
          <Pagination
            count={Math.ceil(this.state.maxCount / 10)}
            variant="outlined"
            shape="rounded"
          />
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

note.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Note = withStyles(styles, { withTheme: true })(note);
export default Note;

// export default withStyles(styles)(Game);

// export default withStyles(useStyles)(Game);
