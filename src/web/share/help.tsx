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
import { ThreeDRotationSharp } from "@material-ui/icons";

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

  doReadMessage = async (id : any)=>{
    await this.userService.do_help_message_read(id)
  }

  doDelAll = async ()=>{
    await this.userService.del_all_help()

    window.location.reload()
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

    console.log(helps)

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

          
  <div className="modal noticeModal fade show" style={{display: 'block', paddingRight: '17px'}} aria-modal="true" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            {/* <img className="logo-modal" src="./last/image/logo/logo-footer.png" alt="" /> */}
            <div className="modal-header">
                <div className="title text-left">
                    <h5>고객센터</h5>
                    <span>Q/A</span>
                </div>
                <button className="close-btn" data-dismiss="modal" onClick={()=>{this.props.handleClose()}} ></button>
            </div>
            <div className="modal-body">

                <div className="terms-use">
                    <div className="text-cont">
                        <div className="inner">
                            <p><span style={{fontSize: '11pt'}}><b><span style={{color: 'rgb(0, 158, 37)', fontSize:'14pt'}}>1. 각종 문의는 고객센터로 문의바랍니다</span>
                            <span style={{fontSize: '11pt'}}>. &nbsp;</span></b></span></p>
                            <p><span style={{fontSize: '14pt', color: 'rgb(255, 170, 0)'}}><b>2. 안전과 보안상 고객센터 문의/답변은 일주일이 지나면 자동 삭제 됩니다.</b></span></p>
                            <p><span style={{fontSize: '14pt', color: 'rgb(81, 143, 187)'}}><b>3. 입출금 또는 게임관련 문의를 제외한 회사비방 및 욕설 등의 문의는 일체 답변 드리지 않습니다.</b></span></p>
                            <p><b><span style={{fontSize: '14pt'}}>&nbsp;</span><span style={{fontSize: '14pt'}}>​</span></b></p>
                        </div>
                    </div>
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

                      {helps.map((row: any) => {
                        return (
                          <>
                            
                              <tr className="" onClick={()=>{
                                this.setState({detail : row, mode :  helpView.detail})
                                this.doReadMessage(row._id)}}
                              >
                              <td className="td_subject " style={{color : row.title_color}}>{row.title}</td>
                              <td className="td_name sv_use hidden visible-lg text-center" style={{width:'15%'}}><span>관리자</span></td>
                              <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.regDate)}</td>
                              </tr>
                          {

                                this.state.detail != null && this.state.detail._id != null && this.state.detail._id === row._id && (
                                  <tr className="dropdown">
                                      <td colSpan={3} >
                                          <div className="mess-cont" style={{display: 'block'}}>
                                              <div className="inner">
                                                <div dangerouslySetInnerHTML={{ __html: this.state.detail.contents }}></div>        
                                              </div>
                                          </div> 
                                          {

                                            this.state.detail != null && this.state.detail.ref != null && (
                                              <div className="mess-cont" style={{display: 'block', fontSize : '26px'}}>
                                              <div className="inner" style={{ fontSize : '18px'}}>
                                                <div dangerouslySetInnerHTML={{ __html: this.state.detail.ref.contents }}></div>        
                                              </div>
                                            </div>

                                            )


                                          }
                          
                                      </td>
                                    </tr>
                              )

                          }
                          </>

                        )
                      })}

      
                    </tbody>
                </table>

                <div className="form-head mt-3">
                    <span className="title"><i className="fa fa-volume-control-phone" aria-hidden="true"></i> 문의하기</span>
                </div>

                <div className="deposit-ask">
                    <button className="sendMsg()">
                        <i className="icon icon-Info"></i>
                        <span>입금계좌문의</span>
                    </button>
                    <p>* 입금시 꼭 계좌문의를 하세요!</p>
                </div>

                <div className="form-container">
                    <div className="form-group no-label">
                        <div className="infos">
                                         <textarea placeholder="내용입력" name="question"
                                          value={this.state.contents}
                                          onChange={(e) =>
                                            this.setState({
                                              contents: e.target.value,
                                            })
                                          } 
                                         ></textarea>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <div className="btn-grp">
                        <button type="button" onClick={() => { this.handleSaveHelp('문의', this.state.contents);}}><i className="fa fa-check-square-o" aria-hidden="true"></i> 전송</button>
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
