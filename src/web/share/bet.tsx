import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SlotService } from "../../service/slot.service";
import { UserService } from "../../service/user.service";
import { confirmAlert } from "react-confirm-alert"; // Import
import Pagination from "@material-ui/lab/Pagination";
import { styled } from '@material-ui/core/styles';

import { ConvertDate2, ConverMoeny, ConvertDate , ConvertBalanceStatus} from "../../utility/help";

// import {
//   ToggleMainBoard,
//   ToggleMainRealtime,
// } from "./../../../public/web/js/showid";

// {
//   /* <script type="text/javascript" src="/web/js/showid.js"></script> */
// }


const CusPagination = styled(Pagination)({
    color: 'white',
    root: {
        color: 'white',

    },
    MuiButtonBaseRoot : {
        color: 'white',
    },
    MuiPaginationItemRoot : {

        color: 'white',
    },
    ul: {
        color: 'white',
    },
    button: {
        color: 'white',
    },
    MuiPaginationul  : {
        color: 'white',
    },

    MuiButton: {
        // Name of the rule
        text: {
          // Some CSS
          color: 'white',
        },
      },
  })
  

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
  bets: any;
  maxPage: any;
  nowPage: any;
}

export class Bet extends Component<Props, State> {
    slotService = new SlotService();

    constructor(props: any) {
        super(props);
        this.state = {
            bets: [],
            maxPage : 0,
            nowPage : 0,
        };
    }


  componentDidMount() {
    this.handleGetBet(1)

  }

  handleGetBet = (skip : number) =>{
    this.slotService.get_slot_bets(skip).then((data: any) => {
        if (data.status === "success") {
          this.setState({ bets: data.bets, maxPage : data.maxCount, nowPage : skip });
        }
    });

  }

    

  render() {
      let bets = this.state.bets;
   
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
              <div className="eventModal modal fade in" role="dialog" style={{display: 'block', paddingRight: '17px'}} data-key="0">
              <div className="mypage_modal cg_modal modal-dialog" style={{height: '900px'}}>
                <div className="header">
                  <i className="fa fa-exclamation-triangle"></i>
                  <p>배팅정보 <span>MYPAGE</span></p>
                  <button data-dismiss="modal" onClick={()=>this.props.handleClose()}></button>
                </div>
                <div className="modal_body">
                  <div className="board_head">
                    <button className ={''} onClick={()=>{ this.props.handleActive('edit') }}>
                      <span>
                        나의 정보
                      </span>
                    </button>
                    <button  className ={''}  onClick={()=>{ this.props.handleActive('balance')}}>
                      <span>입출금리스트</span>
                    </button>
                    <button  className ={''}  onClick={()=>{ this.props.handleActive('note')}}>
                      <span>
                        쪽지
                      </span>
                    </button>
                    <button  className ={'active'}  >
                      <span>
                        배팅/원
                      </span>
                    </button>
                  </div>
                  <div className="board_event">
                    
        
                    <div className="col-xs-12 zero-padding">
                        <table className="table table-hover text-center bottom-3b _table_n">
                          <caption className="sr-only">faq 목록</caption>
                          <thead>
                            <tr className="bg-primary">
                              <th scope="col" className="text-center">게임사</th>
                              <th scope="col" className="hidden visible-lg text-center w100">배팅금</th>
                              <th scope="col" className="text-center w90"><a className="link-inverse">환급금</a></th>
                              <th scope="col" className="text-center w90"><a className="link-inverse">날짜</a></th>
                            </tr>
                          </thead>
                          <tbody>
                            
                          {bets.map((row: any) => {
                            return (
                              <tr className=""  >
                                <td className="td_subject text-left" style={{ textAlign : 'center'}}>{row.thirdParty}</td>
                                <td className="td_subject text-left" style={{textAlign : 'center'}}>{ConverMoeny(row.balanceBet)}</td>
                                <td className="td_name sv_use hidden visible-lg text-center" style={{width:'15%'}}><span>{ConvertBalanceStatus(row.balanceWin)}</span></td>
                                <td className="td_date  text-center" style={{width:'15%'}}>{ConvertDate(row.betTime)}</td>
                              </tr>
                            )
                          })}
                  
                          </tbody>
                        </table>

                        <CusPagination
                        count={Math.ceil(this.state.maxPage / 20)}
                        variant="outlined"
                        shape="rounded"
                        onChange={(e: any, page: number) => {
                        this.handleGetBet(page);
                        }}
                    />
                      </div>

                   
{/*                       
                      <div className="text-align: center; margin-top: 30px;">
                        <span className="active" onClick={()=>this.handleDelBalance()}><span className="btn btn-danger" >입출금내역 전체삭제</span></span>
                      </div>
                      <div className="col-xs-12 zero-padding"> */}

                  </div>
  
         
  
                  </div>
               </div>
            </div>
          )}
        </Popup>
    );
  }
}
