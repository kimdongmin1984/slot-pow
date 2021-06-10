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
  handleActive: (active:string) => any;

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
      phone1: "",
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
      this.state.pass_check.length <= 3 

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
     

     <div className="modal joinModal fade show" style={{overflowY: 'auto', display: 'block', paddingRight: '17px'}} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
              {/* <img className="logo-modal" src="/last/image/logo/logo-footer.png" alt="" /> */}

              <div className="modal-header">
                  <div className="title text-left">
                      <h5>회원가입</h5>
                      <span>SIGN UP</span>
                  </div>
                  <button className="close-btn" data-dismiss="modal" onClick={()=> this.props.handleClose()}></button>
              </div>
              <div className="modal-body">
                  <div className="modal-menu">
                      <button className="mm-btn login-link"  onClick={()=> this.props.handleActive('login')}>로그인</button>
                      <button className="mm-btn active">회원가입</button>
                  </div>
 

                  <input type="hidden" name="_token" value="7Do1ybOiRnawRmta69DbJcslEoctv8aY2mIEFPco" />      
                    <div className="form-head">
                          <span className="title"><i className="fa fa-caret-right" aria-hidden="true"></i> 필수정보</span>
                      </div>
                      <div className="form-container">
                          <div className="form-group w-btn">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>유저아이디</span>
                              </div>
                              <div className="infos">
                                  <input type="text" name="user_id" id="user_id" placeholder="유저아이디"  value={this.state.id} onChange={(e: any) => { this.setState({id: e.target.value }); }}  />
                                  <button type="button"  onClick={()=> this.handleCheck()} ><i className="fa fa-check-double" aria-hidden="true"></i> 중복체크</button>
                              </div>
                          </div>
                          {/* <div className="form-group w-btn">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>닉네임</span>
                              </div>
                              <div className="infos">
                                  <input type="text" name="nickname" id="nickname" placeholder="닉네임"  value={this.state.id} onChange={(e: any) => { this.setState({nick: e.target.value }); }}  />
                                  <button type="button" ><i className="fa fa-check-double" aria-hidden="true"></i> 중복체크</button>
                              </div>
                          </div> */}
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>비밀번호</span>
                              </div>
                              <div className="infos">
                                  <input id="password" type="password" name="password" placeholder="비밀번호" value={this.state.pass} onChange={(e: any) => { this.setState({pass: e.target.value }); }}  />
                              </div>
                          </div>
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>비밀번호확인</span>
                              </div>
                              <div className="infos">
                                  <input id="password_cnfm" type="password" name="password_confirmation" placeholder="비밀번호확인"  value={this.state.pass_check} onChange={(e: any) => { this.setState({pass_check: e.target.value }); }}  />
                              </div>
                          </div>
                          <div className="form-group ">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>전화번호</span>
                              </div>
                              <div className="infos">
                                  <input type="number" pattern="[0-9]*" id="user_mobile" name="user_mobile" placeholder="*통화가능한번호 필수입력" value={this.state.phone1} onChange={(e: any) => { this.setState({phone1: e.target.value }); }}   />
                              </div>
                          </div>
                      </div>
                      <div className="form-head">
                          <span className="title"><i className="fa fa-caret-right" aria-hidden="true"></i> 계좌정보</span>
                      </div>
                      <div className="form-container">
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>은행명</span>
                              </div>
                              <div className="infos">
                                  <select id="bank" name="bank" value={this.state.bankname}   onChange={(e: any) => { this.setState({ bankname: e.target.value });}}  >
                                    <option value="">==은행선택하기==</option>
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
                          </div>
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>예금주</span>
                              </div>
                              <div className="infos">
                                  <input type="text" placeholder="영문과 한글만 입력하세요" name="acct_nm"   value={this.state.bankowner} onChange={(e: any) => { this.setState({ bankowner: e.target.value }); }} />
                              </div>
                          </div>
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>계좌번호</span>
                              </div>
                              <div className="infos">
                                  <input type="number" pattern="[0-9]*" placeholder="숫자만 입력하세요." name="acct_no"   value={this.state.banknumber} onChange={(e: any) => { this.setState({ banknumber: e.target.value }); }}   />
                              </div>
                          </div>
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>추천인</span>
                              </div>
                              <div className="infos">
                                  <input type="text" pattern="[0-9]*" placeholder="추천인을 입력하세요." name="acct_no"   value={this.state.code} onChange={(e: any) => { this.setState({ code: e.target.value }); }} />
                              </div>
                          </div>
                      </div>
                      <div className="modal-footer">
                          <div className="btn-grp one-btn">
                              <button type="button" onClick={()=> this.handleReg()} ><i className="fa fa-check-square-o" aria-hidden="true"></i> 회원가입</button>
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
