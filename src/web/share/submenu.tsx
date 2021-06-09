import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { UserService } from "../../service/user.service";
import { runInThisContext } from "vm";

interface Props {
    handleActive: (active:string) => any;
}

interface State {
  
}

export class SubMenu extends Component<Props, State> {
  userService = new UserService();
  constructor(props: Props) {
    super(props);

   
  }

  render() {
    return (
        <div className="popup_tab_wrap">
            <ul className="popup_tab">
            <li className="tab1" data-target="#popuptab_cont1">
            <a onClick={()=>{this.props.handleActive('deposit')}}>
                <span><img src="/web/images/gnb01.png" /> 입금신청</span>
                </a>
            </li>
            <li className="tab2" data-target="#popuptab_cont2">
            <a onClick={()=>{this.props.handleActive('withdraw')}}>
                <span><img src="/web/images/gnb02.png" /> 출금신청</span>
                </a>
            </li>
        
            {/* <li className="tab4" data-target="#popuptab_cont4">
            <a onClick={()=>{this.props.handleActive('coupon')}}>
                <span><img src="/web/images/gnb04.png" /> 쿠폰발급현황</span>
                </a>
            </li>
        
            <li className="tab6" data-target="#popuptab_cont6">
            <a onClick={()=>{this.props.handleActive('even')}}>
                <span><img src="/web/images/gnb06.png" /> 이벤트</span>
                </a>
            </li> */}
            <li className="tab7" data-target="#popuptab_cont7">
            <a onClick={()=>{this.props.handleActive('notice')}}>
                <span><img src="/web/images/gnb07.png" /> 공지사항</span>
                </a>
            </li>
            <li className="tab8" data-target="#popuptab_cont8">
            <a onClick={()=>{this.props.handleActive('user')}}>
                <span><img src="/web/images/gnb08.png" />  마이페이지</span>
                </a>
            </li>
            <li className="tab9 popupactive" data-target="#popuptab_cont9">
            <a onClick={()=>{this.props.handleActive('help')}}>
                <span><img src="/web/images/gnb05.png" /> 고객센터</span>
                </a>
            </li>

            <li className="tab10" data-target="#popuptab_cont10">
            </li>
            </ul>
        </div>
        );
  }
}
