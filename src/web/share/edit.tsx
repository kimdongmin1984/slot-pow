// import React, { Component } from "react";
// import styled from "styled-components";

// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Popup from "reactjs-popup";
// import CloseIcon from "@material-ui/icons/Close";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// import IconButton from "@material-ui/core/IconButton";
// import Box from "@material-ui/core/Box";
// import Collapse from "@material-ui/core/Collapse";
// import Paper from "@material-ui/core/Paper";
// import { SubMenu } from "./submenu";

// import { UserService } from "../../service/user.service";
// import { SlotService } from "../../service/slot.service";

// import { ConvertDate } from "../../utility/help";


// interface Props {
//   user : any;
//   handleClose: () => any;
// }


// interface State {
//   notices: any;
//   inBalance : number;
// }

// export class Edit extends Component<Props, State> {
//   userService = new UserService();
//   slotService = new SlotService();

//   constructor(props: Props) {
//     super(props);
//     this.state = { notices: [] , inBalance : 0};

//   }

//   componentDidMount() {
//   }



//   render() {
//     let notices = this.state.notices;
//     return (
//       <Popup
//         // key={`main_popup_note_${pop.idx}`}
//         open={true}
//         contentStyle={{
//             zIndex: 99,
//             background: "#000",
//             border: "none",
//             width: "none",
//         }}
//         onClose={() => {}}
//       >
//         {(close) => (
//            <div  id="fade_2"  className="slideDown popup_none popup_content" data-popup-initialized="true" aria-hidden="false" role="dialog" style={{opacity: 1, visibility: 'visible', display: 'inline-block', outline: 'none', transition: 'all 0.3s ease 0s', textAlign: 'left', position: 'relative', verticalAlign: 'middle'}}>
//            <div className="popup_wrap">
//                     <div className="close_box">
//                         <a href="#" className="fade_1_close"  onClick={()=>{this.props.handleClose()}}><img src="/web/images/popup_close.png" /></a>
//                     </div>
//                     <div className="popupbox">
       
    
    
//                         <div id="popuptab_cont4" className="popuptab_cont">
//                             <div className="title1">
//                             ???????????????
//                             </div>
//                             <div className="contents_in">
    
//                                 <table  className="write_title_top"  style={{width:'100%'}}>
//                                     <tbody>
//                                       <tr>
//                                         <td className="write_title">???????????????	</td>
//                                         <td className="write_basic">
//                                           {
//                                             this.props && this.props.user && <input className="input1" style={{width:'200px'}} value={this.props.user.id} readOnly />
//                                           }
//                                           </td>
//                                       </tr>
//                                       <tr>
//                                         <td className="write_title">????????????</td>
//                                         <td className="write_basic">* ???????????? ????????? ??????????????? ?????? ????????????.</td>
//                                       </tr>
    
//                                       <tr>
//                                         <td className="write_title">?????????	</td>
//                                         <td className="write_basic">
//                                           {
//                                             this.props && this.props.user && <input className="input1" style={{width:'200px'}} value={this.props.user.bankowner} readOnly />
//                                           }
//                                           </td>
//                                       </tr>

//                                       <tr>
//                                         <td className="write_title">?????????	</td>
//                                         <td className="write_basic">
//                                           {
//                                             this.props && this.props.user && <input className="input1" style={{width:'200px'}} value={this.props.user.bankname} readOnly />
//                                           }
//                                           </td>
//                                       </tr>

//                                       <tr>
//                                         <td className="write_title">????????????	</td>
//                                         <td className="write_basic">
//                                           {
//                                             this.props && this.props.user && <input className="input1" style={{width:'200px'}} value={this.props.user.banknum} readOnly />
//                                           }
//                                           </td>
//                                       </tr>


//                                 </tbody></table>                
//                             </div>                               
                        
                                       
//                     </div>
                      
             
//                         </div>
//                     </div>
//                     </div>
//         )}
//       </Popup>
//     );
//   }
// }


import React, { Component } from "react";
import styled from "styled-components";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import { confirmAlert } from "react-confirm-alert"; // Import
import Typography from "@material-ui/core/Typography";
import { SubMenu } from "./submenu";

import { UserService } from "../../service/user.service";
import { BalanceService } from "../../service/balance.service";

import { ConvertDate, HelpStatus, ConvertDate2, ConvertBalanceStateToText, ConvertBalanceStatus,ConverMoeny } from "../../utility/help";
import { runInThisContext } from "vm";

export enum EditView {
  none = "none",
  mypage = "mypage",
  balance = "balance",
  detail = "detail",
}

const CustomTableCell = styled(TableCell)`
  color: white;
  padding: 4px;
`;

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});


interface Props {
  user : any;

  handleClose: () => any;
  handleActive: (active:string) => any;
}

interface State {
  balances: any;
  mode: string;

  title: string;
  contents: string;
  detail: any;
  basePass : any;
  newPass1 : any;
  newPass2 : any;
  
}

export class Edit extends Component<Props, State> {
  userService = new UserService();
  balanceService= new BalanceService();

  constructor(props: Props) {
    super(props);
    this.state = { balances: [], mode: EditView.mypage, title: "", contents: "" , detail : {} ,   basePass : '', newPass1 : '', newPass2 : ''};


    // 
  }
  
 


  componentDidMount() {
    // this.handleGetNotices();
  }

  // handleGetNotices = () => {
  //   this.userService.get_help_list().then((data: any) => {
  //     console.log(data);
  //     if (data.status === "success") {
  //       this.setState({ helps: data.helps });
  //     }
  //   });
  // };

  
  handleDelBalance = () => {

    if(this.state.newPass1 == '' || this.state.newPass1 == null){
      confirmAlert({
        title: "????????? ??????",
        message: "????????? ????????? ???????????? ???????????? ????????????.",
        buttons: [
          {
            label: "??????",
            onClick: () => {
              this.balanceService.delAllBalance().then((date: any) => {})

              this.props.handleClose();
            },
          },
          {
            label: "??????",
            onClick: () => {
              this.props.handleClose();
            },
          },
        ],
      });
      return 
    }
  }

  
  
  handleExchangeToPass = () => {

    if(this.state.newPass1 == '' || this.state.newPass1 == null){
      confirmAlert({
        title: "?????? ??????",
        message: "??????????????? ??????????????????.",
        buttons: [
          {
            label: "??????",
            onClick: () => {
              this.props.handleClose();
            },
          },
        ],
      });
      return 
    }

    if(this.state.newPass1 !== this.state.newPass2){
      confirmAlert({
        title: "?????? ??????",
        message: "????????? ??????????????? ??????????????????.",
        buttons: [
          {
            label: "??????",
            onClick: () => {
              this.props.handleClose();
            },
          },
        ],
      });
      return 
    }


    this.userService.user_exchange_to_pass(this.state.newPass1).then((date: any) => {
      if (date.status === "success") {
        confirmAlert({
          title: "?????? ??????",
          message: "??????????????? ??????????????? ?????????????????????.",
          buttons: [
            {
              label: "??????",
              onClick: () => {
                this.props.handleClose();
              },
            },
          ],
        });
      } else {
        confirmAlert({
          title: "?????? ??????",
          message: "????????? ?????????????????????.",
          buttons: [
            {
              label: "??????",
              onClick: () => {
                this.props.handleClose();

              },
            },
          ],
        });
      }
    });

  };


  
  // handleSaveHelp = (title: string, contents: string) => {

  //   if(title == '' ){
  //     confirmAlert({
  //       title: "????????????",
  //       message: "???????????? ??????????????????.",
  //       buttons: [
  //         {
  //           label: "??????",
  //           onClick: () => {
  //             this.handleGetNotices();
  //           },
  //         },
  //       ],
  //     });
  //     return 
  //   }
  //   if(contents == ''){
  //     confirmAlert({
  //       title: "????????????",
  //       message: "????????? ??????????????????.",
  //       buttons: [
  //         {
  //           label: "??????",
  //           onClick: () => {
  //             this.handleGetNotices();
  //           },
  //         },
  //       ],
  //     });
  //     return 
  //   }

  //   this.userService.user_wirte_help(title, contents).then((date: any) => {
  //     if (date.status === "success") {
  //       confirmAlert({
  //         title: "????????????",
  //         message: "???????????? ?????????????????????.",
  //         buttons: [
  //           {
  //             label: "??????",
  //             onClick: () => {
  //               this.handleGetNotices();
  //             },
  //           },
  //         ],
  //       });
  //     } else {
  //       confirmAlert({
  //         title: "????????????",
  //         message: "???????????? ?????????????????????.",
  //         buttons: [
  //           {
  //             label: "??????",
  //             onClick: () => {},
  //           },
  //         ],
  //       });
  //     }
  //   });

  //   this.props.handleClose();
  // };

  render() {
    let user = this.props.user;
    let balances = this.state.balances;

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
        
        <div className="modal mypageModal fade show" style={{display: 'block', paddingRight: '17px'}} aria-modal="true" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  {/* <img className="logo-modal" src="./last/image/logo/logo-footer.png" alt="" /> */}
                  <div className="modal-header">
                      <div className="title text-left">
                          <h5>???????????????</h5>
                          <span>MY PAGE</span>
                      </div>
                      <button className="close-btn" data-dismiss="modal" onClick={()=> this.props.handleClose()}></button>
                  </div>
                  <div className="modal-body">
                          <div className="form-container">
                          {/* <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>??????????????????</span>
                              </div>
                              <div className="infos">
                                  <input type="password" name="old_password" />
                              </div>
                          </div> */}
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>??????????????????</span>
                              </div>
                              <div className="infos">
                                  <input type="password" name="password" onChange={(e: any) => { this.setState({ newPass1: e.target.value });}}   />
                              </div>
                          </div>
                          <div className="form-group">
                              <div className="labels">
                                  <span className="dot"></span>
                                  <span>????????????????????????</span>
                              </div>
                              <div className="infos">
                                  <input type="password" name="password_confirmation" onChange={(e: any) => { this.setState({ newPass2: e.target.value });}}  />
                              </div>
                          </div>
                      </div>
                      <div className="modal-footer">
                          <div className="btn-grp">
                              <button type="button"  onClick={()=> this.handleExchangeToPass()} ><i className="fa fa-check-square-o" aria-hidden="true"></i> ????????????</button>
                              <button type="button"  onClick={()=> this.props.handleClose()} className="gray" data-dismiss="modal"><i className="fa fa-window-close" aria-hidden="true"></i> ????????????</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
          // <div className="modal fade show" id="WithdrawalAndDepositModal"  role="dialog" aria-labelledby="WithdrawalAndDepositModalTitle" style={{paddingRight: '17px', display: 'block'}} aria-modal="true">
          //   <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          //     <div className="modal-content">
          //         <div className="modal-body">
          //           <button data-dismiss="modal" className="mdl-close pt-0 p-3 " style={{float: 'right', background: 'transparent', color: '#fff', border: 'none', fontSize: '20px'}}  onClick={()=>{this.props.handleClose()}}><i className="fa fa-times" aria-hidden="true"></i></button>
          //           <h4>???????????????  <span style={{color: '#555', fontSize: '20px'}}>My Page
          //           </span></h4>
          //           <img src="/light/images/background/site-flash.svg" className="w-100" style={{marginTop: '-25px'}} />
          //           <div className="_menu_modal_head_button d-flex">
          //             <button className="_menu_tabs_btn _openWithdrawalTabs active">????????????</button>
          //             <button className="_menu_tabs_btn _openWithdrawalTabs " onClick={()=>{ this.props.handleActive('note')}}>?????????</button>
          //             <button className="_menu_tabs_btn _openWithdrawalTabs " onClick={()=>{ this.props.handleActive('balance')}}>????????? ??????</button>
          //           </div>
                
          //             <div className="_form_tables my-3">
          //               <div className="_myPageTabs _myPage_content_1">	
          //                 <div className="_modal_box_infomation">
          //                   <p style={{color: '#ffd200'}}>????????? ??????????????? ???????????????.</p>
          //                 </div>
          //                 <div className="_form_tables my-3">
          //                   <table className="w-100">
          //                     <tr>
          //                       <td className="w-25">?????? ????????????</td>
          //                       <td><input type="text" name="" className="w-100"  onChange={(e: any) => { this.setState({ newPass1: e.target.value });}}  /></td>
          //                     </tr>
          //                     <tr>
          //                       <td className="w-25">?????? ????????????</td>
          //                       <td><input type="text" name="" className="w-100" onChange={(e: any) => { this.setState({ newPass2: e.target.value });}} /></td>
          //                     </tr>
          //                   </table>
          //                 </div>
          //                 <div className="text-center mt-4">
          //                   <button className="_modal_bottom_button_type_1 "  onClick={()=> this.handleExchangeToPass()}>???????????? ??????</button>
          //                 </div>
          //             </div> 
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
    
          
        )}
      </Popup>
    );
  }
}
