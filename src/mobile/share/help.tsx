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
import { SubMenu } from "./submenu";

import { UserService } from "../../service/user.service";

import { ConvertDate, HelpStatus, ConvertDate2 } from "../../utility/help";
import { runInThisContext } from "vm";

export enum helpView {
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
  helps: any;
  mode: string;

  title: string;
  contents: string;
  detail: any;
}

export class Help extends Component<Props, State> {
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = { helps: [], mode: helpView.view, title: "", contents: "" , detail : {}};
  }

  componentDidMount() {
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

    return (
      <Popup
        // key={`main_popup_note_${pop.idx}`}
        open={true}
        contentStyle={{
          zIndex: 99,
          background: "#000",
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
                  <button className="active">
                    <span>
                      FAQ
                    </span>
                  </button>
                  <button >
                    <span>
                      공지사항
                    </span>
                  </button>
                </div>
                <div className="board_event">
                  
                      
            {
               this.state.mode === helpView.view && (
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
                        
                      {helps.map((row: any) => {
                        return (
                          <tr className=""  onClick={()=>{this.setState({detail : row, mode :  helpView.detail})}}>
                            <td className="td_subject text-left" style={{color : row.title_color}}>{row.title}</td>
                            <td className="td_name sv_use hidden visible-lg text-center" style={{width:'15%'}}><span>관리자</span></td>
                            <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.regDate)}</td>
                          </tr>
                        )
                      })}
              
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="col-xs-12 zero-padding">
                
                
                  <ul className="btn_bo_user list-inline pull-right">
                          <li className="zero-padding"><a  onClick={()=>{this.setState({detail : {}, mode :  helpView.write})}} className="btn btn-primary link-btn">글쓰기</a></li>
                      </ul>
              </div>
          </>
                  )
        }
          
          
          {
            this.state.mode ===  helpView.detail && (
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
                                  <b><span className="sv_member">{this.state.detail.userId}</span></b>
                              </li>
                              <li>
                                <i className="fa fa-fw fa-calendar"></i>
                                <span className="sr-only sound_only">작성일</span>
                                <b>{ConvertDate(this.state.detail.regDate)}</b>
                              </li>
                           
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
                    <div className="row h4"><p className="hidden">한줄간격주기</p></div>
            

                    <div className="col-xs-12">
                      {
                        this.state.detail.ref != null && (
                          <ul className="list-inline" style={{paddingTop : '20px'}}>
                            <li>
                                <span className="" style={{color : '#ff9800'}}>답변 : </span>
                            </li>
                            <div id="bo_v_img" className="col-xs-12" style={{paddingTop : '20px'}}>
                              <div dangerouslySetInnerHTML={{ __html: this.state.detail.ref.contents }}     ></div>        
                          </div>
                        </ul>

                        )
                      }
                    </div>


                    <div id="bo_v_bot" className="col-xs-12 zero-padding"></div>
                    
                    <ul className="bo_v_com list-inline pull-right">
                      <li className="zero-padding"><a onClick={()=>{ this.setState({ mode : helpView.view} )}} className="btn btn-default" style={{color : '#000'}}>목록</a></li>
                    </ul>
                  </div>
                </div>
                    
            </div>
            </div>

            )
          }        

            {
              this.state.mode ===  helpView.write && (
                <>
                  <div className="panel-body">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row" className="w80 hidden-xs"><label  className="control-label">제목<b className="sr-only sound_only">필수</b></label></th>
                          <td>
                            <p className="hidden visible-xs" id="_wr_subject_title"><label className="control-label">제목<b className="sr-only sound_only">필수</b></label></p>						
                            <div id="autosave_wrapper" className="col-sm-12">
                                <input type="text" name="wr_subject" id="wr_subject"  className="frm_input required form-control"  value={this.state.title}  
                                                      onChange={(e) =>
                                                        this.setState({
                                                          title: e.target.value,
                                                        })
                                                      }
                                />
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row" className="w80 hidden-xs"><label  className="control-label">내용<b className="sr-only sound_only">필수</b></label></th>
                          <td className="wr_content" style={{padding : '20px'}}>
                            <p className="hidden visible-xs"><label className="control-label">내용<b className="sr-only sound_only">필수</b></label></p>
                              <span className="sr-only sound_only">Summernote 시작</span>
                              <textarea id="wr_content" name="wr_content" className=" frm_input required form-control" rows={10} 
                                value={this.state.contents}
                                onChange={(e) =>
                                  this.setState({
                                    contents: e.target.value,
                                  })
                                } 
                              ></textarea>
                              <span className="sr-only sound_only">Summernote 끝</span>											
                          </td>
                        </tr>
                        </tbody>
                        </table>
                      </div>

                      <div className="btn_confirm panel-footer text-center">
                        <input type="submit" value="작성완료" id="btn_submit" className="btn_submit btn btn-danger"   onClick={() => { this.handleSaveHelp( this.state.title, this.state.contents);}}/>
                        <a onClick={() => { this.setState({ mode: helpView.view }); }} className="btn_cancel btn btn-default">취소</a>
                      </div>
                
                </>
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
