import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { UserService } from "../../service/user.service";
import { SlotService } from "../../service/slot.service";
import { runInThisContext } from "vm";
import { ThemeProvider } from "styled-components";
import { ConverMoeny } from "../../utility/help";

export enum RegView {
  code = "code",
  reg = "reg",
}


interface Props {
    user : any;
    handleActive: (active:string) => any;
    handleClose: () => any;
 }

interface State {
  point : number;
  balance: number;
  inBalance: number;
  
}

export class Point extends Component<Props, State> {
  userService = new UserService();
  slotService = new SlotService();

  constructor(props: Props) {
    super(props);

    this.state = {
        point :0,
        balance: 0,
        inBalance: 0
        
    };
    this.handleUpdateInBalance()
  }

  
  handleUpdateInBalance = () => {

    this.slotService.get_in_game_balance().then((data: any) => {
      if (data.status === "success") {
        this.setState({
          inBalance: data.balance ?? 0,
        });
      } else {
      }
    });
  };
  
  handleChangeToBalance = () => {
    if(this.state.balance <= 0 ){
        confirmAlert({
            title: "벨런스",
            message: "벨런스를 입력해주세요.",
            buttons: [
              {
                label: "확인",
                onClick: () => {
                },
              },
            ],
          });
          return ;
    }

    confirmAlert({
        title: "벨런스",
        message: "벨런스를 포인트로 변환하시겠습니까?.",
        buttons: [
          {
            label: "확인",
            onClick: () => {

                this.userService.user_balance_to_point(this.state.balance).then((data: any) => {
                    if (data.status === "success") {
            
                    }
                });
            },
          },

          {
            label: "취소",
            onClick: () => {

            },
          },

        ],
      });
     

  };

  handleChangeToPoint = () => {
    if(this.state.point <= 0 ){
        confirmAlert({
            title: "보인트",
            message: "보인트를 입력해주세요.",
            buttons: [
              {
                label: "확인",
                onClick: () => {
                },
              },
            ],
          });
          return ;
    }

    confirmAlert({
        title: "포인트",
        message: "포인트를 포인트로 변환하시겠습니까?.",
        buttons: [
          {
            label: "확인",
            onClick: () => {
                this.userService.user_point_to_money(this.state.point).then((data: any) => {
                    console.log(data);
                    if (data.status === "success") {
                    }
                });
            },
          },

          {
            label: "취소",
            onClick: () => {

            },
          },

        ],
      });
     

  };


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
        
        overlayStyle={{
          overflow: 'scroll'
        }}
      >
        {(close) => (
     
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                {/* <img className="logo-modal" src="/last/image/logo/logo-footer.png" alt="" /> */}
                <div className="modal-header">
                    <div className="title text-left">
                        <h5>출금신청</h5>
                        <span>WITHDRAW</span>
                    </div>
                    <button className="close-btn" data-dismiss="modal"  onClick={()=> this.props.handleClose()}></button>
                </div>
                <div className="modal-body">
                    <div className="modal-menu">
                      <button type="button" className="mm-btn withdraw-link"  onClick={()=> this.props.handleActive('deposit')}>입금신청</button> 
                      <button type="button" className="mm-btn withdraw-link"  onClick={()=> this.props.handleActive('withdraw')}>출금신청</button> 
                      <button type="button" className="mm-btn active" >금고</button>
                    </div>
                    {/* <div className="terms-use">
                        <div className="text-cont">
                            <div className="inner">
                            </div>
                            
                        </div>
                    </div> */}
           
        
                  {
                    this.props.user && (
                    <div className="form-container">
                      <div className="form-group">
                          <div className="labels">
                              <span className="dot"></span>
                              <span>보유금액</span>
                          </div>
                          <div className="infos">
                               <p id="_modal_for_with_user_money">{ConverMoeny(this.state.inBalance)}</p> 
                          </div>
                      </div>
                      <div className="form-group">
                          <div className="labels">
                              <span className="dot"></span>
                              <span>출금할 금액</span>
                          </div>
                          <div className="infos">
                              <input type="text" placeholder="최소 1만단위입력"  name="amount"   value={this.state.balance} onChange={(e: any) => { this.setState({ balance :  Number(e.target.value) })}}
                              /> 
                          </div>
                      </div>
                      
                      <div className="modal-footer">
                        <div className="btn-grp">
                        <button type="button"     onClick={()=> this.handleChangeToBalance()}><i className="fa fa-check-square-o" aria-hidden="true"></i> 입금하기</button>
                        </div>
                      </div>

                      <div className="form-group">
                          <div className="labels">
                              <span className="dot"></span>
                              <span>출금가능금액</span>
                          </div>
                          <div className="infos">
                               <p id="_modal_for_with_user_money">{ConverMoeny(this.props.user.point)}</p> 
                          </div>
                      </div>
                      <div className="form-group">
                          <div className="labels">
                              <span className="dot"></span>
                              <span>출금할 금액</span>
                          </div>
                          <div className="infos">
                              <input type="text" placeholder="최소 1만단위입력"  name="amount"   value={this.state.point} onChange={(e: any) => { this.setState({ point :  Number(e.target.value) })}}
                              /> 
                          </div>
                      </div>

                      <div className="modal-footer">
                        <div className="btn-grp">
                        <button type="button"         onClick={()=> this.handleChangeToPoint()}><i className="fa fa-check-square-o" aria-hidden="true"></i> 출금하기</button>
                        </div>
                      </div>


          
                </div>)
                  }
   
                </div>
            </div>
            </div>


        )}
      </Popup>
    );
  }
}
