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
import { SubMenu } from "./submenu";

import { UserService } from "../../service/user.service";

import { ConvertDate, HelpStatus } from "../../utility/help";

export enum EvenView {
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
  evens: any;
  mode : string;
  detail :any;
}

export class Even extends Component<Props, State> {
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = { evens: [], mode : EvenView.view, detail : {} };

    this.handleGetEvens();

  }

  componentDidMount() {
  }

  handleGetEvens = () => {
    this.userService.get_event_list().then((data: any) => {
      if (data.status === "success") {
        this.setState({ evens: data.evens });
      }
    });
  };

  render() {
    let evens = this.state.evens;
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
          
          <div className="modal noticeModal fade show" style={{display: 'block', paddingRight: '17px'}} aria-modal="true" role="dialog">
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                      {/* <img className="logo-modal" src="./last/image/logo/logo-footer.png" alt="" /> */}
                      <div className="modal-header">
                          <div className="title text-left">
                              <h5>이벤트</h5>
                              <span>Event</span>
                          </div>
                          <button className="close-btn" data-dismiss="modal" onClick={()=>{this.props.handleClose()}} ></button>
                      </div>
                      <div className="modal-body">
                          <div className="modal-menu">
                              <button className="mm-btn event-link"  onClick={()=>{this.props.handleActive('notice')}}>공지사항</button>
                              <button className="mm-btn active" >이벤트</button>
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

                                {evens.map((row: any) => {
                                  return (
                                    <>
                                      
                                        <tr className="" onClick={()=>{this.setState({detail : row, mode :  EvenView.detail})}}>
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

    //    <div  id="fade_2"  className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle'}}>
    //    <div className="popup_wrap">
    //      <div className="close_box">
    //        <a onClick={()=>{this.props.handleClose()}} className="fade_1_close"><img src="/web/images/popup_close.png" /></a>
    //      </div>
    //      <div className="popupbox">

    //      {this.props.handleActive != null && <SubMenu handleActive={(active : string)=>{this.props.handleActive(active)}}></SubMenu> }

     
    //        <div id="popuptab_cont8" className="popuptab_cont popupvis_hidden">
    //  <div className="title1">
    //     공지사항
    //  </div>

    //    </div>
    //        <div id="popuptab_cont9" className="popuptab_cont">
     
    //  <div className="title1">
    //  공지사항
    //  </div>
       
    //    {
    //      this.state.mode === EvenView.view && (
    //        <div className="contents_in">
    //          <div className="con_box00">
    //            <table   style={{width : '100%'}}>
    //            <tbody>
    //              <tr>
    //                <td className="list_title1" style={{width : '10%'}}>번호</td>
    //                <td className="list_title1">제목</td>
    //                <td className="list_title1" style={{width : '10%'}}>작성일</td>
    //                <td className="list_title1" style={{width : '10%'}}>상태</td>
    //              </tr>

    //              {evens.map((row: any) => {
    //                return (
    //                <tr onClick={()=>{this.setState({detail : row, mode :  EvenView.detail})}}>
    //                  <td className="list_title1"><img src="/web/images/icon_notice.png"/></td>
    //                  <td className="list_title1" style={{color : row.title_color}}>    {row.title}</td>
    //                  <td className="list_title1" style={{width : '10%'}}> {ConvertDate(row.regDate)}</td>
    //                  <td className="list_title1" style={{width : '10%'}}>    {HelpStatus(row.status)}</td>
    //                </tr>
    //                )
    //              })}

    //            </tbody></table>
    //          </div>

 
    //        </div>
    //      ) 
    //    }
     
    //    {
    //      this.state.mode ===  EvenView.detail && (
    //        <div className="contents_in">
    //          <div className="con_box10">
    //            <table   className="write_title_top" style={{width:'100%'}}>
    //              <tbody><tr>
                   
    //                <td className="write_title">제목</td>
    //                <td className="write_td"></td>
    //                <td className="write_basic" style={{color : this.state.detail.title_color}}>
    //                 <div dangerouslySetInnerHTML={{ __html: this.state.detail.title }}></div>

    //                </td>
    //              </tr> 
    //              <tr>
    //                <td style={{height:'5px'}}></td>
    //              </tr> 
    //              <tr  style={{ height: '300px',minHeight : '300px'}}>
    //                <td className="write_title">내용</td>
    //                <td className="write_td"></td>
    //                <td className="write_basic">
    //                 <div dangerouslySetInnerHTML={{ __html: this.state.detail.contents }} 
                    
    //                   style={{    overflowY: 'auto', height: '500px'}}
    //                 ></div>
    //                </td>
    //              </tr>
                 

    //              {
    //                this.state.detail.ref != null && (
    //                  <tr>
    //                    <td className="write_title">답변</td>
    //                    <td className="write_td"></td>
    //                    <td className="write_basic">
    //                      <div dangerouslySetInnerHTML={{ __html: this.state.detail.ref.contents }}></div>
    //                    </td>
    //                  </tr>
    //                )
                   
    //              }

             
    //            </tbody>
    //            </table>  
             
             
    //          </div>
    //          <div className="con_box20">
    //            <div className="btn_wrap_center">
    //              <ul>
    //                <li><a onClick={() => { this.setState({ mode: EvenView.view }); }}><span className="btn3_1">뒤로가기</span></a></li>
    //              </ul>
    //            </div>
    //          </div> 
    //        </div>
    //      )

    //    }
     
    //       </div>
        
    //      </div>
    //    </div>
    //  </div>
    
        )}
      </Popup>
    );
  }
}
