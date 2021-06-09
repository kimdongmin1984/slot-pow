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
         <div  id="fade_2"  className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle', overflowY : 'auto', height : '600px'}}>
         <div className="popup_wrap">
           <div className="close_box">
             <a onClick={()=>{this.props.handleClose()}} className="fade_1_close"><img src="/web/images/popup_close.png" /></a>
           </div>
           <div className="popupbox">
    
           {this.props.handleActive != null && <SubMenu handleActive={(active : string)=>{this.props.handleActive(active)}}></SubMenu> }
     
 
       
        <div id="popuptab_cont8" className="popuptab_cont popupvis_hidden">
          <div className="title1">공지사항</div>

         </div>
             <div id="popuptab_cont9" className="popuptab_cont">
               <div className="title1">공지사항</div>
         
         {
           this.state.mode === NotieView.view && (
             <div className="contents_in">
               <div className="con_box00">
                 <table   style={{width : '100%'}}>
                 <tbody>
                   <tr>
                     <td className="list_title1" style={{width : '10%'}}>번호</td>
                     <td className="list_title1">제목</td>
                     <td className="list_title1" style={{width : '10%'}}>작성일</td>
                     <td className="list_title1" style={{width : '10%'}}>상태</td>
                   </tr>

                   {notices.map((row: any) => {
                     return (
                     <tr onClick={()=>{this.setState({detail : row, mode :  NotieView.detail})}}>
                       <td className="list_title1"><img src="/web/images/icon_notice.png"/></td>
                       <td className="list_title1" style={{color : row.title_color}}>    {row.title}</td>
                       <td className="list_title1" style={{width : '10%'}}> {ConvertDate(row.regDate)}</td>
                       <td className="list_title1" style={{width : '10%'}}>    {HelpStatus(row.status)}</td>
                     </tr>
                     )
                   })}

                 </tbody></table>
               </div>

   
             </div>
           ) 
         }
       
         {
           this.state.mode ===  NotieView.detail && (
             <div className="contents_in">
               <div className="con_box10">
                 <table   className="write_title_top" style={{width:'100%'}}>
                   <tbody><tr>
                     
                     <td className="write_title">제목</td>
                     <td className="write_td"></td>
                     <td className="write_basic" style={{color : this.state.detail.title_color}}>
                      <div dangerouslySetInnerHTML={{ __html: this.state.detail.title }}></div>

                     </td>
                   </tr> 
                   <tr>
                     <td style={{height:'5px'}}></td>
                   </tr> 
                   <tr  style={{ height: '300px',minHeight : '300px'}}>
                     <td className="write_title">내용</td>
                     <td className="write_td"></td>
                     <td className="write_basic">
                      <div dangerouslySetInnerHTML={{ __html: this.state.detail.contents }}      style={{    overflowY: 'auto', height: '500px'}}></div>
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
                     <li><a onClick={() => { this.setState({ mode: NotieView.view }); }}><span className="btn3_1">뒤로가기</span></a></li>
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
