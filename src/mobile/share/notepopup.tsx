import React from "react";
import Popup from "reactjs-popup";
import CloseIcon from "@material-ui/icons/Close";
// import { useCookies } from "react-cookie";

import { UserService } from "../../service/user.service";
import { GetTimeStemp } from "../../utility/help";

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

    // const [setCookie] = useCookies(["popup"]);
  }

  componentDidMount() {
    this.userService.get_notice_popup().then((data: any) => {
      this.setState({ note_popup: data.note });
    });

    //this.MoveMatchPage(0)
  }

  render() {
    let note_popup = this.state.note_popup ?? [];
    let close_popup = this.state.close_popup ?? {};

    const RenderPopup = (pop: any) => {
      let cookie = this.props.GetCookie(`pop_${pop.idx}`);

      if (
        cookie != null &&
        GetTimeStemp() - Number(cookie.timeStemp) < 60 * 60 * 1000 * 8
      ) {
        return "";
      }

      return (
        <Popup
          key={`main_popup_note_${pop.idx}`}
          open={close_popup[`main_popup_note_${pop.idx}`] ?? true}
          contentStyle={{
            zIndex: 99999,
            width: "100%",
            background: "none",
            borderRadius: "5px",
            height: "80%",
            overflowY: "scroll",
          }}
          onClose={() => {}}
        >
          {(close) => (
            <div className="mo_modal">
              <div
                className="mo_popup"
                dangerouslySetInnerHTML={{ __html: pop.contents }}
              />
              <div
                onClick={() => {
                  this.props.SetCookie(`pop_${pop.idx}`, {
                    // timeStemp: GetTimeStemp(),
                    isPop: true,
                  });

                  close_popup[`main_popup_note_${pop.idx}`] = false;

                  this.setState({ close_popup: close_popup });
                }}
              >
                <i style={{ color: "#fff" }}>
                  8시간 동안 열지 않음 <CloseIcon />
                </i>
              </div>
            </div>
          )}
        </Popup>
      );
    };

    return <div>{note_popup.map((pop, index) => RenderPopup(pop))}</div>;
  }
}
