import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { BalanceService } from "../../service/balance.service";
import { SlotService } from "../../service/slot.service";

import { SubMenu } from "./submenu";
import { ConvertDate, ConverMoeny } from "../../utility/help";


interface Props {
  user: any;

  handleActive: (active:string) => any;
  handleClose: () => any;
}

interface State {
  balance: number;
  inBalance: number;

}

export class Withdraw extends Component<Props, State> {
  balanceService = new BalanceService();
  slotService = new SlotService();

  constructor(props: Props) {
    super(props);
    this.state = { balance: 0 , inBalance: 0    };


    
    this.handleUpdateInBalance = this.handleUpdateInBalance.bind(this);
    setTimeout(this.handleUpdateInBalance, 1000);
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


  handleDoWithdraw = () => {
    if (10000 < this.state.balance % 10000) {
      confirmAlert({
        title: "출금",
        message: "출금은 만원 단위로 가능합니다.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }
    if (this.state.balance < 10000) {
      confirmAlert({
        title: "출금",
        message: "출금금액을 입력해주세요.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    this.balanceService.applyUserWithdrawV3(this.state.balance).then((data) => {
      console.log(data);
      if (data.status === "success") {
        confirmAlert({
          title: "출금",
          message: "출금신청을 성공하였습니다.",
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
      } else if (data.status === "balance") {
        confirmAlert({
          title: "출금",
          message: "보유중인 금액보다 출금신청금액이 많습니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
        return;
      } else if (data.status === "wait") {
        confirmAlert({
          title: "출금",
          message: "대기중인 출금신청이 있습니다.",
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
          title: "출금",
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
        open={true}
        contentStyle={{
          zIndex: 999,
          background: "#000",
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
                <p>출금신청  <span>WITHDRAW</span></p>
                <button data-dismiss="modal"  onClick={()=>{this.props.handleClose()}}></button>
              </div>
              <div className="modal_body">
              <form id="_frm_charge" name="_frm_charge">
                <div className="form-group">
                  <div>
                    <p><i className="fa fa-angle-right" aria-hidden="true"></i>  금액</p>
                  </div>
                  <div>
                    <p>{ConverMoeny(this.state.inBalance)}</p>
                  </div>
                </div>
                
                <div className="form-group">
                  <div>
                    <p><i className="fa fa-angle-right" aria-hidden="true"></i>  출금금액</p>
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

                  </div>
                </div>
              </form>

              <div className="modal_btn_grp">
                <button id="_charge_submit" onClick={()=>this.handleDoWithdraw}>출금하기</button>
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
