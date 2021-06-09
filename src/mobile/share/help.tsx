import React, { Component } from "react";
import styled from "styled-components";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import { confirmAlert } from "react-confirm-alert"; // Import
import Typography from "@material-ui/core/Typography";

import { UserService } from "../../service/user.service";

import { ConvertDate, HelpStatus, ConvertDate2 } from "../../utility/help";

export enum helpView {
  none = "none",
  write = "write",
  view = "view",
}

const CustomTableCell = styled(TableCell)`
  color: white;
  padding: 4px;
`;

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  let ref = "";
  if (row.ref != null) {
    ref = row.ref.contents;
  }

  const RenderRef = () => {
    if (ref != null && ref !== "") {
      return (
        <Box margin={1}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            color={"secondary"}
          >
            답변
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: ref }}></div>
        </Box>
      );
    }
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root} key={row._id}>
        <CustomTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </CustomTableCell>
        <CustomTableCell align="center" onClick={() => setOpen(!open)}>
          {row.title}
        </CustomTableCell>
        <CustomTableCell align="center">
          {ConvertDate(row.regDate)}
        </CustomTableCell>
        <CustomTableCell align="center">
          {HelpStatus(row.status)}
        </CustomTableCell>
      </TableRow>
      <TableRow>
        <CustomTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div dangerouslySetInnerHTML={{ __html: row.contents }}></div>
            </Box>

            {RenderRef()}
          </Collapse>
        </CustomTableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props {
  handleClose: () => any;
}

interface State {
  helps: any;
  mode: string;

  title: string;
  contents: string;
}

export class Help extends Component<Props, State> {
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = { helps: [], mode: helpView.view, title: "", contents: "" };
    this.handleGetNotices();
  }

  componentDidMount() {
  }

  handleGetNotices = () => {
    this.userService.get_help_list().then((data: any) => {
      console.log(data);
      if (data.status === "success") {
        this.setState({ helps: data.helps });
      }
    });
  };

  // handleGetHelpList = () => {
  //   this.userService.get_user_notices().then((data: any) => {
  //     if (data.status === "success") {
  //       this.setState({ notices: data.notices });
  //     }
  //   });
  // };

  handleSaveHelp = (title: string, contents: string) => {
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

    this.props.handleClose();
  };

  render() {
    let helps = this.state.helps;

    const RenderView = () => {
      if (this.state.mode !== helpView.view) {
        return <></>;
      }
      return (
        <div className="mo_con_box10">
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="a dense table"
              style={{ backgroundColor: "#484848" }}
            >
              <TableHead>
                <TableRow>
                  <CustomTableCell align="center"></CustomTableCell>
                  <CustomTableCell align="center">제 목</CustomTableCell>
                  <CustomTableCell align="center">작성일</CustomTableCell>
                  <CustomTableCell align="center">상태</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {helps.map((row: any) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="mo_btn_wrap_center">
            <ul>
              <li>
                <a
                  onClick={() => {
                    this.setState({ mode: helpView.write });
                  }}
                >
                  <span className="mo_btn3_1">글쓰기</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    };

    const RenderWrite = () => {
      if (this.state.mode !== helpView.write) {
        return <></>;
      }

      return (
        <div>
          <div className="mo_con_box10">
            <table className="mo_write_title_top">
              <tbody>
                <tr>
                  <td className="mo_write_title">제목</td>
                  <td className="mo_write_basic">
                    <input
                      name="textfield2"
                      type="text"
                      className="mo_input1"
                      onChange={(e) =>
                        this.setState({
                          title: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="mo_write_title">내용</td>
                  <td className="mo_write_basic">
                    <textarea
                      className="mo_input1"
                      rows={10}
                      onChange={(e) =>
                        this.setState({
                          contents: e.target.value,
                        })
                      }
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mo_btn_wrap_center">
              <ul>
                <li
                  onClick={() => {
                    this.setState({ mode: helpView.view });
                  }}
                >
                  <span className="mo_btn3_1">뒤로가기</span>
                </li>
                <li
                  onClick={() => {
                    this.setState({ mode: helpView.write });
                  }}
                >
                  <span
                    className="mo_btn3_1"
                    onClick={() => {
                      this.handleSaveHelp(
                        this.state.title,
                        this.state.contents
                      );
                    }}
                  >
                    저장하기
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };
    return (
      <Popup
        // key={`main_popup_note_${pop.idx}`}
        open={true}
        contentStyle={{
          zIndex: 99999,
          background: "none",
          border: "none",
          width: "none",
        }}
        onClose={() => {}}
      >
        {(close) => (
          <div className="mo_fade_1_1">
            <div className="mo_close_wrap">
              <div className="mo_close_box">
                <a
                  className="mo_fade_1_1_close"
                  onClick={() => {
                    this.props.handleClose();
                  }}
                >
                  <img src="/web/images/close.png" />
                </a>
              </div>
            </div>
            <div className="mo_popup_wrap">
              <div className="mo_popup_box">
                <div className="mo_popup_start">
                  <div className="mo_popup">
                    <div className="mo_title_wrap">
                      <div className="mo_title">
                        고객센터 <span className="mo_title2">Help</span>{" "}
                        <span>
                          <img src="/web/images/logo.png" width="120" />
                        </span>
                      </div>
                    </div>

                    {RenderView()}
                    {RenderWrite()}
                  </div>
                </div>
              </div>
            </div>
          </div>


        )}
      </Popup>
    );
  }
}
