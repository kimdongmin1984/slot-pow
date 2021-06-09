import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

interface Props {}

interface State {}

export class Footer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (

      <div id="footer">
        <img src="/web/images/partner.png" /><br /><br/>Copyright ⓒ 2006~2021 스토리 SLOT All rights reserved.
      </div>
      // <div className="footer_wrap">
      //   <img src="/web/images/footer.png" />
      //   <div className="footer_copyright">
      //     Copyright © 2016~2020 Lucky SLOT. All rights reserved
      //   </div>
      // </div>
    );
  }
}
