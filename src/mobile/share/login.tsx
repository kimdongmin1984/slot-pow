import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { UserService } from "../../service/user.service";

interface Props {
  handleClose: () => any;
  tryLogin: (id: any, pw: any) => any;

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

export class Login extends Component<Props, State> {
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
             
                    <div className="mo_con_box10">
                      <table className="mo_write_title_top">
                        <tr>
                          <td className="mo_write_title">아이디</td>
                          <td className="mo_write_basic">
                            <input
                              className="mo_input3"
                              value={this.state.id}
                              onChange={(e: any) => {
                                this.setState({ id: e.target.value });
                              }}
                            />{" "}
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
                                this.props.tryLogin(this.state.id, this.state.pass);
                              }}
                            >
                              <span className="mo_btn3_1">로그인</span>
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
