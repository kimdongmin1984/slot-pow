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
  handleActive: (active:string) => any;
}


interface State {
  notices: any;
}

export class Coupon extends Component<Props, State> {
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
            zIndex: 99,
            background: "#000",
            border: "none",
            width: "none",
        }}
        onClose={() => {}}
      >
        {(close) => (
       <div  id="fade_2"  className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle'}}>
       <div className="popup_wrap">
                <div className="close_box">
                    <a href="#" className="fade_1_close"  onClick={()=>{this.props.handleClose()}}><img src="/web/images/popup_close.png" /></a>
                </div>
                <div className="popupbox">
   
                {this.props.handleActive != null && <SubMenu handleActive={(active : string)=>{this.props.handleActive(active)}}></SubMenu> }


                    <div id="popuptab_cont4" className="popuptab_cont">
                        <div className="title1">
                            쿠폰 신청
                        </div>
                        <div className="contents_in">

                            <table  className="write_title_top"  style={{width:'100%'}}>
                                <tbody><tr>
                                    <td className="write_title">회원정보</td>
                                    <td className="write_basic"><input className="input1" style={{width:'200px'}} value="" /></td>
                                </tr>

                                <tr>
                                    <td className="write_title">이벤트쿠폰 선택</td>
                                    <td className="write_basic">                            
                                        <select className="input1" style={{width:'200px'}} name="couponIdx" id="couponIdx">
                                            <option value="">-이벤트쿠폰선택-</option>
                                            
                                        </select>
                                    </td>
                                </tr>
                                <tr id="descript" style={{display:'none'}}>
                                    <td className="write_title">내용</td>
                                    <td className="write_basic"><textarea className="input2" name="description" id="description"></textarea></td>
                                </tr>						
                            </tbody></table>                
                        </div>                               
                        <div className="con_box20">
                            <div className="btn_wrap_center">
                                <ul>
                                    <li><a href="javascript:ecupon_create();"><span className="btn3_1">이벤트쿠폰 신청하기</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="con_box50">                      
                            <div className="title1">
                                쿠폰발급현황
                            </div>           
                        </div>              
                        <div className="con_box10">
                        <table  style={{width: "100%"}}>
                            <tbody><tr>
                                <td  className="list_title1" style={{width:"10%"}}>발급일자</td>
                                <td  className="list_title1"  style={{width:"10%"}}>쿠폰종류</td>
                                <td  className="list_title1"  style={{width:"10%"}}>쿠폰금액</td>
                                <td  className="list_title1"  style={{width:"10%"}}>만료일자</td>                                                          
                                <td  className="list_title1"  style={{width:"10%"}}>처리</td>                                                                          
                            </tr> 
                            
                        </tbody></table>
                    </div> 
                    <div className="con_box20" style={{display: 'none'}}>
                        <div className="page_wrap">
                            <ul>
                                <li><a href="#"><span className="page">&lt;&lt;</span></a></li>                        
                                <li><a href="#"><span className="page">&lt;</span></a></li>
                                <li><a href="#"><span className="pageon">1</span></a></li>
                                <li><a href="#"><span className="page">2</span></a></li>
                                <li><a href="#"><span className="page">3</span></a></li>
                                <li><a href="#"><span className="page">4</span></a></li>
                                <li><a href="#"><span className="page">5</span></a></li>
                                <li><a href="#"><span className="page">&gt;</span></a></li>
                                <li><a href="#"><span className="page">&gt;&gt;</span></a></li>                            
                            </ul>
                        </div>
                    </div>                               
                </div>
                            <div id="popuptab_cont8" className="popuptab_cont popupvis_hidden">
                <div className="title1">
                    공지사항
                </div>
                <div className="contents_in">
                    <div className="con_box00">
                
                    </div>
                    <div className="con_box20">
                        <div className="btn_wrap_center">
                            <ul>
                                <li><a href="#" ><span className="btn2_1">목록</span></a></li>
                            </ul>
                        </div>
                    </div></div></div>
                    
                    <div id="popuptab_cont9" className="popuptab_cont popupvis_hidden">
                    <div className="title1">
                        공지사항
                    </div>
                    <div className="contents_in">
                        <div className="con_box00">
                        
                        </div>
                        <div className="con_box20">
                            <div className="btn_wrap_center">
                                <ul>
                                    <li><a href="#" ><span className="btn2_1">목록</span></a></li>
                                </ul>
                            </div>
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
