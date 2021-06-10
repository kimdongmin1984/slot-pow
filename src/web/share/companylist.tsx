import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { confirmAlert } from "react-confirm-alert"; // Import
import { ViewGame  } from "./viewgame";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import { ConvertDate2, ConverMoeny, ConvertDate } from "../../utility/help";

import { SlotService } from "../../service/slot.service";
import { BalanceService } from "../../service/balance.service";

export enum Mode {
  none = "none",
  game = "game",
  slot = "slot",
}

interface Props {}

interface State {
  mode: string;
  slots: any;
  casionos: any;
  
  gameCode : any;
  games : any; 
  name : string;
  withdraws: any;
  deposits: any;
}

export class Companylist extends Component<Props, State> {
  slotService = new SlotService();
  balanceService = new BalanceService();

  constructor(props: any) {
    super(props);
    this.state = {
      mode: Mode.none,
      slots: [],
      casionos: [],
      
      gameCode : '',
      name : '',
      games : [],
      withdraws: [],
      deposits: [],
    };

    
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


  componentDidMount() {
    this.slotService.getSlotSetting().then((s) => {
      if (s.status === "success") {
        this.setState({ slots: s.slot, mode: Mode.slot });
      }
    });

    this.slotService.getCasinoSetting().then((s) => {
      if (s.status === "success") {
        this.setState({ casionos: s.casiono, mode: Mode.slot });
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
        this.setState({ games:  s.games , mode: Mode.game , gameCode : name, name : nameKo});
      }
    });
  };

  RenderSlot = () => {

    if(this.state.games.length <= 0 || this.state.mode !==  Mode.game) {
      return (<></>)
    }

    return (

      

     <div className="modal joinModal fade show" style={{overflowY: 'auto', display: 'block', paddingRight: '17px'}} aria-modal="true" role="dialog">
     <div className="modal-dialog modal-dialog-centered" style={{ maxWidth : '1400px'}}>
         <div className="modal-content" style={{ maxWidth : '1400px'}}>
             {/* <img className="logo-modal" src="/last/image/logo/logo-footer.png" alt=""  /> */}

             <div className="modal-header">
                 <div className="title text-left">
                     <h5>게임 리스트</h5>
                 </div>
                 <button className="close-btn" data-dismiss="modal" onClick={()=>{this.setState({mode :  Mode.none})}}></button>
             </div>
             <div className="modal-body">
             
             <div className="game-list" id="game-list-area">
               {
                    Object.values(this.state.games ?? []).map((game :any) =>
                    (
                      <a className="game-btn" onClick={()=> this.handleOpenSlot(game.code, game.gameCompany)}>
                        <div className="main-cont">
                            <img className="main-img"  src={game.imgUrl} alt="" style={isMobile ? {width: '130px', height: '130px'} : {width: '200px', height: '200px'}} />
                            <button className="play-btn"><i className="fa fa-play" aria-hidden="true"></i></button>
                            </div>
                            <div className="footer">
                          <span>{game.nameKo}</span>
                        </div>
                      </a>
                   
                    )
                    )
               }   
     
              </div>



           </div>
       </div>
   </div>
</div>


    );
  };
  

  RenderGame = () => {
     return (
       
      <div className="_front_game">
        {this.state.slots.map((info: any) => {
          return (
            <div className="_game_list"  onClick={()=> this.handleGame(info.code, info.nameKo)}>
              <div className="_bg_start" >GAME START</div>
              <img src={`/light/slots/${info.code}.png`} />
            </div>
          )
        })}
    </div>
   


     );
   };

  render() {


    
  
      return (

        
        <div className="page-content">
          <section className="title-section">
            <div className="title-container">
                <div className="title-pane">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <span className="title">파워 메가 슬롯</span>
                    <i className="fa fa-star" aria-hidden="true"></i>
                </div>
            </div>
          </section>
          <section className="notice-section mt-2">
              <div className="notice-carousel carousel" data-ride="carousel" data-interval="3000" data-pause="false">
                  <i className="fa fa-bell" aria-hidden="true"></i>
                  <div className="carousel-inner">
                      <div className="carousel-item active">
                          <span className="text">입금시 반드시  입금게좌문의를 하셔야 합니다.</span>
                      </div>
                      <div className="carousel-item">
                          <span className="text">입금시 반드시  입금게좌문의를 하셔야 합니다.</span>
                      </div>
                  </div>
              </div>
            </section>
            <section className="slot-section">
                <div className="container">
                  {/* <a className="slot-btn hot">
                    <img className="hot-tag" src="/last/image/main/hot-tag.png" alt="" />
                    <div className="main-container">
                        <img className="main-img" src="/last/image/main/hot.png" alt="" />
                        <img className="slot-man" src="/last/image/main/slot-man.png" alt="" />
                        <div className="hover">
                            <p className="view-text">HOT GAMES</p>
                            <button className="view-btn">게임보기</button>
                        </div>
                    </div>
                    <div className="slot-logo">
                        <span>찬스 추천 핫게임!!</span>
                    </div>
                    <div className="slot-name">
                        <span>HOT GAMES</span>
                    </div>
                </a> */}
                  {
                    this.state.casionos.map((info: any) => {
                      return (
                        <a className="slot-btn"  
                        
                        onClick={() => {
                          if (info.used === "y") {
                            this.handleOpenSlot(info.code, info.nameEn)
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
                        }} >
                          
                          <div className="main-container">
                            <img className="main-img" src={`${info.mobileImg}`} alt="" />
                            <div className="hover">
                                <p className="view-text">VIEW GAME</p>
                                <button className="view-btn">게임보기</button>
                            </div>
                          </div>
                          <div className="slot-logo">
                              <img  src={`/last/image/logo/${info.code}.png`}  alt="" />
                          </div>
                          <div className="slot-name">
                              <span>{info.nameKo}</span>
                          </div>
                      </a>
                      )
                    })
                    }


                    {this.state.slots.map((info: any) => {
                      return (
                        <a className="slot-btn"  
                        
                        onClick={() => {
                          if (info.used === "y") {
                            this.setState({ mode: Mode.none, name : info.nameKo  });
                            this.handleGame(info.code, info.nameKo);
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
                        }} >
                        <div className="main-container">
                            <img className="main-img" src={`/last/image/main/${info.code}.png`} alt="" />
                            <div className="hover">
                                <p className="view-text">VIEW GAME</p>
                                <button className="view-btn">게임보기</button>
                            </div>
                        </div>
                        <div className="slot-logo">
                            <img  src={`/last/image/logo/${info.code}.png`}  alt="" />
                        </div>
                        <div className="slot-name">
                            <span>{info.nameKo}</span>
                        </div>
                    </a>)
                  })}
                  </div>
            </section>
    
            {this.RenderSlot()}

          </div>
        

        );
  }
}
