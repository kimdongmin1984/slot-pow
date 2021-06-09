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
  id: string;
  pass: string;
  pass_check: string;
  phone1: string;
  phone2: string;
  phone3: string;
  phone: string;

  bankname: string;
  banknumber: string;
  bankowner: string;
  exchange_pw: string;
  code: string;
}

export class Reg extends Component<Props, State> {
  userService = new UserService();
  constructor(props: Props) {
    super(props);

    this.state = {
      id: "",
      pass: "",
      pass_check: "",
      phone1: "",
      phone2: "",
      phone3: "",
      phone: "",

      bankname: "",
      banknumber: "",
      bankowner: "",
      exchange_pw: "",
      code: "",
    };
  }

  handleCheck = () => {
    if (
      this.state.id === undefined ||
      this.state.id.length <= 3 ||
      20 <= this.state.id.length
    ) {
      confirmAlert({
        title: "회원 가입",
        message: "아이디를 입력 또는 3자리 이상 20자리 이하로 작성해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    this.userService.regCheckID(this.state.id).then((s: any) => {
      if (s.status === "success") {
        confirmAlert({
          title: "회원 가입",
          message: "사용 할수있는 아이디 입니다.",
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
          title: "회원 가입",
          message: "사용 불가능한 아이디 입니다.",
          buttons: [
            {
              label: "확인",
              onClick: () => {
                this.setState({ id: "" });
              },
            },
          ],
        });
        return;
      }
    });
  };

  handleReg = () => {
    if (
      this.state.id === undefined ||
      this.state.id.length <= 3 ||
      20 <= this.state.id.length
    ) {
      confirmAlert({
        title: "회원 가입",
        message: "아이디를 입력 또는 3자리 이상 20자리 이하로 작성해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (
      this.state.pass == null ||
      this.state.pass_check == null ||
      this.state.pass !== this.state.pass_check
    ) {
      confirmAlert({
        title: "회원 가입",
        message: "비밀번호를 확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    let phone = this.state.phone1 + this.state.phone2 + this.state.phone3;
    if (phone == null || phone.length <= 10) {
      confirmAlert({
        title: "회원 가입",
        message: "휴대폰 번호를 확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (this.state.bankname == null) {
      confirmAlert({
        title: "회원 가입",
        message: "은행명을 확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    if (this.state.banknumber == null) {
      confirmAlert({
        title: "회원 가입",
        message: "계좌 번호를  확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });

      return;
    }

    if (this.state.bankowner == null) {
      confirmAlert({
        title: "회원 가입",
        message: "예금주 이름을 확인해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });

      return;
    }

    this.userService
      .regUser({
        id: this.state.id,
        pw: this.state.pass,
        pass_check: this.state.pass_check,
        phone: phone,
        bankname: this.state.bankname,
        banknumber: this.state.banknumber,
        bankowner: this.state.bankowner,
        exchange_pw: this.state.bankowner,
        code: this.state.code,
      })
      .then((data: any) => {
        if (data.status === "alread_have_user") {
          confirmAlert({
            title: "회원 가입",
            message: "생성할수 없는 유저아이디 입니다.",
            buttons: [
              {
                label: "확인",
                onClick: () => {},
              },
            ],
          });
          return;
        } else if (data.status === "cant_find_code") {
          confirmAlert({
            title: "회원 가입",
            message: "회원 가입코드를 확인해주세요.",
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
            title: "회원 가입",
            message: "회원 가입에 성공하였습니다.",
            buttons: [
              {
                label: "확인",
                onClick: () => {
                  window.location.reload();
                },
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
          zIndex: 99,
          background: "none",
          border: "none",
          width: "none",
        }}
      >
        {(close) => (
          <div id="fade_0_1">
            <div className="mo_close_wrap">
              <div className="mo_close_box">
                <a
                  href="#"
                  className="mo_fade_0_1_close"
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
                    {/* <div className="mo_con_box10">
                      <img src="/web/images/join_title.jpg" />
                    </div> */}
                    <div className="mo_con_box10">
                      <table className="mo_write_title_top">
                        <tr>
                          <td className="mo_write_title">회원 아이디</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.id}
                              onChange={(e: any) => {
                                this.setState({ id: e.target.value });
                              }}
                            />{" "}
                         
                            (영어또는 숫자조합6~12자리입니다. ){" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">비밀번호</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.pass}
                              onChange={(e: any) => {
                                this.setState({ pass: e.target.value });
                              }}
                            />{" "}
                            (패스워드는 6~16자리 입니다.){" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">비밀번호 확인</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.pass_check}
                              onChange={(e: any) => {
                                this.setState({ pass_check: e.target.value });
                              }}
                            />{" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">전화번호</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input2"
                              value={this.state.phone1}
                              onChange={(e: any) => {
                                this.setState({ phone1: e.target.value });
                              }}
                            />
                            -{" "}
                            <input
                              className="mo_input2"
                              value={this.state.phone2}
                              onChange={(e: any) => {
                                this.setState({ phone2: e.target.value });
                              }}
                            />
                            -{" "}
                            <input
                              className="mo_input2"
                              value={this.state.phone3}
                              onChange={(e: any) => {
                                this.setState({ phone3: e.target.value });
                              }}
                            />
                          </td>
                        </tr>

                        <tr>
                          <td className="mo_write_title">은행명</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.bankname}
                              onChange={(e: any) => {
                                this.setState({ bankname: e.target.value });
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">계좌번호</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.banknumber}
                              onChange={(e: any) => {
                                this.setState({ banknumber: e.target.value });
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">이름</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.bankowner}
                              onChange={(e: any) => {
                                this.setState({ bankowner: e.target.value });
                              }}
                            />{" "}
                            (이름은 정보와 일치해야합니다.){" "}
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">환전비번</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.exchange_pw}
                              onChange={(e: any) => {
                                this.setState({ exchange_pw: e.target.value });
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="mo_write_title">추천코드</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.code}
                              onChange={(e: any) => {
                                this.setState({ code: e.target.value });
                              }}
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="mo_con_box10">
                      <div className="mo_btn_wrap_center">
                        <ul>
                          <li>
                            <a
                              onClick={() => {
                                this.handleReg();
                              }}
                            >
                              <span className="mo_btn3_1">회원가입완료</span>
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
