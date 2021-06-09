import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import

import { UserService } from "../../service/user.service";

interface Props {
  handleClose: () => any;
}

interface State {
  pass1: string;
  pass2: string;
}

export class User extends Component<Props, State> {
  userService = new UserService();
  constructor(props: Props) {
    super(props);

    this.state = {
      pass1: "",
      pass2: "",
    };
  }

  handleExchangeToPassword = () => {
    if (this.state.pass1.length < 3 || this.state.pass1.length > 20) {
      confirmAlert({
        title: "회원정보",
        message: "비밀번호 입력 또는 3자리 이상 20자리 이하로 작성해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (this.state.pass1 !== this.state.pass2) {
      confirmAlert({
        title: "회원정보",
        message: "비밀번호정보가 동일해야합니다 ",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    this.userService.user_exchange_to_pass(this.state.pass1).then((s: any) => {
      if (s.status === "success") {
        confirmAlert({
          title: "회원정보",
          message: "비밀번호정보가 정상적으로 변경되었습니다. ",
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
          title: "회원정보",
          message:
            "알수없는 예러가 발생되습니다 지속적인 문제가 발생되면 문의 부탁드림니다. ",
          buttons: [
            {
              label: "확인",
              onClick: () => {},
            },
          ],
        });
        return;
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
        onClose={() => {}}
      >
        {(close) => (
          <div className="mo_fade_1_1">
            <div className="mo_close_wrap">
              <div className="mo_close_box">
                <a
                  href="#"
                  className="mo_fade_1_1_close"
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
                        마이페이지 <span className="mo_title2">MY PAGE</span>{" "}
                        <span>
                          <img src="/web/images/logo.png" width="120" />
                        </span>
                      </div>
                    </div>
                    {/* <div className="mo_con_box10">
                      <div className="mo_tab_wrap">
                        <ul>
                          <li>
                            <a href="#">
                              <span className="mo_tabon">입금신청</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="mo_tab">출금신청</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                    <div className="mo_con_box10">
                      <div className="mo_info_wrap">
                        <div className="mo_info2">
                          로그인 비밀번호를 변경합니다.
                        </div>
                        {/* <div className="mo_info3">
                          <span className="mo_font06">
                            최소 입금액은 3만원이상, 만원단위
                          </span>
                          로 신청가능, 입금전 반드시 계좌문의 하시기바랍니다.
                          <br />
                        </div> */}
                      </div>
                    </div>
                    <div className="mo_con_box10">
                      <table className="mo_write_title_top">
                        {/* <tr>
                          <td className="mo_write_title">충전요청게임</td>
                          <td className="mo_write_basic">
                            <select className="mo_input1"></select>
                          </td>
                        </tr> */}
                        <tr>
                          <td className="mo_write_title">변경 비밀번호</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input1"
                              value={this.state.pass1}
                              onChange={(e: any) => {
                                this.setState({ pass1: e.target.value });
                              }}
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">확인 비밀번호</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input1"
                              value={this.state.pass2}
                              onChange={(e: any) => {
                                this.setState({ pass2: e.target.value });
                              }}
                            />{" "}
                          </td>
                        </tr>
                      </table>
                    </div>
                    {/* <div className="mo_con_box10">
                      <div className="mo_info_wrap">
                        <div className="mo_info3">
                          23:50 ~ 00:30, 휴일 다음 첫 영업일 새벽에는
                          은행점검으로 인해 계좌이체가 지연될 수 있습니다.
                          <br />위 시간 이외에도 몇몇 은행은 추가적 점검시간이
                          따로 있으니 이점 유념하시기 바랍니다.
                        </div>
                      </div>
                    </div> */}
                    <div className="mo_con_box10">
                      <div className="mo_btn_wrap_center">
                        <ul>
                          <li>
                            <a
                              onClick={() => {
                                this.handleExchangeToPassword();
                              }}
                            >
                              <span className="mo_btn3_1">비밀번호 변경</span>
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
