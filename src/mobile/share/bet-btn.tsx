import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

interface Props {
  odds: number;
  name: string;
  color: string;
  checkBet: () => any;

  clickBet: () => any;
}

interface State {}

export class BetBtn extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let odds = this.props.odds;
    let name = this.props.name;
    let color = this.props.color;

    return (
      <div
        className={this.props.checkBet() ? "game_btn_active" : "game_btn"}
        onClick={() => {
          this.props.clickBet();
        }}
      >
        <div className="mo_game_title blue" style={{ color: color }}>
          {name}
        </div>
        <div className="mo_game_rate divd rate_oe">{odds}</div>
      </div>
    );
  }
}
