import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert"; // Import
import { UserService } from "../../service/user.service";
import { runInThisContext } from "vm";
import { ThemeProvider } from "styled-components";
import { ConverMoeny } from "../../utility/help";

export enum RegView {
  code = "code",
  reg = "reg",
}


interface Props {
    user : any;
    handleClose: () => any;
}

interface State {
  point : number;
  balance: number;
}

export class Point extends Component<Props, State> {
  userService = new UserService();
  constructor(props: Props) {
    super(props);

    this.state = {
        point :0,
        balance: 0
    };
  }

  
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
     
            
            <div className="bankModal modal fade in" role="dialog" style={{display: 'block', paddingRight: '17px'}}>
                <div className="dep_with_modal cg_modal modal-dialog">
                    <div className="header">
                        <i className="fa fa-credit-card"></i>
                        <p>금고 <span>BANK</span></p>
                        <button data-dismiss="modal" onClick={()=> this.props.handleClose()}></button>
                    </div>
                    <div className="modal_body">
                        <div className="form-group">
                            <div>
                                <p><i className="glyphicon glyphicon-menu-right"></i> 회원정보</p>
                            </div>
                            <div>
                                <p>{this.props.user.id}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <p><i className="glyphicon glyphicon-menu-right"></i> 보유금</p>
                            </div>
                            <div>
                                <p><span className="_has_cash" style={{color: '#fff'}}>{ConverMoeny(this.props.user.in_balance)}</span></p>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div>
                                <p><i className="glyphicon glyphicon-menu-right"></i> 금고보유금</p>
                            </div>
                            <div>
                                <p><span className="_has_bank" style={{color: '#ffff00'}}>{ConverMoeny(this.props.user.point)}</span></p>
                            </div>
                        </div>

                            <div className="form-group">
                                <div>
                                    <p><i className="glyphicon glyphicon-menu-right"></i> 금고입금</p>
                                </div>
                                <div>
                                    <p>
                                        <input type="text" id="id_bank_in" name="_n_money" className="__number" style={{width: '250px', marginRight: '10px'}} 
                                            value={this.state.balance} 
                                            onChange={(e: any) => {
                                            this.setState({ balance : e.target.value });
                                            }}
                                        />
                                        <button id="id_bank_in_submit" onClick={()=> this.handleChangeToBalance()} >입금하기</button>
                                    </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <div>
                                    <p><i className="glyphicon glyphicon-menu-right"></i> 금고출금</p>
                                </div>
                                <div>
                                    <p>
                                        <input type="text" id="id_bank_out" name="_n_money" className="__number" style={{width: '250px', marginRight: '10px'}} 
                                            value={this.state.point} 
                                            onChange={(e: any) => {
                                            this.setState({ point : e.target.value });
                                            }}

                                        />
                                        <button id="id_bank_out_submit" onClick={()=> this.handleChangeToBalance()} >출금하기</button>
                                    </p>
                                </div>
                            </div>
                    </div>

                    <div className="modal_btn_grp">
                        <button id="id_bank_close" data-dismiss="modal" onClick={()=> this.props.handleClose}>닫기</button>
                    </div>		  
                </div>
            </div>


        )}
      </Popup>
    );
  }
}
