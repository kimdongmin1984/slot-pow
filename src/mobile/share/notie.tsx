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

import { UserService } from "../../service/user.service";

import { ConvertDate } from "../../utility/help";

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
        <CustomTableCell align="center">{ConvertDate(row.row)}</CustomTableCell>
      </TableRow>
      <TableRow>
        <CustomTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div
                style={{
                  height: "400px",
                  overflowY: "scroll",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: row.contents }}></div>
              </div>
            </Box>
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
  notices: any;
}

export class Notie extends Component<Props, State> {
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = { notices: [] };
  }

  componentDidMount() {
    this.handleGetNotices();
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
    let notices = this.state.notices;
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
          <div className="mo_fade_3_1">
            <div className="mo_close_wrap">
              <div className="mo_close_box">
                <a
                  className="mo_fade_3_1_close"
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
                        공지사항 <span className="mo_title2">Notice</span>{" "}
                        <span>
                          <img src="/web/images/logo.png" width="120" />
                        </span>
                      </div>
                    </div>

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
                              <CustomTableCell align="center">
                                제 목
                              </CustomTableCell>
                              <CustomTableCell align="center">
                                작성일
                              </CustomTableCell>
                              <CustomTableCell align="center">
                                상태
                              </CustomTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {notices.map((row: any) => (
                              <Row key={row.name} row={row} />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
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
