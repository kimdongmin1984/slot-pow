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
  
    this.balanceService.askToAccount().then((data) => {
      if (data.status === "success") {
        confirmAlert({
          title: "계좌문의",
          message: "계좌문의을 성공하였습니다.",
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
      } else if (data.status === "pass") {
        confirmAlert({
          title: "계좌문의",
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
          title: "계좌문의",
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
    if (Number(this.state.balance) <= 0) {
      confirmAlert({
        title: "입금",
        message: "입금금액을 입력해주세요.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (Number(this.state.balance) < 10000 || 10000 < (Number(this.state.balance) % 10000)) {
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
          background: "none",
          border: "none",
          width: "none",
        }}
        onClose={()=>{this.props.handleClose()}}
      >
        {(close) => (
             <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
                 {/* <img className="logo-modal" src="/last/image/logo/logo-footer.png" alt="" /> */}
                 <div className="modal-header">
                     <div className="title text-left">
                         <h5>입금신청</h5>
                         <span>DEPOSIT</span>
                     </div>
                     <button className="close-btn" data-dismiss="modal"  onClick={()=> this.props.handleClose()}></button>
                 </div>
                 <div className="modal-body">
                     <div className="modal-menu">
                         <button type="button" className="mm-btn active">입금신청</button>
                         <button type="button" className="mm-btn withdraw-link" onClick={()=> this.props.handleActive('withdraw')}>출금신청</button>
                        <button type="button" className="mm-btn withdraw-link"  onClick={()=> this.props.handleActive('point')}>금고</button>
                     </div>
                     <div className="terms-use">
                         <div className="text-cont">
                         <div className="inner">
                            <p><b><span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>
                              <span style={{color: 'rgb(255, 170, 0)', fontSize: '18pt'}}>1.꼭!!!<span style={{color: 'rgb(255, 239, 0)'}}>**</span></span>
                              <span style={{color: 'rgb(255, 170, 0)', fontSize: '18pt'}}>아래&nbsp;</span> </span>
                              <u><span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>↓</span>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>​</span>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>↓</span>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>​</span>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>↓</span>
                              <span style={{fontSize: '14pt', color: 'rgb(255, 0, 0)'}}>
                              <span style={{color: 'rgb(255, 239, 0)', fontSize: '18pt'}}><u>​<span style={{color: 'rgb(0, 158, 37)', fontSize: '18pt'}}><u> 입금</u></span></u></span>
                              <span style={{color: 'rgb(255, 239, 0)', fontSize: '18pt'}}><span style={{color: 'rgb(255, 239, 0)', fontSize: '18pt'}}><u>계좌문의하기</u></span>&nbsp;</span></span>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>↓</span><span style={{fontSize: '14pt', color: 'rgb(255, 0, 0)'}}><span style={{color: 'rgb(255, 239, 0)', fontSize: '18pt'}}>​</span></span><span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>↓</span>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 239, 0)'}}>↓</span></u>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 170, 0)'}}>​</span>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 170, 0)'}}><span style={{color: 'rgb(255, 170, 0)', fontSize: '18pt'}}>​ 클릭<span style={{color: 'rgb(255, 239, 0)'}}>**</span></span>&nbsp;</span></b></p>
                              <p><b><span style={{fontSize: '18pt', color: 'rgb(255, 108, 0)'}}>2. 입금계좌 확인후 입금</span></b></p>
                              <p><b><span style={{fontSize: '12pt', color: 'rgb(255, 170, 0)'}}><span style={{color: 'rgb(81, 143, 187)', fontSize: '12pt'}}>3. 입금금액 입력후 입금신청 클릭(입금확인 *10분* 불가시 자동 취소 됩니다.)</span></span></b></p>
                              <p><b><span style={{fontSize: '12pt', color: 'rgb(0, 158, 37)'}}>4. <u><span style={{color: 'rgb(255, 239, 0)'}}><u>순차적으로 입금처리</u></span></u>가 진행되며 시간이 지연 될 수 있으니 양해 바랍니다.</span></b></p>
                              <p><b><span style={{fontSize: '12pt', color: 'rgb(0, 158, 37)'}}>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(입금확인은 새로고침을 눌러 주세요)</span></b></p><div className="grammarly-disable-indicator"></div>
                        </div>
                         </div>
                     </div>
                     <div className="deposit-ask">
                         <button type="button" onClick={()=>{ this.handleAskToAccount() }}>
                             <i className="fa fa-comment-dots" aria-hidden="true"></i>
                             <span>입금계좌문의</span>
                         </button>
                         <p>* 입금 계좌는 고객센터에서 확인해주세요!</p>
                     </div>
                     <div className="form-container">

                        {
                          this.props.user != null && (
                            <div className="form-group">
                                <div className="labels">
                                    <span className="dot"></span>
                                    <span>입금자명</span>
                                </div>
                                <div className="infos">
                                    <input type="text"  value={this.props.user.bankowner}  readOnly />
                                </div>
                            </div>
                          ) 
                        }
                         <div className="form-group">
                             <div className="labels">
                                 <span className="dot"></span>
                                 <span>입금할 금액</span>
                             </div>
                             <div className="infos">
                                 <input type="text" placeholder="최소 1만원단위" name="amount" value={this.state.balance} onChange={(e: any) => { this.setState({ balance :  Number(e.target.value) })}} />
                             </div>
                         </div>
                     </div>
                     <div className="modal-footer">
                         <div className="btn-grp">
                             <button type="button"  onClick={()=>this.handleDoDeposit()}><i className="fa fa-check-square-o" aria-hidden="true"></i> 입금하기</button>
                             <button type="button" className="gray" data-dismiss="modal" onClick={()=> this.props.handleClose()}><i className="fa fa-window-close" aria-hidden="true"></i> 취소하기</button>
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
