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
  view = "view",
  detail = "detail",
}

interface Props {
  handleClose: () => any;
  handleActive: (active:string) => any;
}

interface State {
  notes : any;
  mode : string
  detail : any;
}

export class Note extends Component<Props, State> {
  balanceService = new BalanceService();
  userService = new UserService();

  constructor(props: any) {
    super(props);
    this.state = {
        notes: [],
        mode : Mode.view,
        detail : {}
    };
  }


  componentDidMount() {
    this.handleGetNote(1)

  }

  handleGetNote = (skip : number) =>{
    this.userService.get_user_note_list().then((data: any) => {
        if (data.status === "success") {
           this.setState({
             notes: data.note,
           });
      
        }
      });
  }

    
  handleDelNote = () => {

      confirmAlert({
        title: "쪽지",
        message: "쪽지 정보를 삭제하면 복구할수 없습니다.",
        buttons: [
          {
            label: "확인",
            onClick: () => {
              this.userService.do_del_all_note().then((date: any) => {})

              this.props.handleClose();
            },
          },
          {
            label: "취소",
            onClick: () => {
            },
          },
        ],
      });
      return 
  }

  
  handleDoReadNote = (id : string) => {
      this.userService.do_read_note(id).then((date: any) => {})
  }
  


  render() {
    

      let notes = this.state.notes;

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
                              <button data-dismiss="modal" className="mdl-close pt-0 p-3 " style={{float: 'right', background: 'transparent', color: '#fff', border: 'none', fontSize: '20px', paddingTop: '0!important'}}  onClick={()=>this.props.handleClose()}><i className="fa fa-times" aria-hidden="true" ></i></button>
                              <h4>쪽지함 <span style={{color: '#555', fontSize: '20px'}}>My Page</span></h4>
                              <img src="/light/images/background/site-flash.svg" className="w-100" style={{marginTop: '-25px'}} />

                              <div className="_menu_modal_head_button d-flex">
                                <button className="_menu_tabs_btn _openWithdrawalTabs " >회원정보</button>
                                <button className="_menu_tabs_btn _openWithdrawalTabs active" onClick={()=>{ this.props.handleActive('note')}}>쪽지함</button>
                                <button className="_menu_tabs_btn _openWithdrawalTabs " onClick={()=>{ this.props.handleActive('balance')}}>입출금 기록</button>
                              </div>
                

                              <div className="_notice_tables">
                              {
                                  this.state.mode ===  Mode.view && (
                                    <div className="_service_modal_one" >	
                                      <table className="w-100 text-center _table_design_one">
                                        <tr>
                                          <td>제 목</td>
                                          <td>작성일</td>
                                          <td>상태</td>
                                        </tr>
                                        {notes.map((row: any) => {
                                          return (
                                            <tr className=""  onClick={()=>{
                                                this.setState({detail : row, mode :  Mode.detail})
                                              }}>
                                              <td className="td_subject text-left" style={{color : row.title_color}}>{row.title}</td>
                                              <td className="td_name sv_use hidden visible-lg text-center" style={{width:'15%'}}><span>관리자</span></td>
                                              <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.regDate)}</td>
                                            </tr>
                                          )
                                        })}
                          
                                      </table>
                                  
                                    </div>
                                    )
                                }

                                {
                                  this.state.mode ===  Mode.detail && (
                                    <div className="_service_modal_one" >	

                                      <div className="_next_table_content" style={{height: 500, overflow: 'hidden', padding: 0,  overflowY: 'auto'}}>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.detail.text }}     ></div>        

                                      </div>

                                      <div className="text-center mt-4 d-flex">
                                          <button className="_modal_bottom_button_type_1 _service_goBack"  onClick={() => { this.setState({ mode: Mode.view}); }}>뒤로가기</button>
                                        </div>
                                    </div>

                                  )
                                }
                            
                          
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
