import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { UserService } from "../../service/user.service";
import { runInThisContext } from "vm";
import { ThemeProvider } from "styled-components";

export enum RegView {
  code = "code",
  reg = "reg",
}


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
  nick :string;
  mode: string;
}

export class Reg extends Component<Props, State> {
  userService = new UserService();
  constructor(props: Props) {
    super(props);

    this.state = {
      id: "",
      pass: "",
      pass_check: "",
      phone1: "010",
      phone2: "",
      phone3: "",
      phone: "",

      bankname: "",
      banknumber: "",
      bankowner: "",
      exchange_pw: "",
      nick : "",
      code: "",
      mode : RegView.code
    };
  }

  
  handleCheckCode = async() => {
    if (
      this.state.code === undefined ||
      this.state.code.length <= 3 ||
      20 <= this.state.code.length
    ) {
      confirmAlert({
        title: "회원 가입",
        message: "가입 코드를 입력해주세요",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });
      return;
    }

    let data = await this.userService.checkUserCode(this.state.code).then(s => s)
      if (data.status === "success") {
        this.setState({ mode  : RegView.reg })
        return;
      } else {
        confirmAlert({
          title: "회원 가입",
          message: "가입 코드를 확인해주세요.",
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
  };


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
      this.state.pass !== this.state.pass_check ||
      this.state.pass_check.length <= 5 

    ) {
      confirmAlert({
        title: "회원 가입",
        message: "비밀번호를 확인해주세요 . 비밀번호는 최소 6자리를 사용하셔야합니다",
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
        nick: this.state.nick,
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
          background: "#000",
          border: "none",
          width: "none",
        }}
        
        overlayStyle={{
          overflow: 'scroll'
        }}
      >
        {(close) => (

/*{ <div className="depositModal modal fade in" style={{display: 'block', paddingRight: '17px'}}> }*/

          <div className="depositModal modal fade in" id="_Register_Modal"  role="dialog" aria-labelledby="_Register_ModalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                  <div className="modal-body">
                    <div className="_top_title_overlay">
                      <label className="m-0"><i className="fa fa-edit" aria-hidden="true"></i> 회원가입</label>
                      <button data-dismiss="modal" className="mdl-close" style={{zIndex: 5}}><i className="fa fa-times" aria-hidden="true" ></i></button>
                    </div>

                    <div className="_inner_modal_content">
                      <div className="_inner_title py-0 pb-3 mb-3">
                        <label>찬스 슬롯에 오신것을 환영합니다.</label>
                      </div>

                      <div className="_inner_inputs">
                        <div className="_custom_group_inputs">
                          <span>아이디</span>
                          <input type="text" name="" placeholder="아이디" />
                          <button>중복체크</button>
                        </div>
                        <div className="_custom_group_inputs">
                          <span>닉네임</span>
                          <input type="text" name="" placeholder="닉네임" />
                          <button>중복체크</button>
                        </div>
                        <div className="_custom_group_inputs" >
                          <span>비밀번호</span>
                          <input type="text" name=""  placeholder="비밀번호" style={{width: '68%'}} />
                        </div>
                        <div className="_custom_group_inputs">
                          <span>비밀번호확인</span>
                          <input type="text" name="" placeholder="비밀번호확인" style={{width: '68%'}}  />
                        </div>

                        <div className="_custom_group_inputs">
                          <span>전화번호</span>
                          <input type="text" name="" placeholder="*통화가능한번호 필수입력" />
                          <button>중복체크</button>
                        </div>

                        <small className="text-white float-left" style={{marginLeft: '30%'}}>( 실시간통화 후 인증번호 안내 )</small>

                        <div className="clearfix mb-3"></div>

                        <div className="_custom_group_inputs">
                          <span>은행명</span>
                          <select id="bank" name="bank" style={{width: '68%'}}>
                                      <option value="">은행명</option>
                                      <option value="신한">신한(088)</option>
                                      <option value="KEB하나">KEB하나(081)</option>
                                      <option value="경남">경남(039)</option>
                                      <option value="광주">광주(034)</option>
                                      <option value="국민">국민(004)</option>
                                      <option value="기업">기업(003)</option>
                                      <option value="농협">농협(011)</option>
                                      <option value="대구">대구(031)</option>
                                      <option value="도이치">도이치(055)</option>
                                      <option value="부산">부산(032)</option>
                                      <option value="산업">산업(002)</option>
                                      <option value="상호저축">상호저축(050)</option>
                                      <option value="새마을">새마을(045)</option>
                                      <option value="수협">수협(007)</option>
                                      <option value="신협">신협(048)</option>
                                      <option value="씨티">씨티(027)</option>
                                      <option value="외환">외환(005)</option>
                                      <option value="우리">우리(020)</option>
                                      <option value="우체국">우체국(071)</option>
                                      <option value="전북">전북(037)</option>
                                      <option value="제주">제주(035)</option>
                                      <option value="지역농축협">지역농축협(012)</option>
                                      <option value="케이뱅크">케이뱅크(089)</option>
                                      <option value="카카오뱅크">카카오뱅크(089)</option>
                                      <option value="BNP파리바">BNP파리바(061)</option>
                                      <option value="JP모간">JP모간(057)</option>
                                      <option value="BOA">BOA(060)</option>
                                      <option value="HSBC">HSBC(054)</option>
                                      <option value="SC">SC(023)</option>
                                      <option value="산림조합중앙회">산림조합중앙회(064)</option>
                                      <option value="유안타증권">유안타증권(209)</option>
                                      <option value="KB증권">KB증권(218)</option>
                                      <option value="미래에셋증권">미래에셋증권(230)</option>
                                      <option value="미래에셋대우">미래에셋대우(238)</option>
                                      <option value="삼성증권">삼성증권(240)</option>
                                      <option value="한국투자증권">한국투자증권(243)</option>
                                      <option value="에이치엠씨투자증권">에이치엠씨투자증권(263)</option>
                                      <option value="에스케이증권">에스케이증권(266)</option>
                                      <option value="한화증권">한화증권(269)</option>
                                      <option value="하나금융투자">하나금융투자(270)</option>
                                      <option value="신한금융투자">신한금융투자(278)</option>
                                      <option value="메리츠종합금융증권">메리츠종합금융증권(287)</option>
                                      <option value="유진투자증권">유진투자증권(280)</option>
                                      <option value="신영증권">신영증권(291)</option>
                                      <option value="교보증권">교보증권(261)</option>
                                      <option value="대신증권">대신증권(267)</option>
                                      <option value="동부증권">동부증권(279)</option>
                                      <option value="부국증권">부국증권(290)</option>
                                      <option value="이베스트투자증권">이베스트투자증권(265)</option>
                                      <option value="솔로몬투자증권">솔로몬투자증권(268)</option>
                                      <option value="케이프투자증권">케이프투자증권(292)</option>
                                      <option value="키움증권">키움증권(264)</option>
                                      <option value="펀드온라인">펀드온라인(294)</option>
                                      <option value="KTB투자증권">KTB투자증권(227)</option>
                                  </select>
                        </div>

                        <div className="_custom_group_inputs">
                          <span>계좌번호</span>
                          <input type="text" name="" placeholder="계좌번호" style={{width: '68%'}}/ >
                        </div>

                        <div className="_custom_group_inputs">
                          <span>예금주</span>
                          <input type="text" name="" placeholder="예금주"  style={{width: '68%'}} />
                        </div>
                        <div className="text-center mt-4">
                          <button className="_modal_bottom_button_type_1">가입신청</button>
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
