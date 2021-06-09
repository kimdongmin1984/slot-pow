import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SlotService } from "../../service/slot.service";
import { BalanceService } from "../../service/balance.service";
import { UserService } from "../../service/user.service";

import { ConvertDate2, ConverMoeny, ConvertDate } from "../../utility/help";

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

interface Props {}

interface State {
  mode: string;
  slots: any;
  games: any;
  withdraws: any;
  deposits: any;
  notices: any;
  renderBalance: string;
}

export class BalanceList extends Component<Props, State> {
  balanceService = new BalanceService();
  userService = new UserService();

  constructor(props: any) {
    super(props);
    this.state = {
      renderBalance: "deposit",
      mode: Mode.none,
      slots: [],
      games: [],
      withdraws: [],
      deposits: [],
      notices: [],
    };
  }

  componentDidMount() {
    this.userService.get_user_notices().then((data: any) => {
      if (data.status === "success") {
        this.setState({ notices: data.notices });
      }
    });

    this.balanceService.get_balance_deposit_lock().then((s) => {
      if (s.status === "success") {
        this.setState({ deposits: s.deposits });
      }
    });

    this.balanceService.get_balance_withdraw_lock().then((s) => {
      if (s.status === "success") {
        this.setState({ withdraws: s.withdraws });
      }
    });
  }

  render() {
    const RenderWithdraw = () => {
      return (
        <div
          id="mainDepositList"
          style={
            this.state.renderBalance === "withdraw" ? {} : { display: "none" }
          }
        >
          <ul className="realtimeList" id="mainDepositData">
            {this.state.withdraws.map((contact: any, i: any) => {
              return (
                <li key={`withdraw_key_${contact.idx}`}>
                  <span className="rd_datetime">
                    {ConvertDate2(contact.regdate)}
                  </span>
                  <span className="rd_data">{contact.id}</span>
                  <span className="rd_data">
                    {ConverMoeny(contact.balance)}원
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    const RenderDeposit = () => {
      //   if (this.state.renderBalance === "deposit") return <></>;

      return (
        <div
          id="mainDepositList"
          style={
            this.state.renderBalance === "deposit" ? {} : { display: "none" }
          }
        >
          <ul className="realtimeList" id="mainWithdrawData">
            {this.state.deposits.map((contact: any, i: any) => {
              return (
                <li key={`deposits_key_${contact.idx}`}>
                  <span className="rd_datetime">
                    {ConvertDate2(contact.regdate)}
                  </span>
                  <span className="rd_data">{contact.id}</span>
                  <span className="rd_data">
                    {ConverMoeny(contact.balance)}원
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };
    return (


      <></>
  
      // <div className="customer">
      //   <span className="tele">bestvip1123</span> <span className="phone">010 7380 5162</span>
      // </div>
      // <div className="media_wrap">
      //   <div className="media_box">
      //     <div className="card">
       
      //     </div>
       
      //     <div className="card">
      //       <div className="mainBottomList">
      //         <ul
      //           className="messenger_list"
      //           style={{ margin: "0px", padding: "0px", listStyle: "none" }}
      //         >
      //           <li>
      //             <img src="/web/images/telegram_btn.png" />
      //           </li>
         
      //         </ul>
     
      //           <p
      //           className="messenger_text"
      //           style={{
      //             margin: 0,
      //             padding: 0,
      //           }}
      //         >
      //           고객센터
      //         </p>
      //         <p
      //           className="messenger_text"
      //           style={{
      //             margin: 0,
      //             padding: 0,
      //           }}
      //         >
      //           텔레 ID : @otop66
      //         </p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
