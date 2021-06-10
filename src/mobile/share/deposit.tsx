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
    if (this.state.pass ===  '') {
      confirmAlert({
        title: "입금",
        message: "환전비밀번호를 입력해주세요.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    this.balanceService.askToAccount().then((data) => {
      console.log(data);
      if (data.status === "success") {
        confirmAlert({
          title: "입금",
          message: "쪽지함에 통장정보가 가 전송되었습니다 확인해주세요.",
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

  
  handleDoDeposit = () => {
    if (this.state.balance <= 0) {
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

    if (10000 < this.state.balance % 10000) {
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
          <div className="depositModal modal fade in" style={{display: 'block', paddingRight: '17px'}}>
            <div className="dep_with_modal cg_modal modal-dialog">
              <div className="header">
                <i className="fa fa-credit-card"></i>
                <p>입금신청 <span>DEPOSIT</span></p>
                <button data-dismiss="modal"  onClick={()=>{this.props.handleClose()}}></button>
              </div>
              <div className="modal_body">
              <form id="_frm_charge" name="_frm_charge">
                <div className="form-group">
                  <div>
                    <p><i className="fa fa-angle-right" aria-hidden="true"></i> 회원정보</p>
                  </div>
                  <div>
                    <p>{this.props.user.bankowner}</p>
                  </div>
                </div>
                <div className="form-group">
                  <div>
                    <p><i className="fa fa-angle-right" aria-hidden="true"></i> 입금계좌</p>
                  </div>
                  <div>
                    <div className="btn_grp">
                      <button type="button" className="_set_money" data-target="in_req_money" data-v="0"  onClick={()=>{this.handleAskToAccount()}} >문의 하기</button>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div>
                    <p><i className="fa fa-angle-right" aria-hidden="true"></i> 입금자명</p>
                  </div>
                  <div>
                    <input type="text" id="in_req_name" name="req_name" placeholder="===계좌문의는 실시간상담으로 신청===" value={this.props.user.bankowner} />
                  </div>
                </div>
                <div className="form-group">
                  <div>
                    <p><i className="fa fa-angle-right" aria-hidden="true"></i> 입금금액</p>
                  </div>
                  <div>
                    <input type="text" id="in_req_money" name="_n_money" className="__number" placeholder="최소단위는 3만원이상입니다 (수표절대금지)"  value={this.state.balance}  
                           onChange={(e: any) => {
                            this.setState({ balance : e.target.value });
                          }}
                    />
                    <div className="btn_grp">
                      <button type="button" className="_set_money" data-target="in_req_money" data-v="10000" 
                        onClick={() => {
                          this.setState({
                            balance: this.state.balance + 10000,
                          });
                        }}>1만원</button>
                      <button type="button" className="_set_money" data-target="in_req_money" data-v="30000" 
                        onClick={() => {
                          this.setState({
                            balance: this.state.balance + 30000,
                          });
                        }}>3만원</button>
                      <button type="button" className="_set_money" data-target="in_req_money" data-v="50000"
                        onClick={() => {
                          this.setState({
                            balance: this.state.balance + 50000,
                          });
                        }}>5만원</button>
                      <button type="button" className="_set_money" data-target="in_req_money" data-v="100000"
                        onClick={() => {
                          this.setState({
                            balance: this.state.balance + 100000,
                          });
                        }}>10만원</button>
                      <button type="button" className="_set_money" data-target="in_req_money" data-v="500000"
                        onClick={() => {
                          this.setState({
                            balance: this.state.balance + 500000,
                          });
                        }}>50만원</button>
                      <button type="button" className="_set_money" data-target="in_req_money" data-v="0"
                         onClick={() => {
                          this.setState({
                            balance: 0,
                          });
                        }}
                      >정정하기</button>
                    </div>
        
                    <div style={{marginTop: '5px', color: '#ff0000', textAlign: 'left'}}>※ 충전계좌 문의는 1:1문의에서 신청</div>
                  </div>
                </div>
              </form>
        
              <div className="modal_btn_grp">
                <button id="_charge_submit" onClick={()=>this.handleDoDeposit}>입금하기</button>
                <button id="_charge_cancel" data-dismiss="modal" onClick={()=>this.props.handleClose()}>취소하기</button>
              </div>
              </div>
          </div>
        </div>
        )}
      </Popup>
    );
  }
}
