import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import

import { BalanceService } from "../../service/balance.service";
import { SlotService } from "../../service/slot.service";
import { SubMenu } from "./submenu";
import { ConvertDate, HelpStatus, ConvertDate2, ConverMoeny, ConvertBalanceStatus } from "../../utility/help";



export enum helpView {
    none = "none",
    write = "write",
    view = "view",
    detail = "detail",
  }

  
interface Props {
    handleClose: () => any;
    handleActive: (active:string) => any;
}

interface State {
  inBalance: number;
  balance: number;
  pass: string;
  detail: any;
  mode: string;
  deposits : any;
}

export class DepositList extends Component<Props, State> {
  balanceService = new BalanceService();
  slotService = new SlotService();

  constructor(props: Props) {
    super(props);
    this.state = {
      inBalance: 0,
      balance : 0,
      pass : "",
      detail : {},
      mode: helpView.view,
      deposits  : []
    };

  }

  
  componentDidMount() {
    this.balanceService.getWithdrawList().then((data: any) => {
      if (data.status === "success") {
          this.setState({deposits : data.deposits })
      }
    });
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
        onClose={()=>{this.props.handleClose()}}
      >
        {(close) => (
             <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
                 {/* <img className="logo-modal" src="/last/image/logo/logo-footer.png" alt="" /> */}
                 <div className="modal-header">
                     <div className="title text-left">
                         <h5>입금리스트</h5>
                         <span>DEPOSIT</span>
                     </div>
                     <button className="close-btn" data-dismiss="modal"  onClick={()=> this.props.handleClose()}></button>
                 </div>
                 <div className="modal-body">
                     <div className="modal-menu">
                        <button type="button" className="mm-btn withdraw-link" onClick={()=> this.props.handleActive('deposit')}>입금신청</button>
                        <button type="button" className="mm-btn active" onClick={()=> this.props.handleActive('depositlist')}>입금정보</button>
                     </div>
  
                     <table className="bs-table with-depth">
                    <thead>
                      <tr>
                          <th>금액</th>
                          <th>상태</th>
                          <th>신청날짜</th>
                          <th>처리날짜</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.deposits.map((row: any) => {
                        return (
                            
                              <tr className="" >
                                <td className={"td_subject" }>{ConverMoeny(row.balance)}</td>
                                <td className="td_name sv_use hidden visible-lg text-center" style={{width:'15%'}}><span>{ConvertBalanceStatus(row.status)}</span></td>
                                <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.setdate)}</td>
                                <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.regDate)}</td>
                              </tr>

                        )
                      })}

      
                    </tbody>
                </table>

              
                 </div>
             </div>
         </div>
   
        )}
      </Popup>
    );
  }
}
