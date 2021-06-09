import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import

import { BalanceService } from "../../service/balance.service";
import { SlotService } from "../../service/slot.service";
import { SubMenu } from "./submenu";


interface Props {
  user : any;
  handleClose: () => any;
  handleActive: (active:string) => any;

}

interface State {
  inBalance: number;
  balance: number;
  pass: string;
}

export class Deposit extends Component<Props, State> {
  balanceService = new BalanceService();
  slotService = new SlotService();

  constructor(props: Props) {
    super(props);
    this.state = {
      inBalance: 0,
      balance : 0,
      pass : "",
    };

    this.handleUpdateInBalance = this.handleUpdateInBalance.bind(this);
    setTimeout(this.handleUpdateInBalance, 1000);
  }

  handleUpdateInBalance = () => {
    this.slotService.get_in_game_balance().then((data: any) => {
      if (data.status === "success") {
        this.setState({
          inBalance: data.balance ?? 0,
        });
      } else {
      }
    });
  };


  handleAskToAccount = () => {
    // if (this.state.pass ===  '') {
    //   confirmAlert({
    //     title: "입금",
    //     message: "환전비밀번호를 입력해주세요.",
    //     buttons: [
    //       {
    //         label: "확인",
    //         onClick: () => {},
    //       },
    //     ],
    //   });
    //   return;
    // }

    this.balanceService.askToAccountPass(this.state.pass).then((data) => {
      console.log(data);
      if (data.status === "success") {
        confirmAlert({
          title: "통장문의",
          message: "통장문의 하였습니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {
                window.location.reload()
              },
            },
          ],
        });
        return;
      } else if (data.status === "pass") {
        confirmAlert({
          title: "입금",
          message: "환전 비밀번호를 확인해주세요.",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
        return;
      } else {
        confirmAlert({
          title: "통장문의",
          message:
            "알수없는 예러가 발상하였습니다 문제가 지속된다면 관리자에게 문의 바람니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
      }
    });
  };

  
  handleDoDeposit = () => {
    if (Number(this.state.balance) < 10000) {
      confirmAlert({
        title: "입금",
        message: "입금금액을 입력해주세요. 최소 충전금액은 10,000원입니다",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (Number(this.state.balance) % 10000 > 0) {
      confirmAlert({
        title: "입금",
        message: "입금은 만원 단위로 가능합니다.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    this.balanceService.applyUserDeposit(this.state.balance).then((data) => {
      console.log(data);
      if (data.status === "success") {
        confirmAlert({
          title: "입금",
          message: "입금신청을 성공하였습니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {
                this.props.handleClose();
              },
            },
          ],
        });
        return;
      } else if (data.status === "wait") {
        confirmAlert({
          title: "입금",
          message: "대기중인 입금신청이 있습니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
        return;
      } else {
        confirmAlert({
          title: "입금",
          message:
            "알수없는 예러가 발상하였습니다 문제가 지속된다면 관리자에게 문의 바람니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
      }
    });
  };

  render() {

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
        onClose={()=>{this.props.handleClose()}}
      >
        {(close) => (
          <div  id="fade_2"  className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle', overflowY : 'auto', height : '600px'}}>
          <div className="popup_wrap">
            <div className="close_box">
              <a href="#" className="fade_1_close" onClick={()=>{this.props.handleClose()}}><img src="/web/images/popup_close.png" /></a>
            </div>
            <div className="popupbox">
            {this.props.handleActive != null && <SubMenu handleActive={(active : string)=>{this.props.handleActive(active)}}></SubMenu> }

              <div id="popuptab_cont2" className="popuptab_cont">
        
              <div className="title1">입금신청</div>
        <div className="contents_in">
          <div className="con_box00">
            <div className="info_wrap">
              <div className="info2">
                주의사항
              </div>
              <div className="info3">
                - 입금 최소 1만원부터 가능하며 입금전 꼭! 본사의 충전계좌 확인 후 입금바랍니다.<br />
                - 수표 및 토스입금시 충전처리가 불가합니다.
              </div>
            </div>
          </div>

          <div className="con_box10">
            <div className="info_wrap">
              <div className="info2" style={{textAlign:"center"}}>
                <li><a onClick={() => { this.handleAskToAccount() }}><span className="btn3_1">계좌문의</span> <span style={{fontSize: 18}}>계좌확인은 고객센터에서 본인이 보낸 글 밑에 답변 있습니다</span></a></li>

                {/* <span className="ww_font">내 지갑 <img src="/web/images/ww_icon.png" height="30" />
                <input className="input1 walletBalance" id="balance_offer" value={this.state.inBalance} readOnly /> 원</span> */}
              </div>
            </div>
          </div>


          <div className="con_box10">
            <div className="info_wrap">
              <div className="info2" style={{textAlign:"center"}}>
                <span className="ww_font">내 지갑 <img src="/web/images/ww_icon.png" height="30" />
                <input className="input1 walletBalance" id="balance_offer" value={this.state.inBalance} readOnly /> 원</span>
              </div>
            </div>
          </div>
        
          {/* <tr>
              <td className="write_title">입금계좌</td>
              <td className="write_td"></td>
              <td className="write_basic">
                <a onClick={()=>{this.handleAskToAccount()}} style={{paddingLeft : 5}}><span className="btn1_2">문의</span></a>
              </td>
            </tr>    */}
          
        
          <div className="con_box10">
            <table  className="write_title_top">
            <tbody><tr>
              <td className="write_title">
                ID
              </td>
              <td className="write_td">
              </td>
              <td className="write_basic">
                <input className="input1 userID" value={this.props.user.id} readOnly />
              </td>
            </tr>
            <tr>
              <td  style={{height:"5px"}}>
              </td>
            </tr>
            <tr>
              <td className="write_title">
              입금자명
              </td>
              <td className="write_td">
              </td>
              <td className="write_basic">
                <input className="input1 userName" value={this.props.user.bankowner} readOnly />
              </td>
            </tr>
            <tr>
              <td colSpan={3}  style={{height:'5px'}}>
              </td>
            </tr>
            <tr>
              <td className="write_title">
              회원은행
              </td>
              <td className="write_td">
              </td>
              <td className="write_basic">
                <input className="input1 userBankName" value={this.props.user.bankname} readOnly />
              </td>
            </tr>
            <tr>
              <td style={{height:'5px'}}>
              </td>
            </tr>
            <tr>
              <td className="write_title">
              회원계좌번호
              </td>
              <td className="write_td">
              </td>
              <td className="write_basic">
                <input className="input1 userAccountNumber"    value={this.props.user.banknum} readOnly/>
              </td>
            </tr>
            <tr>
              <td  style={{height:'5px'}}>
              </td>
            </tr>
          
               
           
            <tr>
              <td className="write_title">입금금액</td>
              <td className="write_td"></td>
              <td className="write_basic"><input className="input1" id="accept_amount" name="accept_amount" placeholder="0" value={this.state.balance} onChange={(e) => this.setState({ balance: Number(e.target.value),})}/>
                <a onClick={() => {this.setState({balance: this.state.balance + 10000,});}} style={{paddingLeft : 5}}><span className="btn1_2">1만원</span></a>
                <a onClick={() => {this.setState({balance: this.state.balance + 50000,});}}  style={{paddingLeft : 5}}><span className="btn1_2">5만원</span></a>
                <a onClick={() => {this.setState({balance: this.state.balance + 100000,});}}  style={{paddingLeft : 5}}><span className="btn1_2">10만원</span></a> 
                <a onClick={() => {this.setState({balance: this.state.balance + 500000,});}}  style={{paddingLeft : 5}}><span className="btn1_2">50만원</span></a> 
                <a onClick={() => {this.setState({balance: this.state.balance + 1000000,});}}  style={{paddingLeft : 5}}><span className="btn1_2">100만원</span></a> 
                <a onClick={() => {this.setState({balance: this.state.balance + 5000000,});}}  style={{paddingLeft : 5}}><span className="btn1_2">500만원</span></a> 
                <a onClick={() => {this.setState({balance: 0,});}}  style={{paddingLeft : 5}}><span className="btn1_1">정정</span></a>
              </td>
            </tr>  
            </tbody></table>
          </div>
          <div className="con_box20">
            <div className="btn_wrap_center">
              <ul>
                <li><a onClick={this.handleDoDeposit}><span className="btn3_1">입금신청하기</span></a></li>
              </ul>
            </div>
          </div>
          </div></div>
            </div>
          </div>
        </div>
     
        )}
      </Popup>
    );
  }
}
