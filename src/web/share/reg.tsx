import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { UserService } from "../../service/user.service";
import { runInThisContext } from "vm";

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
      phone1: "010",
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
        message: "아이디를 입력 또는 4자리 이상 20자리 이하로 작성해주세요",
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
        message: "아이디를 입력 또는 4자리 이상 20자리 이하로 작성해주세요",
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
      this.state.pass_check.length < 4 

    ) {
      confirmAlert({
        title: "회원 가입",
        message: "비밀번호를 확인해주세요 . 비밀번호는 최소 4자리를 사용하셔야합니다",
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
          background: "#000",
          border: "none",
          width: "none",
        }}
        
        overlayStyle={{
          overflow: 'scroll'
        }}
      >
        {(close) => (
          <div  id="fade_2"  className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle', overflowY : 'auto'}}>
          <div className="popup_wrap">
            <div className="close_box">
              <a onClick={()=>{ this.props.handleClose() }}  className="fade_3_close"><img src="/web/images/popup_close.png" /></a>
            </div>
            <div className="popupbox_ajax">
        
        
        
        
        <form id="frm_join" name="frm_join">
              <div className="title1">
                회원가입
              </div>
              <div className="contents_in_2">
                
                 <div className="con_box00">
              <table  className="write_title_top">
                <tbody><tr>
                  <td className="write_title">이름</td>
                  <td className="write_td"></td>
                  <td className="write_basic"><input className="input1" name="membername" type="text" id="membername"      value={this.state.bankowner} onChange={(e: any) => { this.setState({ bankowner: e.target.value }); }}  /><span> ( 입금과 출금시 사용하시는 실제 예금주명으로 기입하여 주시기 바랍니다 )</span></td>
                </tr>    
                <tr>
                  <td style={{height:'5px'}}></td>
                </tr> 
                
                <tr>
                  <td className="write_title">ID</td>
                  <td className="write_td"></td>
                  <td className="write_basic">
                    <input className="input1" name="memberid" type="text" id="memberid" value={this.state.id} onChange={(e: any) => { this.setState({ id: e.target.value }); }}/> 
                    <a onClick={() => { this.handleCheck(); }}><span className="btn1_1">중복확인</span></a>
                    <span>아이디는 4자리 이상 사용하시길 바람니다</span>

                    </td>
                    
                </tr> 
                <tr>
                  <td  style={{height:'5px'}}></td>
                </tr> 
                
        
                <tr>
                  <td className="write_title">비밀번호</td>
                  <td className="write_td"></td>
        
                  <td className="write_basic">
                    <input className="input1" name="memberpw" type="password" id="memberpw" placeholder="4자리 이상 ~ 16자리 (영문, 숫자)" value={this.state.pass} onChange={(e: any) => { this.setState({ pass: e.target.value }); }}/>
                    <span>4자리 이상 ~ 16자리 (영문, 숫자) </span>
                    </td>
                </tr>
                <tr>
                  <td  style={{height:'5px'}}></td>
                </tr> 
                
                
                <tr>
                  <td className="write_title">비밀번호 확인</td>
                  <td className="write_td"></td>
        
                  <td className="write_basic"><input className="input1" name="confirmpw" type="password" id="confirmpw" value={this.state.pass_check} onChange={(e: any) => { this.setState({ pass_check: e.target.value }); }}/></td>
                </tr> 
                <tr>
                  <td  style={{height:'5px'}}></td>
                </tr> 
                
        
                <tr>
                  <td className="write_title">은행선택</td>
                  <td className="write_td"></td>
        
                  <td className="write_basic">
                    <select className="input1" name="bankname" id="bankname" value={this.state.bankname}   onChange={(e: any) => { this.setState({ bankname: e.target.value });}}>
                      <option value="">은행선택</option>
                       <option value="기업은행">기업은행</option>
                       <option value="국민은행">국민은행</option>
                       <option value="외환은행">외환은행</option>
                       <option value="수협">수협</option>
                       <option value="농협중앙회">농협중앙회</option>
                       <option value="단위농협">단위농협</option>
                       <option value="우리은행">우리은행</option>
                       <option value="SC제일은행">SC제일은행</option>
                       <option value="한국씨티은행">한국씨티은행</option>
                       <option value="대구은행">대구은행</option>
                       <option value="부산은행">부산은행</option>
                       <option value="광주은행">광주은행</option>
                       <option value="제주은행">제주은행</option>
                       <option value="전북은행">전북은행</option>
                       <option value="경남은행">경남은행</option>
                       <option value="새마을금고">새마을금고</option>
                       <option value="신협중앙회">신협중앙회</option>
                       <option value="상호저축은행">상호저축은행</option>
                       <option value="산림조합중앙회">산림조합중앙회</option>
                       <option value="우체국">우체국</option>
                       <option value="하나은행">하나은행</option>
                       <option value="신한은행">신한은행</option>
                       <option value="케이뱅크">케이뱅크</option>
                       <option value="카카오뱅크">카카오뱅크</option>
                       <option value="유안타증권">유안타증권</option>
                       <option value="KB증권">KB증권</option>
                       <option value="미래에셋">미래에셋</option>
                       <option value="대우증권">대우증권</option>
                       <option value="한국투자증권">한국투자증권</option>
                       <option value="삼성증권">삼성증권</option>
                       <option value="우리투자증권">우리투자증권</option>
                       <option value="SK증권">SK증권</option>
                       <option value="신한금융투자">신한금융투자</option>
                       <option value="하이증권">하이증권</option>
                       <option value="HMC증권">HMC증권</option>
                       <option value="대신증권">대신증권</option>
                       <option value="하나대투증권">하나대투증권</option>
                       <option value="동부증권">동부증권</option>
                       <option value="유진증권">유진증권</option>
                       <option value="메리츠증권">메리츠증권</option>
                       <option value="신영증권">신영증권</option>
                        <option value="미래에셋증권">미래에셋증권</option>
                        <option value="동양증권">동양증권</option>
                        <option value="현대증권">현대증권</option>
                        <option value="신한금융투자증권">신한금융투자증권</option>
                        <option value="주택은행">주택은행</option>
                        <option value="산업은행">산업은행</option>
                    </select>
                    <span id="banknmId" style={{display: 'none'}}><input className="input1" name="banknm" type="text" id="banknm"  placeholder="은행명직접입력" /></span>
                  </td>
                </tr> 
                <tr>
                  <td style={{height:'5px'}}></td>
                </tr> 
                
        
                <tr>
                  <td className="write_title">계좌번호</td>
                  <td className="write_td"></td>
        
                  <td className="write_basic">
                    <input className="input1" name="accountnumber" type="text" id="accountnumber" placeholder="계좌번호를 입력하세요"  value={this.state.banknumber} onChange={(e: any) => { this.setState({ banknumber: e.target.value }); }}/>
                    <span>( 띄어쓰기와 - 없이 숫자로만 기입하여 주시기 바랍니다 )</span>
                  </td>
                </tr>    
                <tr>
                  <td style={{height:'5px'}}></td>
                </tr> 
                
                
                <tr>
                  <td className="write_title">핸드폰</td>
                  <td className="write_td"></td>
        
                  <td className="write_basic">
                  <select className="input1" name="mobile" id="mobile"  value={this.state.phone1}  onChange={(e: any) => { this.setState({ phone1: e.target.value }); }}
                  >
                      <option value="010" >010</option>
                      <option value="011">011</option>
                      <option value="016">016</option>
                      <option value="017">017</option>
                      <option value="018">018</option>
                      <option value="019">019</option>
                    </select> 
                  - <input className="input1" type="tel" name="mobile2" id="mobile2" value={this.state.phone2} onChange={(e: any) => { this.setState({ phone2: e.target.value }); }}

                  /> - <input className="input1" type="tel" name="mobile3" id="mobile3"   value={this.state.phone3} onChange={(e: any) => { this.setState({ phone3: e.target.value }); }}/>
                  
                  
                  
                  
                  </td>
                </tr>     
           
                <tr>
                  <td  style={{height:'5px'}}></td>
                </tr> 
                
        
                <tr>
                  <td className="write_title">지인추천 ID</td>
                  <td className="write_td"></td>
        
                  <td className="write_basic">
                    <input className="input1" name="recommend_id" type="text" id="recommend_id"        value={this.state.code} onChange={(e: any) => { this.setState({ code: e.target.value });}}/>
                    <span>
               
                    </span>
                  </td>
                </tr>
        
                      
        
        
        
              </tbody></table>
            </div>
            <div className="con_box10">
              <div className="btn_wrap_center">
                <ul>
                  <li><a  onClick={() => { this.handleReg();}}><span className="btn3_1">회원가입완료</span></a></li>
                </ul>
              </div>
            </div>
        
        
     
        </div></form></div>
          </div>
        </div>
        )}
      </Popup>
    );
  }
}
