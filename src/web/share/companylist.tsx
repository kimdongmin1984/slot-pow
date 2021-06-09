import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { confirmAlert } from "react-confirm-alert"; // Import
import { ViewGame  } from "./viewgame";

import { SlotService } from "../../service/slot.service";

export enum Mode {
  none = "none",
  game = "game",
  slot = "slot",
}

interface Props {}

interface State {
  mode: string;
  slots: any;
  gameCode : any;
  games : any; 
  name : string;
}

export class Companylist extends Component<Props, State> {
  slotService = new SlotService();

  constructor(props: any) {
    super(props);
    this.state = {
      mode: Mode.none,
      slots: [],
      gameCode : '',
      name : '',
      games : []
    };
  }

  componentDidMount() {
    this.slotService.getSlotSetting().then((s) => {
      if (s.status === "success") {
        this.setState({ slots: s.slot, mode: Mode.slot });
      }
    });
  }

  handleOpenSlot = (code: string, company : string ) => {
    this.slotService.OpenSlot(code, company).then((data: any) => {
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


  handleGame = (name: string, nameKo: string) => {
    this.slotService.get_slot_by_company(name).then((s: any) => {
      if (s.status === "success") {
        const oriArray = s.games 
        let temp : any= []
        const division = 6
        const cnt = Math.floor(oriArray.length / division) + (Math.floor(oriArray.length / division) > 0 ? 1 : 0)

        for(var i = 0 ; i < cnt; i++)
        {
          temp.push(oriArray.splice(0, division))
        }

        this.setState({ games: temp, mode: Mode.game , gameCode : name, name : nameKo});
      }
    });
  };

  RenderSlot = (info: any) => {

    return (
        <a className="slot-btn gl-title-click"
        
          onClick={() => {
            if (info.used === "y") {
              this.handleGame(info.code, info.nameKo)
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
          <div className="inner">
            <img className="slot-bg" src="/web/images/slot-bg.png" style={{opacity : 100}} />
            <div className="hover-bg">
              <span></span><span></span><span></span><span></span>
            </div>
            <div className="slot-cont">
              <img className="slot-img" src={info.mobileImg} />
            </div>
          </div>
        </a>

    );
  };
  
  RenderGame = () => {
     return (
      <div style={{   opacity: 1,
        visibility: 'visible',
        position: 'fixed',
        overflow: 'auto',
        zIndex: 100001,
        transition: 'all 0.3s ease 0s',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        textAlign: 'center',
        backgroundColor: '#000',
        display: 'block'}}>

      <div id="fade_3" className="expandOpen popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_55563334" 
        style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle'}}>
        <div className="popup_wrap">
          <div className="close_box">
            <a onClick={()=>{
              this.setState({ mode: Mode.slot });
            }} className="fade_3_close"><img src="/web/images/popup_close.png" /></a>
          </div>
          <div className="popupbox_ajax"><div>
          <div className="title1">
            &nbsp;&nbsp;&nbsp;{this.state.name} 슬롯
          </div>
            <div style={{width:'100%', marginTop:'-5px'}}>
            <table>
              <tbody><tr>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table>
                    <tbody><tr>
                      <td>
                        <table>
                          <tbody>
                            {
                              Object.values(this.state.games ?? []).map((games :any) =>{
                                return (
                                  <tr>
                                    {
                                        Object.values(games).map((game : any) =>{
                                    
                                          return (
                                          <td style={{width: 220, paddingBottom : 20}} onClick={()=>{
                                            this.handleOpenSlot(game.code, game.gameCompany)
                                          }}>
                                            <table>
                                            <tbody>
                                            <tr>
                                              <td>
                                                <div>
                                                  <a style={{cursor:'pointer'}}>
                                                    <img src={game.imgUrl} id="xImag" width="170" height="170" /></a>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td >
                                                <div style={{textAlign:'center', position: 'absolute',width:'170px'}}>
                                                  <span className="slot_txt_style">{game.nameKo}</span>
                                                </div>
                                              </td>
                                            </tr>
                                            </tbody>
                                            </table>
                                          </td>
                                          )
                                        })
                                      }
                                </tr>
                            )})

                            }
                    
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                </tr>
                </tbody>
              </table>

              <div className="con_box20">
                <div className="btn_wrap_center">
                  <ul>
                    <li>
                      <a  onClick={()=>{this.setState({ mode: Mode.slot });}} >
                        <span className="btn3_1">목록으로</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div> 
              <div className="con_box20">
                <div className="btn_wrap_center">

                </div>
              </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
   };

  render() {
      // if (this.state.mode === Mode.none) {
      //   return (
      //     <div id="contents_wrap">
      //       <div className="sc-inner"></div>
      //       <div className="game_wrap">
      //         <div className="game_box">
      //           <div
      //             style={{
      //               textAlign: "center",
      //               zoom: 10,
      //             }}
      //           >
      //             <CircularProgress />
      //           </div>
      //         </div>
      //       </div>
      //       </div>
      //   );
      // }
  
      return (
        <div id="contents_wrap">
        <div className="sc-inner">

        {this.state.mode === Mode.game && this.RenderGame()}

        {this.state.slots.map((row: any) => this.RenderSlot(row))}

        </div>
    {/* <div className="game_wrap">
          <div className="game_box">
            <ul className="slots"> */}
            {/* </ul>
          </div>
          </div> */}
          </div>
      );
  
    
  }
}
