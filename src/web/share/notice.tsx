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
import { SubMenu } from "./submenu";


import { ConvertDate, HelpStatus, ConvertDate2 } from "../../utility/help";

export enum NotieView {
  none = "none",
  write = "write",
  view = "view",
  detail = "detail",
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

interface Props {
  handleClose: () => any;
  handleActive: (active:string) => any;

}

interface State {
  notices: any;
  mode : string;
  detail : any;
}

export class Notice extends Component<Props, State> {
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = { notices: [] , mode : NotieView.view, detail : {}};

    this.handleGetNotices();

  }

  componentDidMount() {
  }

  handleGetNotices = () => {
    this.userService.get_user_notices().then((data: any) => {
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
          zIndex: 999,
          background: "#000",
          border: "none",
          width: "none",
        }}
        onClose={() => {}}
      >
        {(close) => (

          <div className="modal noticeModal fade show" style={{display: 'block', paddingRight: '17px'}} aria-modal="true" role="dialog">
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                      {/* <img className="logo-modal" src="./last/image/logo/logo-footer.png" alt="" /> */}
                      <div className="modal-header">
                          <div className="title text-left">
                              <h5>공지사항</h5>
                              <span>NOTICE</span>
                          </div>
                          <button className="close-btn" data-dismiss="modal" onClick={()=>{this.props.handleClose()}} ></button>
                      </div>
                      <div className="modal-body">
                          <div className="modal-menu">
                              <button className="mm-btn active">공지사항</button>
                              <button className="mm-btn event-link"  onClick={()=>{this.props.handleActive('even')}}>이벤트</button>
                          </div>
                          <table className="bs-table with-depth">
                              <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>날짜</th>
                                    <th></th>
                                </tr>
                              </thead>
                              <tbody>

                                {notices.map((row: any) => {
                                  return (
                                    <>
                                      
                                        <tr className="" onClick={()=>{this.setState({detail : row, mode :  NotieView.detail})}}>
                                        <td className="td_subject text-left" style={{color : row.title_color}}>{row.title}</td>
                                        <td className="td_name sv_use hidden visible-lg text-center" style={{width:'15%'}}><span>관리자</span></td>
                                        <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.regdate)}</td>
                                        </tr>
                                    {

                                          this.state.detail != null && this.state.detail.regdate != null && this.state.detail.regdate === row.regdate && (
                                            <tr className="dropdown">
                                                <td colSpan={3} >
                                                    <div className="mess-cont" style={{display: 'block'}}>
                                                        <div className="inner">
                                                          <div dangerouslySetInnerHTML={{ __html: this.state.detail.contents }}></div>        
                                                        </div>
                                                    </div>
                                                </td>
                                              </tr>
                                        )

                                    }
                                    </>

                                  )
                                })}

                 
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>

        )}
      </Popup>
    );
  }
}
