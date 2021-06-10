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

export class Notie extends Component<Props, State> {
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
         <div className="eventModal modal fade in" role="dialog" style={{display: 'block', paddingRight: '17px'}} data-key="0">
            <div className="board_modal cg_modal modal-dialog">
              <div className="header">
                <i className="fa fa-exclamation-triangle"></i>
                <p>게시판 <span>BOARD</span></p>
                <button data-dismiss="modal" onClick={()=>this.props.handleClose()}></button>
              </div>
              <div className="modal_body">
                <div className="board_head">
                  <button >
                    <span>
                      FAQ
                    </span>
                  </button>
                  <button className="active">
                    <span>
                      공지사항
                    </span>
                  </button>
                </div>
                <div className="board_event">
                  
                      
            {
              this.state.mode === NotieView.view && (
              <>
                <div className="col-xs-12 zero-padding">
                    <table className="table table-hover text-center bottom-3b _table_n">
                      <caption className="sr-only">faq 목록</caption>
                      <thead>
                        <tr className="bg-primary">
                          <th scope="col" className="text-center">제목</th>
                          <th scope="col" className="hidden visible-lg text-center w100">글쓴이</th>
                          <th scope="col" className="text-center w90"><a className="link-inverse">날짜</a></th>
                        </tr>
                      </thead>
                      <tbody>
                        
                      {notices.map((row: any) => {
                        return (
                          <tr className=""  onClick={()=>{this.setState({detail : row, mode :  NotieView.detail})}}>
                            <td className="td_subject text-left" style={{color : row.title_color}}>{row.title}</td>
                            <td className="td_name sv_use hidden visible-lg text-center" style={{width:'15%'}}><span>관리자</span></td>
                            <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.regdate)}</td>
                          </tr>
                        )
                      })}
              
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="col-xs-12 zero-padding">
                
                
                  <ul className="btn_bo_user list-inline pull-right">
                          <li className="zero-padding"><a href="./write.php?bo_table=faq" className="btn btn-primary link-btn">글쓰기</a></li>
                      </ul>
              </div>
          </>
                  )
    }
          
          
    {
            this.state.mode ===  NotieView.detail && (
              <div style={{    textAlign: 'initial'  ,   overflowY: 'auto', height: '500px', overflowX: 'hidden'}}>
                <div className="_page_contents" style={{    textAlign: 'initial'}}>
                  <div className="col-xs-12">
                      <div className="row h1"><p className="hidden">한줄간격주기</p></div>
                      <div className="col-xs-12">
                          <h4 id="bo_v_title" style={{color : this.state.detail.title_color}}> 
                              <b>{this.state.detail.title }</b>
                          </h4>
                      </div>
                      <div className="col-xs-12">
                          <h2 className="sr-only">페이지 정보</h2>
                          <ul className="list-inline">
                              <li>
                                  <i className="fa fa-fw fa-user"></i>
                                  <span className="sr-only sound_only">작성자</span>
                                  <b><span className="sv_member">관리지</span></b>
                              </li>
                                                  <li>
                                      <i className="fa fa-fw fa-calendar"></i>
                                      <span className="sr-only sound_only">작성일</span>
                                      <b>{ConvertDate(this.state.detail.regdate)}</b>
                                  </li>
                                  {/* <li>
                                      <i className="fa fa-fw fa-eye"></i>
                                      <span className="sr-only sound_only">조회</span>
                                      <b>10회</b>
                                  </li>
                                              <li>
                                  <i className="fa fa-fw fa-comments-o"></i>
                                  <span className="sr-only sound_only">댓글</span>
                                  <b>0건</b>
                              </li> */}
                          </ul>
                      </div>
                    <div className="row h4"><p className="hidden">한줄간격주기</p></div>
                    <div id="bo_v_top" className="col-xs-12 zero-padding" >
                        <div className="row h4"><p className="hidden">한줄간격주기</p></div>
                    <div className="col-xs-12 _bbs_content">
                        <h2 id="bo_v_atc_title" className="sr-only">본문</h2>
            
                        <div id="bo_v_img" className="col-xs-12">
                          <div dangerouslySetInnerHTML={{ __html: this.state.detail.contents }}     ></div>        

            </div>
            
                        
                    </div>
            
                    <div id="bo_v_bot" className="col-xs-12 zero-padding"></div>
                    
                    <ul className="bo_v_com list-inline pull-right">
                      <li className="zero-padding"><a onClick={()=>{ this.setState({ mode : NotieView.view} )}} className="btn btn-default" style={{color : '#000'}}>목록</a></li>
                    </ul>
                  </div>
                </div>
                    
            </div>
            </div>

            )
          }        
                </div>
              </div>
             </div>
          </div>
        )}
      </Popup>
    );
  }
}
