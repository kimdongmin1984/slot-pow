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
import { SlotService } from "../../service/slot.service";

import { ConvertDate } from "../../utility/help";


interface Props {
  user : any;
  handleClose: () => any;
  handleActive: (active:string) => any;
}


interface State {
  notices: any;
  inBalance : number;
}

export class User extends Component<Props, State> {
  userService = new UserService();
  slotService = new SlotService();

  constructor(props: Props) {
    super(props);
    this.state = { notices: [] , inBalance : 0};

    this.handleUpdateInBalance = this.handleUpdateInBalance.bind(this);
    setTimeout(this.handleUpdateInBalance, 1000);
  }

  componentDidMount() {
  }


  
  handleUpdateInBalance  (){
    this.slotService.get_in_game_balance().then((data: any) => {
      if (data.status === "success") {
        this.setState({
          inBalance: data.balance ?? 0,
        });
      } else {
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
                            마이페이지
                            </div>
                            <div className="contents_in">
    
                                <table  className="write_title_top"  style={{width:'100%'}}>
                                    <tbody>
                                      <tr>
                                        <td className="write_title">회원아이디	</td>
                                        <td className="write_basic">
                                          {
                                            this.props && this.props.user && <input className="input1" style={{width:'200px'}} value={this.props.user.id} readOnly />
                                          }
                                          </td>
                                      </tr>
                                      <tr>
                                        <td className="write_title">보유게임 총머니</td>
                                        <td className="write_basic"><input className="input1" style={{width:'200px'}} value={this.state.inBalance} readOnly /></td>
                                      </tr>
    
                                 
                                </tbody></table>                
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
