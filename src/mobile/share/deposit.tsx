import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import

import { BalanceService } from "../../service/balance.service";

interface Props {
  handleClose: () => any;
}

interface State {
  balance: number;
}

export class Deposit extends Component<Props, State> {
  balanceService = new BalanceService();
  constructor(props: Props) {
    super(props);
    this.state = {
      balance: 0,
    };
  }

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
              onClick: () => {
                this.props.handleClose()
              },
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
          zIndex: 99999,
          background: "none",
          border: "none",
          width: "none",
        }}
        onClose={() => {
          this.props.handleClose()
        }}
      >
        {(close) => (
          <div className="mo_fade_1_1">
            <div className="mo_close_wrap">
              <div className="mo_close_box">
                <a
                  href="#"
                  className="fade_1_1_close"
                  onClick={() => {
                    this.props.handleClose();
                  }}
                >
                  <img src="/web/images/close.png" />
                </a>
              </div>
            </div>
            <div className="mo_popup_wrap">
              <div className="mo_popup_box">
                <div className="mo_popup_start">
                  <div className="mo_popup">
                    <div className="mo_title_wrap">
                      <div className="mo_title">
                        입금신청 <span className="mo_title2">Money Charge</span>
                        <span>
                          <img src="/web/images/logo.png" width="120" />
                        </span>
                      </div>
                    </div>
                    {/* <div className="con_box10">
                      <div className="tab_wrap">
                        <ul>
                          <li>
                            <a href="#">
                              <span className="tabon">입금신청</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="tab">출금신청</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                    <div className="mo_con_box10">
                      <div className="mo_info_wrap">
                        <div className="mo_info2">
                          수표입금시 입금처리 절대 되지 않습니다.
                        </div>
                        <div className="mo_info3">
                          <span className="mo_font06">
                            최소 입금액은 3만원이상, 만원단위
                          </span>
                          로 신청가능, 입금전 반드시 계좌문의 하시기바랍니다.
                          <br />
                        </div>
                      </div>
                    </div>
                    <div className="mo_con_box10">
                      <table className="mo_write_title_top">
                        {/* <tr>
                          <td className="write_title">충전요청게임</td>
                          <td className="write_basic">
                            <select className="input1"></select>
                          </td>
                        </tr> */}
                        <tr>
                          <td className="mo_write_title">입금하실 금액</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input1"
                              value={this.state.balance}
                              onChange={(e) =>
                                this.setState({
                                  balance: Number(e.target.value),
                                })
                              }
                            />
                            <a
                              onClick={() => {
                                this.setState({
                                  balance: this.state.balance + 30000,
                                });
                              }}
                            >
                              <span className="mo_btn1_1">3만원</span>
                            </a>
                            <a
                              onClick={() => {
                                this.setState({
                                  balance: this.state.balance + 50000,
                                });
                              }}
                            >
                              <span className="mo_btn1_1">5만원</span>
                            </a>
                            <a
                              onClick={() => {
                                this.setState({
                                  balance: this.state.balance + 100000,
                                });
                              }}
                            >
                              <span className="mo_btn1_1">10만원</span>
                            </a>
                            <a
                              onClick={() => {
                                this.setState({
                                  balance: this.state.balance + 500000,
                                });
                              }}
                            >
                              <span className="mo_btn1_1">50만원</span>
                            </a>
                            <a
                              onClick={() => {
                                this.setState({
                                  balance: this.state.balance + 1000000,
                                });
                              }}
                            >
                              <span className="mo_btn1_1">100만원</span>
                            </a>
                            <a
                              onClick={() => {  
                                this.setState({
                                  balance: 0,
                                });
                              }}
                            >
                              <span className="mo_btn1_2">Clear</span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">입금계좌</td>
                          <td className="mo_write_basic">
                            고객센터로 문의해 주시기 바랍니다.
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="mo_con_box10">
                      <div className="mo_info_wrap">
                        <div className="mo_info3">
                          23:50 ~ 00:30, 휴일 다음 첫 영업일 새벽에는
                          은행점검으로 인해 계좌이체가 지연될 수 있습니다.
                          <br />위 시간 이외에도 몇몇 은행은 추가적 점검시간이
                          따로 있으니 이점 유념하시기 바랍니다.
                        </div>
                      </div>
                    </div>
                    <div className="mo_con_box10">
                      <div className="mo_btn_wrap_center">
                        <ul>
                          <li>
                            <a onClick={this.handleDoDeposit}>
                              <span className="mo_btn3_1">입금신청하기</span>
                            </a>
                          </li>
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
