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
          <ul className="mo_realtimeList" id="mainDepositData">
            {this.state.withdraws.map((contact: any, i: any) => {
              return (
                <li key={`withdraw_key_${contact.idx}`}>
                  <span className="mo_rd_datetime">
                    {ConvertDate2(contact.regdate)}
                  </span>
                  <span className="mo_rd_data">{contact.id}</span>
                  <span className="mo_rd_data">
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
          <ul className="mo_realtimeList" id="mainWithdrawData">
            {this.state.deposits.map((contact: any, i: any) => {
              return (
                <li key={`deposits_key_${contact.idx}`}>
                  <span className="mo_rd_datetime">
                    {ConvertDate2(contact.regdate)}
                  </span>
                  <span className="mo_rd_data">{contact.id}</span>
                  <span className="mo_rd_data">
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
      <div className="mo_media_wrap">
        <div className="mo_media_box">
          <div className="mo_card">
            <div className="mo_mainBottomList">
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
                <li className="mo_noticeTab active" data-value="mainNoticeList">
                  공지사항
                </li>
                <li className="mo_eventTab" data-value="mainEventList">
                  이벤트
                </li>
              </ul>
              {/* <div id="mainNoticeList">
                <table className="mo_boardTable">
                  <tbody id="mainNoticeData">
                    <tr>
                      <td>◈ 계좌발송 변경안내</td>
                      <td>2019-09-30</td>
                    </tr>

                    <tr>
                      <td>◈ 롤링규정 안내문</td>
                      <td>2019-02-06</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
              <div id="mainEventList">
                <table className="mo_boardTable">
                  <tbody id="mainEventData">
                    {this.state.notices.map((contact: any, i: any) => {
                      return (
                        <tr>
                          <td style={{ width: "60%" }}>{contact.title}</td>
                          <td>{ConvertDate(contact.row)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mo_card">
            <div className="mo_mainBottomList">
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
                <li
                  className={
                    this.state.renderBalance === "deposit"
                      ? "depositTab active"
                      : "depositTab"
                  }
                  data-value="mainDepositList"
                  onClick={() => {
                    // ToggleMainBoard(this);
                    this.setState({ renderBalance: "deposit" });
                  }}
                >
                  실시간 입금현황
                </li>
                <li
                  data-value="mainWithdrawList"
                  className={
                    this.state.renderBalance === "withdraw"
                      ? "withdrawTab active"
                      : "withdrawTab"
                  }
                  //   onClick={() => {
                  //     // ToggleMainRealtime(this);
                  //   }}

                  onClick={() => {
                    this.setState({ renderBalance: "withdraw" });
                  }}
                >
                  실시간 출금현황
                </li>
              </ul>
              {RenderDeposit()}
              {RenderWithdraw()}
            </div>
          </div>
          <div className="mo_card">
            <div className="mo_mainBottomList">
              <ul
                className="mo_messenger_list"
                style={{ margin: "0px", padding: "0px", listStyle: "none" }}
              >
                <li>
                  <img src="/web/images/telegram_btn.png" />
                </li>
                <li>
                  <img src="/web/images/skype_btn.png" />
                </li>
                <li>
                  <img src="/web/images/wechat_btn.png" />
                </li>
                <li>
                  <img src="/web/images/kakaolink_btn_medium_ov.png" />
                </li>
              </ul>
              <p
                className="mo_messenger_text"
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                파트너 문의
              </p>
              <p
                className="mo_messenger_text"
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                카톡 ID :
              </p>
              <p
                className="mo_messenger_text"
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                텔레 ID :
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
