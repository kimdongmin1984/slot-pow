import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { confirmAlert } from "react-confirm-alert"; // Import

import { SlotService } from "../../service/slot.service";

export enum Mode {
  none = "none",
  game = "game",
  slot = "slot",
}

interface Props {}

interface State {
  mode: string;
  name: string;
  
  slots: any;
  games: any;
  withdraws: any;
  deposits: any;
  isOpen : boolean

}

export class Companylist extends Component<Props, State> {
  slotService = new SlotService();

  constructor(props: any) {
    super(props);
    this.state = {
      mode: Mode.none,
      name : '',
      slots: [],
      games: [],
      withdraws: [],
      deposits: [],
      isOpen : false,

    };
  }

  componentDidMount() {
    this.slotService.getSlotSetting().then((s) => {
      if (s.status === "success") {
        this.setState({ slots: s.slot, mode: Mode.slot });
      }
    });
  }

  handleOpenSlot = (code: string, company : string) => {
    if(this.state.isOpen === true){
      confirmAlert({
        title: "게임",
        message: "현재 게임이 실행중입니다 잠시 대기해주세요.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
          },
        ],
      });

      return 
    }

    this.setState({isOpen : true})

    this.slotService.OpenSlot(code, company).then((data: any) => {

      this.setState({isOpen : false})

      if (data.status === "success") {
        let timn = new Date().getTime();
        window.open(data.gameUrl, "Data", "height=800,width=1400");
      } else if (data.status === "fix_server") {
        // this.setState({
        //   popupStatus: PopupStatus.CasinoFix,
        //   CallPrimary: () => {
        //     this.ClosePop();
        //   },
        // });
      } else {
        // this.setState({
        //   popupStatus: PopupStatus.CasinoPermission,
        //   CallPrimary: () => {
        //     this.ClosePop();
        //   },
        // });
      }
    });
  };

  handleGame = (name: string) => {
    this.slotService.get_slot_by_company(name).then((s: any) => {
      if (s.status === "success") {
        this.setState({ games: s.games, mode: Mode.game });
      }
    });
  };

  RenderSlot = (info: any) => {

    return (
      <li
        className={info.nameEn}
        onClick={() => {
          if (info.used === "y") {
            this.setState({ mode: Mode.none, name : info.nameKo  });
            this.handleGame(info.code);
          } else {
            confirmAlert({
              title: "점검중",
              message: "현재 해당게임은 점검중입니다 .",
              buttons: [
                {
                  label: "확인",
                  onClick: () => {},
                },
              ],
            });
          }
        }}
      >

             <img src={`${info.mobileImg}`}  style={{width : "100%"}}/>

        {/* <div style={{backgroundImage: `url(${info.mobileImg})`}}> */}
          {/* <span className="studio">{info.nameKo}</span> */}
          {/* <span className="ico">
            <img src={`/web/images/icon-${info.nameEn}.png`} />
          </span> */}
          {/* <span className="text">{info.nameKo}</span>
          <span className="play">플레이하기</span> */}
        {/* </div> */}
      </li>
    );
  };

  RenderGame = (info: any) => {
    return (
      <li
        className={info.nameEn}
        onClick={() => {
          this.handleOpenSlot(info.code, info.gameCompany);
        }}

        style={{
          top: "65%",
          height:"180px"
        }}
      >
        <span>
          <strong>

          
          <p
            className="studio"
            style={{
               top: "85%",
               textAlign: "center",
               //  left: "50%",

              //  transform: `translateX(-40%) translateY(50%)`,
            }}
          >
            {info.nameKo}
          </p>
          </strong>


          <img
            src={`${info.imgUrl}`}
            style={{
               maxWidth: "100%",
            }}
          />
          {/* <span className="text">{info.nameKo}</span>
          <span className="play">{info.nameKo}</span> */}
        </span>
      </li>
    );
  };

  render() {
    if (this.state.mode === Mode.none) {
      return (
        <div className="mo_game_wrap">
          <div className="mo_game_box">
            <div
              style={{
                textAlign: "center",
                zoom: 10,
              }}
            >
              <CircularProgress />
            </div>
          </div>
        </div>
      );
    }

    if (this.state.mode === Mode.game) {
      return (
        <div className="mo_game_wrap">
          <div className="mo_game_box">
            <div className="mo_slots">
              {this.state.games.map((row: any) => this.RenderGame(row))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mo_game_wrap">
        <div className="mo_game_box">
          <div className="mo_slots">
          <ul style={{padding: 0, margin : 5}}>

            {this.state.slots.map((row: any) => this.RenderSlot(row))}
            </ul>

          </div>
        </div>
      </div>
    );
  }
}
