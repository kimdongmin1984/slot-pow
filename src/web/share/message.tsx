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
  user : any;
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

export class Message extends Component<Props, State> {
  userService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = { helps: [], mode: helpView.view, title: "", contents: "" , detail : {}};
  }

  componentDidMount() {
    this.handleGetNotices();
  }

  handleGetNotices = () => {
    this.userService.get_user_note_list().then((data: any) => {
      console.log(data);
      if (data.status === "success") {
        this.setState({ helps: data.note });
      }
    });
  };

  
  handleDeleteAll = () => {
    this.userService.do_del_all_note().then((data: any) => {
  
    });
  };
  handleReadNote = (id : string) => {
    this.userService.do_read_note(id).then((data: any) => {});
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
          <div  id="fade_2"  className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle', overflowY : 'auto', height : '600px'}}>
          <div className="popup_wrap">
            <div className="close_box">
              <a onClick={()=>{this.props.handleClose()}} className="fade_1_close"><img src="/web/images/popup_close.png" /></a>
            </div>
            <div className="popupbox">


  
              <div id="popuptab_cont9" className="popuptab_cont">
        
        <div className="title1">
        쪽지
        </div>
          
          {
            this.state.mode === helpView.view && (
              <div className="contents_in">
                <div className="con_box00">
                  <table   style={{width : '100%'}}>
                  <tbody>
                    <tr>
                      <td className="list_title1">제목</td>
                      <td className="list_title1" style={{width : '10%'}}>작성일</td>
                      <td className="list_title1" style={{width : '10%'}}>상태</td>
                    </tr>

                    {helps.map((row: any) => {
                      return (
                      <tr onClick={()=>{
                          this.setState({detail : row, mode :  helpView.detail})
                          this.handleReadNote(row._id)
                        }}>
                        <td className="list_title1">    {row.title}</td>
                        <td className="list_title1" style={{width : '10%'}}> {ConvertDate(row.regDate)}</td>
                        <td className="list_title1" style={{width : '10%'}}>    {HelpStatus(row.status)}</td>
                      </tr>
                      )
                    })}

                  </tbody></table>
                </div>

                <div className="con_box20">
                  <div className="btn_wrap_right">
                    <li><a onClick={() => { this.handleDeleteAll() }}><span className="btn3_1">전체 삭제</span></a></li>

                  </div>
                </div>
              </div>
            ) 
          }
     

          {
            this.state.mode ===  helpView.detail && (
              <div className="contents_in">
                <div className="con_box10">
                  <table   className="write_title_top" style={{width:'100%'}}>
                    <tbody><tr>
                      <td className="write_title">제목</td>
                      <td className="write_td"></td>
                      <td className="write_basic">
                      <input className="input1 " type="text" id="wr_subject" name="wr_subject" placeholder="제목" style={{width:'100%'}}       value={this.state.detail.title} />
                      </td>
                    </tr> 
                    <tr>
                      <td style={{height:'5px'}}></td>
                    </tr> 
                    <tr>
                      <td className="write_title">내용</td>
                      <td className="write_td"></td>
                      <td className="write_basic">
                      <div dangerouslySetInnerHTML={{ __html: this.state.detail.text }}></div>

                      {/* <textarea id="wr_content" name="wr_content" className="input1 "  style={{width:'100%',height:'300px'}}      value={this.state.detail.text} ></textarea> */}
                      </td>
                    </tr>
                    

                    {
                      this.state.detail.ref != null && (
                        <tr>
                          <td className="write_title">답변</td>
                          <td className="write_td"></td>
                          <td className="write_basic">
                            <div dangerouslySetInnerHTML={{ __html: this.state.detail.ref.contents }}></div>
                          </td>
                        </tr>
                      )
                      
                    }

                
                  </tbody>
                  </table>  
                
                
                </div>
                <div className="con_box20">
                  <div className="btn_wrap_center">
                    <ul>
                      <li><a onClick={() => { this.setState({ mode: helpView.view }); }}><span className="btn3_1">뒤로가기</span></a></li>
                    </ul>
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
