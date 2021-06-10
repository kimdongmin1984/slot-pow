import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SlotService } from "../../service/slot.service";
import { BalanceService } from "../../service/balance.service";
import { UserService } from "../../service/user.service";
import { confirmAlert } from "react-confirm-alert"; // Import

import { ConvertDate2, ConverMoeny, ConvertDate , ConvertBalanceStatus} from "../../utility/help";

// import {
//   ToggleMainBoard,
//   ToggleMainRealtime,
// } from "./../../../public/web/js/showid";

// {
//   /* <script type="text/javascript" src="/web/js/showid.js"></script> */
// }

export enum Mode {
  none = "none",
  game = "game",
  slot = "slot",
}

interface Props {
  handleClose: () => any;
  handleActive: (active:string) => any;
}

interface State {
  balances: any;
}

export class BalanceList extends Component<Props, State> {
  balanceService = new BalanceService();
  userService = new UserService();

  constructor(props: any) {
    super(props);
    this.state = {
      balances: [],
    };
  }


  componentDidMount() {
    this.handleGetBalance(1)

  }

  handleGetBalance = (skip : number) =>{
    this.balanceService.get_deposit_and_withdraw(skip).then((data: any) => {
        if (data.status === "success") {
          this.setState({ balances: data.balances });
        }
    });

  }

    
  handleDelBalance = () => {

      confirmAlert({
        title: "충환전 정보",
        message: "충환전 정보를 삭제하면 복구할수 없습니다.",
        buttons: [
          {
            label: "확인",
            onClick: () => {
              this.balanceService.delAllBalance().then((date: any) => {})

              this.props.handleClose();
            },
          },
          {
            label: "취소",
            onClick: () => {
              this.props.handleClose();
            },
          },
        ],
      });
      return 
  }


  render() {
    

      let balances = this.state.balances;

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
          onClose={() => {}}
        >
          {(close) => (
                     <div className="modal fade show" id="WithdrawalAndDepositModal"  role="dialog" aria-labelledby="WithdrawalAndDepositModalTitle" style={{paddingRight: '17px', display: 'block'}} aria-modal="true">
                     <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                       <div className="modal-content">
                           <div className="modal-body">
                             <button data-dismiss="modal" className="mdl-close pt-0 p-3 " style={{float: 'right', background: 'transparent', color: '#fff', border: 'none', fontSize: '20px'}}  onClick={()=>{this.props.handleClose()}}><i className="fa fa-times" aria-hidden="true"></i></button>
                             <h4>입출금리스트  <span style={{color: '#555', fontSize: '20px'}}>My Page
                             </span></h4>
                             <img src="/light/images/background/site-flash.svg" className="w-100" style={{marginTop: '-25px'}} />
                             <div className="_menu_modal_head_button d-flex">
                               <button className="_menu_tabs_btn _openWithdrawalTabs " onClick={()=>{ this.props.handleActive('edit')}}>회원정보</button>
                               <button className="_menu_tabs_btn _openWithdrawalTabs " onClick={()=>{ this.props.handleActive('note')}}>쪽지함</button>
                               <button className="_menu_tabs_btn _openWithdrawalTabs active" onClick={()=>{ this.props.handleActive('balance')}}>입출금 기록</button>
                             </div>
                         
                               <div className="_form_tables my-3">
                                                    
                                  <div className="_myPageTabs _myPage_content_4" >
                                    <table className="w-100 text-center _table_design_one">
                                      <tr>
                                        <td>날짜</td>
                                        <td>타입</td>
                                        <td>금액</td>
                                        <td>상태</td>
                                      </tr>
                                  

                                       
                                      {balances.map((row: any) => {
                                        return (
                                          <tr style={{borderTop:'1px solid #333', background: '#222'}}>
                                            <td>{ConvertDate(row.regdate)}7</td>
                                            <td>{row.type === 'deposit' ? '입금' : '출금'}</td>
                                            <td>{ConverMoeny(row.balance)}원</td>
                                            <td>{ConvertBalanceStatus(row.status)}</td>
                                          </tr>
                                        )
                                      })}
                                     </table>
                                  </div>

                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
            //   <div className="eventModal modal fade in" role="dialog" style={{display: 'block', paddingRight: '17px'}} data-key="0">
            //   <div className="mypage_modal cg_modal modal-dialog" style={{height: '900px'}}>
            //     <div className="header">
            //       <i className="fa fa-exclamation-triangle"></i>
            //       <p>입출금리스트 <span>MYPAGE</span></p>
            //       <button data-dismiss="modal" onClick={()=>this.props.handleClose()}></button>
            //     </div>
            //     <div className="modal_body">
            //       <div className="board_head">
            //         <button className ={''} onClick={()=>{ this.props.handleActive('edit') }}>
            //           <span>
            //             나의 정보
            //           </span>
            //         </button>
            //         <button  className ={'active'}  onClick={()=>{}}>
            //           <span>입출금리스트</span>
            //         </button>
            //         <button  className ={''}  onClick={()=>{ this.props.handleActive('note')}}>
            //           <span>
            //             쪽지
            //           </span>
            //         </button>
            //         <button  className ={''}  onClick={()=>{ this.props.handleActive('bet')}}>
            //           <span>
            //             배팅/원
            //           </span>
            //         </button>
            //       </div>
            //       <div className="board_event">
                    
        
            //         <div className="col-xs-12 zero-padding">
            //             <table className="table table-hover text-center bottom-3b _table_n">
            //               <caption className="sr-only">faq 목록</caption>
            //               <thead>
            //                 <tr className="bg-primary">
            //                   <th scope="col" className="text-center">구분</th>
            //                   <th scope="col" className="hidden visible-lg text-center w100">금액</th>
            //                   <th scope="col" className="text-center w90"><a className="link-inverse">상태</a></th>
            //                   <th scope="col" className="text-center w90"><a className="link-inverse">날짜</a></th>
            //                 </tr>
            //               </thead>
            //               <tbody>
                            
            //               {balances.map((row: any) => {
            //                 return (
            //                   <tr className=""  >
            //                     <td className="td_subject text-left" style={{ textAlign : 'center'}}>
                                
            //                       {
            //                         row.type === 'deposit' && <button className="d_btn">입금</button>
            //                       }
            //                       {
            //                         row.type === 'withdraw' && <button className="w_btn">출금</button>
            //                       }
            //                     </td>
            //                     <td className="td_subject text-left" style={{textAlign : 'center'}}>{ConverMoeny(row.balance)}</td>
            //                     <td className="td_name sv_use hidden visible-lg text-center" style={{width:'15%'}}><span>{ConvertBalanceStatus(row.status)}</span></td>
            //                     <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.regdate)}</td>
            //                   </tr>
            //                 )
            //               })}
                  
            //               </tbody>
            //             </table>
            //           </div>
                      
            //           <div className="text-align: center; margin-top: 30px;">
            //             <span className="active" onClick={()=>this.handleDelBalance()}><span className="btn btn-danger" >입출금내역 전체삭제</span></span>
            //           </div>
            //           <div className="col-xs-12 zero-padding">

            //       </div>
  
         
  
            //       </div>
            //     </div>
            //    </div>
            // </div>
          )}
        </Popup>
    );
  }
}
