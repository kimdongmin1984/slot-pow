import React, { Component, useState } from "react";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { createGlobalStyle } from "styled-components";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Game } from "./main/game";
import { NotePopup } from "./share/notepopup";

import { UserService } from "../service/user.service";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";



const GlobalStyles = createGlobalStyle`
body{
  color: #ffffff;
  background-color: #fff;
}

.body{
  color: #ffffff;
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
  SetCookie: (name: string, data: any) => any;
  GetCookie: (name: string) => any;
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


export class Web extends Component<Props, State> {
  userService = new UserService();
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        id: "",
        level: 0,
        in_balance: 0,
        
        balance: 0,
        point: 0,
        bankname: "",
        banknum: "",
        bankowner: "",
      },
    };

    setInterval(() => {
      this.updateUser();
    }, 10000);
    this.updateUser();
}

  componentDidMount() {
    // if(isBrowser){
    // }
  }

  updateUser = () => {

    if(this.props.authenticated === false){
      return 
    }

    this.userService.healthCheck().then((s: any) => {
      if (s.status === "success") {
        let user = {
          id: s.user.id,
          
          level: s.user.level,
          in_balance: s.user.in_balance,
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
        this.props.tryLoginOut()
        window.location.hash = "/";
      }
    });
  };

  render() {
    // if(isMobile){
    //   return (<></>)
    // }
    // require("./indexweb.css")

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
                    level:1,
                    in_balance: 0,
                    balance: 0,
                    point: 0,
                    bankname: "",
                    banknum: "",
                    bankowner: "",
                  },
                });
                this.props.tryLoginOut();
              }}
            />
          </Route>
        </Switch>
        <GlobalStyles />

        {<NotePopup
            SetCookie={this.props.SetCookie}
            GetCookie={this.props.GetCookie}
        ></NotePopup>}

        <div id="helpCount" style={{ display: 'none' }}>0</div>

      </Router>
    );
  }
}
