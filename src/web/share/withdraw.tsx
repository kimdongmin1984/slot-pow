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
    console.log(this.props.user)
    return (
      <Popup
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
                    <h5>출금신청</h5>
                    <span>WITHDRAW</span>
                </div>
                <button className="close-btn" data-dismiss="modal"  onClick={()=> this.props.handleClose()}></button>
            </div>
            <div className="modal-body">
                <div className="modal-menu">
                    <button type="button" className="mm-btn withdraw-link"  onClick={()=> this.props.handleActive('deposit')}>입금신청</button>
                    <button type="button" className="mm-btn active" >출금신청</button>
                </div>
                {/* <div className="terms-use">
                    <div className="text-cont">
                        <div className="inner">
                        </div>
                        
                    </div>
                </div> */}
                <div className="terms-use">
                    <div className="text-cont">
                        <div className="inner">
                            <p><b><span style={{fontSize: '14pt', color: 'rgb(255, 108, 0)'}}>1. 출금신청시 본인계좌 확인</span></b></p><p><b>
                              <span style={{fontSize: '18pt', color: 'rgb(255, 108, 0)'}}>(<span style={{color: 'rgb(255, 239, 0)', fontSize: '18pt'}}><u><span style={{fontSize: '18pt'}}>계좌번호</span>
                              <span style={{color: 'rgb(166, 207, 0)', fontSize: '18pt'}}><u> 성함</u></span><span style={{fontSize: '18pt'}}>확인 꼭 해주세요.</span></u></span>)</span></b></p><p></p>
                              <p><b><span style={{fontSize: '12pt', color: 'rgb(81, 143, 187)'}}>2. 출금금액 입력후 출금신청 클릭</span></b></p><p>
                                  <span style={{fontSize: '12pt', color: 'rgb(0, 158, 37)'}}><b>3.</b><u ><b> </b></u></span><span style={{fontSize: '12pt', color: 'rgb(0, 158, 37)'}}><u ><b>
                                    <span style={{color: 'rgb(255, 239, 0)'}}><u>순차적으로 출금처리</u></span>가 진행되며 시간이 지연 될 수 있으니 양해 바랍니다.</b></u></span></p>
                            <div className="grammarly-disable-indicator"></div>
                        </div>
                    </div>
                </div>
    
              {
                this.props.user && (
                <div className="form-container">
                  <div className="form-group">
                      <div className="labels">
                          <span className="dot"></span>
                          <span>출금가능금액</span>
                      </div>
                      <div className="infos">
                          <p id="_modal_for_with_user_money">{ConverMoeny(this.state.inBalance)}</p>
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="labels">
                          <span className="dot"></span>
                          <span>출금할 금액</span>
                      </div>
                      <div className="infos">
                          <input type="text" placeholder="최소 1만단위입력"  name="amount"   value={this.state.balance} onChange={(e: any) => { this.setState({ balance :  Number(e.target.value) })}}
                          /> 
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="labels">
                          <span className="dot"></span>
                          <span>은행명</span>
                      </div>
                      <div className="infos">
                          <input type="text" placeholder="경남" readOnly value={this.props.user.bankname}  />
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="labels">
                          <span className="dot"></span>
                          <span>출금계좌</span>
                      </div>
                      <div className="infos">
                          <input type="text" placeholder="11***" readOnly  value={this.props.user.banknum} />
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="labels">
                          <span className="dot"></span>
                          <span>예금주</span>
                      </div>
                      <div className="infos">
                          <input type="text" placeholder="1**" readOnly  value={this.props.user.bankowner}/>
                      </div>
                  </div>
      
            </div>)
              }
                <div className="modal-footer">
                    <div className="btn-grp">
                        <button type="button"  onClick={()=>this.handleDoWithdraw()}><i className="fa fa-check-square-o" aria-hidden="true"></i> 출금신청</button>
                        <button type="button" className="gray" data-dismiss="modal" onClick={()=> this.props.handleClose()}><i className="fa fa-window-close" aria-hidden="true"></i> 취소하기</button>
                    </div>
                </div>
            </div>
        </div>
        </div>


        // <div className="modal fade show" id="WithdrawalAndDepositModal"  role="dialog" aria-labelledby="WithdrawalAndDepositModalTitle" style={{paddingRight: '17px', display: 'block'}} aria-modal="true">
        // <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        //   <div className="modal-content">
        //       <div className="modal-body">
        //         <button data-dismiss="modal" className="mdl-close pt-0 p-3 " style={{float: 'right', background: 'transparent', color: '#fff', border: 'none', fontSize: '20px'}}  onClick={()=>{this.props.handleClose()}}><i className="fa fa-times" aria-hidden="true"></i></button>
        //         <h4>출금신청 <span style={{color: '#555', fontSize: '20px'}}>Money Change</span></h4>
        //         <img src="/light/images/background/site-flash.svg" className="w-100" style={{marginTop: '-25px'}} />
        //         <div className="_menu_modal_head_button d-flex">
        //           <button className="_menu_tabs_btn _openWithdrawalTabs active">출금신청</button>
        //         </div>
        //         <div className="_deposit_tabs" >	        		
        //           <div className="_modal_box_infomation">
        //             <p style={{color: '#ffd200'}}>수표입금시 입금처리 절대 되지 않습니다.</p>
        //             <p><span style={{color: '#00f0ff'}}>최소 입금액은 3만원이상, 만원단위</span>로 신청가능, 입금전 반드시 계좌문의 하시기바랍니다.</p>
        //           </div>
        //           <div className="_form_tables my-3">
        //             <table className="w-100">
        //               <tbody><tr>
        //                 <td style={{width: '20%'}}>입금금액	</td>
        //                 <td>
        //                   <div className="d-flex _table_form_inputs">	
        //                     <input type="text" name="" className="w-100 _deposit_input" value={this.state.balance} onChange={(e: any) => {
                              
                              
        //                       this.setState({ balance :  Number(e.target.value) })}}/>
                            
        //                   </div>
        //                   <div className="_table_form_inputs mt-2">
        //                     <button onClick={() => { this.setState({ balance: this.state.balance + 30000})}}>3만원</button>
        //                     <button  onClick={() => { this.setState({ balance: this.state.balance + 50000})}}>5만원</button>
        //                     <button onClick={() => { this.setState({ balance: this.state.balance + 100000})}}>10만원</button>
        //                     <button  onClick={() => { this.setState({ balance: this.state.balance + 300000})}}>30만원</button>
        //                     <button  onClick={() => { this.setState({ balance: this.state.balance + 500000})}}>50만원</button>
        //                     <button  onClick={() => { this.setState({ balance: this.state.balance + 1000000})}}>100만원</button>
        //                     <button onClick={() => { this.setState({ balance: 0})}}>정정하기</button>

        //                   </div>
        //                 </td>
        //               </tr>
        //               <tr>
        //                 <td>입금계좌	</td>
        //                 <td>고객센터로 문의해 주시기 바랍니다.</td>
        //               </tr>
        //             </tbody></table>
        //           </div>
        //           <div className="_modal_box_infomation">
        //             <p>23:50 ~ 00:30, 휴일 다음 첫 영업일 새벽에는 은행점검으로 인해 계좌이체가 지연될 수 있습니다.</p>
        //             <p>위 시간 이외에도 몇몇 은행은 추가적 점검시간이 따로 있으니 이점 유념하시기 바랍니다.</p>
        //           </div>
        //           <div className="text-center mt-4">
        //             <button className="_modal_bottom_button_type_1 " onClick={()=>this.handleDoWithdraw()}>입금신청</button>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
  

          // <div className="depositModal modal fade in" style={{display: 'block', paddingRight: '17px'}}>
          //   <div className="dep_with_modal cg_modal modal-dialog">
          //     <div className="header">
          //       <i className="fa fa-credit-card"></i>
          //       <p>출금신청  <span>WITHDRAW</span></p>
          //       <button data-dismiss="modal"  onClick={()=>{this.props.handleClose()}}></button>
          //     </div>
          //     <div className="modal_body">
          //     <form id="_frm_charge" name="_frm_charge">
          //       <div className="form-group">
          //         <div>
          //           <p><i className="fa fa-angle-right" aria-hidden="true"></i>  금액</p>
          //         </div>
          //         <div>
          //           <p>{ConverMoeny(this.state.inBalance)}</p>
          //         </div>
          //       </div>
                
          //       <div className="form-group">
          //         <div>
          //           <p><i className="fa fa-angle-right" aria-hidden="true"></i>  출금금액</p>
          //         </div>
          //         <div>
          //           <input type="text" id="in_req_money" name="_n_money" className="__number" placeholder="최소단위는 3만원이상입니다 (수표절대금지)"  value={this.state.balance} 
          //               onChange={(e: any) => {
          //                 this.setState({ balance : e.target.value });
          //               }}
          //           />
          //           <div className="btn_grp">
          //             <button type="button" className="_set_money" data-target="in_req_money" data-v="10000" 
          //               onClick={() => {
          //                 this.setState({
          //                   balance: this.state.balance + 10000,
          //                 });
          //               }}>1만원</button>
          //             <button type="button" className="_set_money" data-target="in_req_money" data-v="30000" 
          //               onClick={() => {
          //                 this.setState({
          //                   balance: this.state.balance + 30000,
          //                 });
          //               }}>3만원</button>
          //             <button type="button" className="_set_money" data-target="in_req_money" data-v="50000"
          //               onClick={() => {
          //                 this.setState({
          //                   balance: this.state.balance + 50000,
          //                 });
          //               }}>5만원</button>
          //             <button type="button" className="_set_money" data-target="in_req_money" data-v="100000"
          //               onClick={() => {
          //                 this.setState({
          //                   balance: this.state.balance + 100000,
          //                 });
          //               }}>10만원</button>
          //             <button type="button" className="_set_money" data-target="in_req_money" data-v="500000"
          //               onClick={() => {
          //                 this.setState({
          //                   balance: this.state.balance + 500000,
          //                 });
          //               }}>50만원</button>
          //             <button type="button" className="_set_money" data-target="in_req_money" data-v="0"
          //               onClick={() => {
          //                 this.setState({
          //                   balance: 0,
          //                 });
          //               }}
          //             >정정하기</button>
          //           </div>

          //         </div>
          //       </div>
          //     </form>

          //     <div className="modal_btn_grp">
          //       <button id="_charge_submit" onClick={()=>this.handleDoWithdraw()}>출금하기</button>
          //       <button id="_charge_cancel" data-dismiss="modal" onClick={()=>this.props.handleClose()}>취소하기</button>
          //     </div>
          //     </div>
          //   </div>
          //   </div>
              
        )}
      </Popup>
    );
  }
}
