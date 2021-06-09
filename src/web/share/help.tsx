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
          <div  id="fade_2"  className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle', overflowY : 'auto', height : '600px'}}>
          <div className="popup_wrap">
            <div className="close_box">
              <a onClick={()=>{this.props.handleClose()}} className="fade_1_close"><img src="/web/images/popup_close.png" /></a>
            </div>
            <div className="popupbox">

            {this.props.handleActive != null && <SubMenu handleActive={(active : string)=>{this.props.handleActive(active)}}></SubMenu> }

  
        
              <div id="popuptab_cont8" className="popuptab_cont popupvis_hidden">
        <div className="title1">
           공지사항
        </div>
  
          </div>
              <div id="popuptab_cont9" className="popuptab_cont">
        
        <div className="title1">
           고객센터
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
                      <tr onClick={()=>{this.setState({detail : row, mode :  helpView.detail})}}>
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
                    <ul>
                      <li><a onClick={()=>{ this.setState({mode :  helpView.write}) }} ><span className="btn2_1">글쓰기</span></a></li>                                                             
                    </ul>
                  </div>
                </div>
              </div>
            ) 
          }
          {
            this.state.mode ===  helpView.write && (
              <div className="contents_in">
                <div className="con_box10">
                  <table   className="write_title_top" style={{width:'100%'}}>
                    <tbody><tr>
                      <td className="write_title">제목</td>
                      <td className="write_td"></td>
                      <td className="write_basic">
                      <input className="input1 " type="text" id="wr_subject" name="wr_subject" placeholder="제목" style={{width:'100%'}}       value={this.state.title}
                      onChange={(e) =>
                        this.setState({
                          title: e.target.value,
                        })
                      }/>
                      </td>
                    </tr> 
                    <tr>
                      <td style={{height:'5px'}}></td>
                    </tr> 
                    <tr>
                      <td className="write_title">내용</td>
                      <td className="write_td"></td>
                      <td className="write_basic">
                      <textarea id="wr_content" name="wr_content" className="input1 "  style={{width:'100%',height:'300px'}}      value={this.state.contents}
                      onChange={(e) =>
                        this.setState({
                          contents: e.target.value,
                        })
                      } ></textarea>
                      </td>
                    </tr>
                    

                  </tbody></table>  
                
                
                </div>
                <div className="con_box20">
                  <div className="btn_wrap_center">
                    <ul>
                      <li  style={{paddingRight:30}}><a onClick={() => { this.handleSaveHelp( this.state.title, this.state.contents);}}><span className="btn3_1">작성완료</span></a></li>
                      <li><a onClick={() => { this.setState({ mode: helpView.view }); }}><span className="btn3_1">뒤로가기</span></a></li>
                    </ul>
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
                      <textarea id="wr_content" name="wr_content" className="input1 "  style={{width:'100%',height:'100px'}}      value={this.state.detail.contents} ></textarea>
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
