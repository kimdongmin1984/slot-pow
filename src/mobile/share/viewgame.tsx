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

interface Props {
  gameName : string
  gameCode : string
}

interface State {
  mode: string;
  slots: any;
  games: any;
}

export class ViewGame extends Component<Props, State> {
  slotService = new SlotService();

  constructor(props: any) {
    super(props);
    this.state = {
      mode: Mode.none,
      slots: [],
      games: [],
    };

  }

  componentDidMount() {
    this.handleGame(this.props.gameCode)

    // this.slotService.getSlotSetting().then((s) => {
    //   if (s.status === "success") {
    //     this.setState({ slots: s.slot, mode: Mode.slot });
    //   }
    // });
  }

  handleGame = (name: string) => {
    this.slotService.get_slot_by_company(name).then((s: any) => {
      if (s.status === "success") {
        const oriArray = s.games 
        let temp : any= []
        const division = 8
        const cnt = Math.floor(oriArray.length / division) + (Math.floor(oriArray.length / division) > 0 ? 1 : 0)

        for(var i = 0 ; i < cnt; i++)
        {
          temp.push(oriArray.splice(0, division))
        }

        this.setState({ games: temp, mode: Mode.game });
      }
    });
  };

  



  render() {
  
      // if (this.state.mode === Mode.game) {
      //   return (
      //     <div id="contents_wrap">
      //     <div className="sc-inner">
      //     {this.state.games.map((row: any) => this.RenderGame(row))}
  
      //     </div>
      //     </div>
    
      //       );
      // }


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
              <a href="#" className="fade_3_close"><img src="/web/images/popup_close.png" /></a>
            </div>
            <div className="popupbox_ajax"><div>
            <div className="title1">
              &nbsp;&nbsp;&nbsp;{this.props.gameName} 슬롯
            </div>


              <div style={{width:'100%', marginTop:'-5px'}}>

              <table >
                <tbody><tr>
                  <td >&nbsp;</td>
                </tr>
                
                <tr>
                  <td>
                    <table >
                      
                      
                      <tbody><tr>
                        <td>
                          <table >
                            <tbody>
                              {
                                Object.values(this.state.games ?? []).map((games :any) =>{

                                  return (
                                    
                              <tr>
                                {
                                    Object.values(games).map((game : any) =>{
                                
                                      return (
                                      <td style={{width: 180, paddingBottom : 20}} onClick={()=>{
                                        // this.handleOpenSlot(game.code, game.company)
                                      }}>
                                        <table>
                                        <tbody>
                                        <tr>
                                          <td>
                                            <div>
                                              <a  style={{cursor:'pointer'}}>
                                                <img src={game.imgUrl} id="xImag" width="130" height="130" /></a>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td >
                                            <div style={{textAlign:'center', position: 'absolute',width:'130px'}}>
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
                      <li><a href="#" ><span className="btn3_1">목록으로</span></a></li>
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
      )

  
    
  }
}
