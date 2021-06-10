import React, { useState } from "react";
// import { Route } from "react-router-dom";
// import { BrowserRouter, Route, Link } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import { confirmAlert } from "react-confirm-alert"; // Import

import { AxiosService } from "./service/axios.service";
import { AuthService } from "./service/auth.service";
import { UserService } from "./service/user.service";


import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import { Mobile } from "./mobile/index";
import { Web } from "./web/index";

// import logo from "./logo.svg";
// import "./App.css";

let auth = new AuthService();
// let userService = new UserService();

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(["session"]);
  // const [session, setSession] = useState(null);
  // const [session, setSession] = useState(null);

  let authenticated: boolean = cookie.session != null;
  let session: any = cookie.session != null;

  const login = (id: any, pw: any) => {
    auth.doLogin(id, pw).then((s) => {
      if (s.status === "success") {
        if (cookie.session != null) {
          removeCookie("session", { path: "/" });
        }
        setCookie("session", s.session, { path: "/" });
        // setSession(s.session);
        window.location.reload();
      } else {

        confirmAlert({
          title: "로그인 ",
          message: "아이디 또는 비밀번호를 확인해주세요.",
          buttons: [
            {
              label: "확인",
              onClick: () => {
                removeCookie("session", { path: "/" });

                window.location.reload();
              },
            },
          ],
        });
      }
    });
  };

  const logout = () => setCookie("session", null, { path: "/" });
  AxiosService.SetSession(cookie.session);

  // {isBrowser ?  require("./web/index.css") :  require("./index.css") }
  // console.log(this.state.user);
  // require("./index.css")
  // console.log(this.state.user);

  // require("./index.css")

  return (
    <>
          <Web
          tryLogin={login}
          authenticated={authenticated}
          session={session.session}
          tryLoginOut={() => {
            removeCookie("session", { path: "/" });
          }}
          SetCookie={(name: string, data: any) => setCookie(name, data, { path: "/" })}
          GetCookie={(name: string)=> { return cookie[name]}}></Web>
      {/* <MobileView>
        <Mobile
        tryLogin={login}  
        authenticated={authenticated}
        session={session.session}
        tryLoginOut={() => {
          removeCookie("session", { path: "/" });
        }}
        SetCookie={(name: string, data: any) => setCookie(name, data, { path: "/" })}
        GetCookie={(name: string)=> { return cookie[name]}}
      ></Mobile>
      </MobileView> */}
    </>
  );
}

export default App;
