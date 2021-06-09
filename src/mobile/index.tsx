import React, { Component, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { Game } from "./main/game";
import { Reg } from "./main/reg";
import { Deposit } from "./main/deposit";
import { Even } from "./main/even";
import { Help } from "./main/help";
import { Withdraw } from "./main/withdraw";
import { Notice } from "./main/notice";
import { MyPage } from "./main/mypage";
import { Edit } from "./main/edit";



import { UserService } from "../service/user.service";



const GlobalStyles = createGlobalStyle`
body{
  color: #FFC107;
  background-color: #000;
}

.body{
  color: #FFC107;
}

.MuiPaper-root {
  background-color: #000;
  color: #FFC107;
}

.popup-content {
  width: 100%;
}

.MuiToolbar-gutters{
  padding :0px
}

.popup-content {
  background: none;
} 

.react-confirm-alert-overlay {
  z-index:99999
}
`;

interface Props {
  authenticated: boolean;
  session: string;
  tryLogin: (id: any, pw: any) => any;
  tryLoginOut: () => any;
}

interface State {
  user: {
    id: string;
    level: number;

    in_balance: number;
    balance: number;
    point: number;
    bankname: string;
    banknum: string;
    bankowner: string;
  };
}

export class Mobile extends Component<Props, State> {
  userService = new UserService();
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        id: "",
        in_balance: 0,
        balance: 0,
        point: 0,
        level: 0,
        
        bankname: "",
        banknum: "",
        bankowner: "",
      },
    };
  }

  componentDidMount() {
    if(isMobile){

      setInterval(() => {
        this.updateUser();
      }, 10000);
      this.updateUser();
      }
  }

  updateUser = () => {
    this.userService.healthCheck().then((s: any) => {
      if (s.status === "success") {
        let user = {
          id: s.user.id,
          in_balance: s.user.in_balance,
          level: s.user.level,
          
          balance: s.user.balance,
          point: s.user.point,
          bankname: s.user.bankname,
          banknum: s.user.banknum,
          bankowner: s.user.bankowner,
        };

        if (JSON.stringify(user) !== JSON.stringify(this.state.user)) {
          this.setState({ user: user });
        }
      } else {
      }
    });
  };

  render() {
    console.log(this.state.user);
    if(isBrowser){
      return (<></>)
    }
    
    // require("./indexmo.css")

    return (
      <Router>
        <Switch>
    
          <Route exact path="/">
            <Game
              authenticated={this.props.authenticated}
              session={this.props.session}
              user={this.state.user}
              tryLogin={this.props.tryLogin}
              tryLoginOut={() => {
                this.setState({
                  user: {
                    id: "",
                    level : 1,
                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();

                window.location.reload();
              }}
            />
          </Route>
          <Route exact path="/deposit">

            <Deposit
              authenticated={this.props.authenticated}
              session={this.props.session}
              user={this.state.user}
              tryLogin={this.props.tryLogin}
              tryLoginOut={() => {
                this.setState({
                  user: {
                    id: "",
                    level : 1,

                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();
                window.location.reload();

              }}
            />
          </Route>
          <Route exact path="/withdraw">
            <Withdraw
              authenticated={this.props.authenticated}
              session={this.props.session}
              user={this.state.user}
              tryLogin={this.props.tryLogin}
              tryLoginOut={() => {
                this.setState({
                  user: {
                    id: "",
                    level : 1,

                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();
                window.location.reload();

              }}
            />
            </Route>
          


          <Route exact path="/reg">
            <Reg/>
          </Route>
          
          
          <Route exact path="/even">
            <Even 
              authenticated={this.props.authenticated}
              session={this.props.session}
              user={this.state.user}
              tryLogin={this.props.tryLogin}
              tryLoginOut={() => {
                this.setState({
                  user: {
                    id: "",
                    level : 1,

                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();
                window.location.reload();

              }}/>
          </Route>
          <Route exact path="/help">
            <Help 
              authenticated={this.props.authenticated}
              session={this.props.session}
              user={this.state.user}
              tryLogin={this.props.tryLogin}
              tryLoginOut={() => {
                this.setState({
                  user: {
                    id: "",
                    level : 1,

                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();
                window.location.reload();

              }}/>
          </Route>
          <Route exact path="/notice">
            <Notice 
              authenticated={this.props.authenticated}
              session={this.props.session}
              user={this.state.user}
              tryLogin={this.props.tryLogin}
              tryLoginOut={() => {
                this.setState({
                  user: {
                    id: "",
                    level : 1,

                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();
                window.location.reload();

              }}/>
          </Route>

          <Route exact path="/mypage">
            <MyPage 
              authenticated={this.props.authenticated}
              session={this.props.session}
              user={this.state.user}
              tryLogin={this.props.tryLogin}
              tryLoginOut={() => {
                this.setState({
                  user: {
                    id: "",
                    level : 1,

                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();
                window.location.reload();

              }}/>
          </Route>
          <Route exact path="/edit">
            <Edit 
              authenticated={this.props.authenticated}
              session={this.props.session}
              user={this.state.user}
              tryLogin={this.props.tryLogin}
              tryLoginOut={() => {
                this.setState({
                  user: {
                    id: "",
                    level : 1,

                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();
                window.location.reload();

              }}/>
          </Route>



          
        </Switch>
        <GlobalStyles />
      </Router>
    );
  }
}
