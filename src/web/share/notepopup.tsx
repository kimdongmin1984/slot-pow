import React from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from '@material-ui/icons/Close';
// import { useCookies } from "react-cookie";

import { UserService } from '../../service/user.service';
import { GetTimeStemp } from '../../help/utils';
// import { UserService } from '../service/user.service';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

interface Props {
   SetCookie: (name: string, data: any) => any;
   GetCookie: (name: string) => any;
}

interface State {
  note_popup: any[];
  close_popup: any;
}

export class NotePopup extends React.Component<Props, State> {
  userService: UserService = new UserService();

  constructor(props: Props) {
    super(props);
    this.state = { note_popup: [], close_popup: {} };

    this.userService.get_notice_popup().then((data: any) => {
      this.setState({ note_popup: data.note });
    });
    // const [setCookie] = useCookies(["popup"]);
  }

  componentDidMount() {
 

    //this.MoveMatchPage(0)
  }

  render() {
    let note_popup = this.state.note_popup ?? [];
    let close_popup = this.state.close_popup ?? {};

    const RenderPopup = (pop: any) => {

       let cookie = this.props.GetCookie(`pop_${pop.idx}`);

       
       console.log(cookie)
       if (
         cookie != null &&
         GetTimeStemp() - Number(cookie) < 60 * 60 * 1000 
       ) {
         return '';
       }

       if(close_popup[`pop_${pop.idx}`] == true){
        return '';
       }

      return (

        <div className="pop01_popup1 draggable02" id="divpopup20210131045005" style={isMobile ? {position: 'absolute', top: `${pop.posY}px`,  zIndex: 1000} : {position: 'absolute', top: `${pop.posY}px`, left: `${pop.posX}px`, zIndex: 1000}} >
          <div className="pop01_popup_wrap">
              <div className="pop01_popup_btn_wrap">
                  <ul>
                      <li><a href="#"><span className="pop01_popup_btn" onClick={()=>{this.props.SetCookie(`pop_${pop.idx}`, GetTimeStemp())}}>8시간동안 창을 열지 않음</span></a></li>
                      <li><a href="#"><span className="pop01_popup_btn" onClick={()=>{
                        this.state.close_popup[`pop_${pop.idx}`] = true
                        this.setState({ close_popup : this.state.close_popup })}}>닫기 X</span></a></li>            
                  </ul>
              </div>
              <div className="pop01_popup_box">
                <div className="pop01_popup_text" style={isMobile ?  {padding:'30px', width:'100%'} :  {padding:'30px', width:'500px'} }>
                    <span className="pop01_popup_font1" style={{borderBottom:'2px solid #fff', marginBottom:'15px', color : pop.titleColor}}>{pop.title}</span>
                    <span className="pop01_popup_font2" >
                          <div dangerouslySetInnerHTML={{ __html:  pop.contents }}></div>
                    </span> 

                  </div>
            

              </div>
          </div>
      </div>

    
      );
    };
    

    return <div>{note_popup.map((pop, index) => RenderPopup(pop))}</div>;
    // return <div>{RenderPopup('')}</div>;
  }
}
