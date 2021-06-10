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


      <div className="footers">
		<div className="footer_main">
			<div className="cont">
				<div className="top_side">
				<div className="bottom_side">
					<div className="not_eve_cont">
            
            <div className="not_eve_pan1">
							<a href="#" data-toggle="modal" data-target=".rcsModel"><img src="/webk/image/team_viewer.png" /></a>
						</div>
												<div className="not_eve_cont">
							<div className="not_eve_pan">
							<div className="head">
								<button className="deposit_btn">자주묻는 질문</button>
							</div>
							<div className="body">
		
							</div>
						</div>
					</div>
							</div>
						</div>
	</div>
			</div>
		
		<div className="bottom_logos">
			<div className="bottom_logos_box">
			<img src="/webk/image/bottom_logo.png" width="100%" className="box_img" />
			</div>
			</div>
		<div className="bottomsd">
			<b>Copyright Korea Slot ⓒ 2020</b> The Live casino Slot machine game website
			</div></div></div>

      // <div id="footer">
      //   <img src="/web/images/partner.png" /><br /><br/>Copyright ⓒ 2006~2021 Korean SLOT All rights reserved.
      // </div>
      // <div className="footer_wrap">
      //   <img src="/web/images/footer.png" />
      //   <div className="footer_copyright">
      //     Copyright © 2016~2020 Lucky SLOT. All rights reserved
      //   </div>
      // </div>
    );
  }
}
