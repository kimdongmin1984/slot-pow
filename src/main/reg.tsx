import React, { Component } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

// import { getData, getFxData, getFxNowData } from "../help/utils";

import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";
import { ChartComponent } from "./chartcomponent";
const drawerWidth = 240;

const styles = (theme: any) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
    color: "#000",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
    display: "inline",
    padding: "10px",
    fontSize: "16px",
  },
  investing: {
    fontSize: "18px",
  },

  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
  },
  //   avatar: {
  //     margin: theme.spacing(1),
  //     backgroundColor: theme.palette.secondary.main,
  //   },
  //   form: {
  //     width: "100%", // Fix IE 11 issue.
  //     marginTop: theme.spacing(3),
  //   },
  //   submit: {
  //     margin: theme.spacing(3, 0, 2),
  //   },
});

// const classes = useStyles();

interface Props {
  classes: any;
}

interface State {
  data: any;
  minute: number;
  currency: string;
}

class reg extends Component<any, State> {
  static propTypes: { classes: PropTypes.Validator<object> };

  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      minute: 1,
      currency: "gbpaud",
    };
  }

  componentDidMount() {
    this.updateGameDate(this.state.currency, this.state.minute);

    setInterval(() => {
      this.updateNowDate(this.state.currency, this.state.minute);
    }, 1000);
  }

  createData = (
    name: any,
    calories: any,
    fat: any,
    carbs: any,
    protein: any
  ) => {
    return { name, calories, fat, carbs, protein };
  };

  updateNowDate = (currency: string, minute: number) => {
    // getFxNowData(currency, minute).then((data) => {
    //   let find = this.state.data.find(
    //     (s: any) =>
    //       s.gameDate === data.gameDate &&
    //       s.currency === data.currency &&
    //       s.minute === data.minute
    //   );
    //   if (find != null) {
    //     console.log(
    //       data.beginBid,
    //       data.close,
    //       data.low,
    //       data.currency,
    //       data.minute
    //     );
    //     find.date = new Date(data.beginDate);
    //     find.endDate = data.endDate;
    //     find.beginDate = data.beginDate;
    //     find.gameDate = data.gameDate;
    //     find.minute = data.minute;
    //     find.currency = data.currency;
    //     find.high = data.high;
    //     find.low = data.low;
    //     find.close = data.close;
    //     find.open = data.beginBid;
    //   } else {
    //     let have = this.state.data.find(
    //       (s: any) =>
    //         s.currency === data.currency && s.minute === data._id.toString()
    //     );
    //     console.log(have);
    //     if (have != null) {
    //       this.state.data.push({
    //         date: new Date(data.beginDate),
    //         endDate: data.endDate,
    //         beginDate: data.beginDate,
    //         gameDate: data.gameDate,
    //         minute: data.minute,
    //         currency: data.currency,
    //         high: data.high,
    //         low: data.low,
    //         close: data.close,
    //         open: data.beginBid,
    //       });
    //       this.setState({ data: this.state.data });
    //     }
    //   }
    // });
  };

  updateGameDate = (currency: string, minute: number) => {
    // getFxData(currency, minute).then((data) => {
    //   this.setState({ data });
    // });
  };

  render() {
    const classes = this.props.classes;

    // const { classes } = this.props;

    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          {/* <AppBar position="fixed" className={classes.appBar}>
            <CssBaseline />
            <Toolbar />
          </AppBar> */}

          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar> */}
            {/* 
            <Typography component="h1" variant="h5">
              Sign up
            </Typography> */}
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>{/* <Copyright /> */}</Box>
        </Container>
      </React.Fragment>
    );
  }
}

reg.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Reg = withStyles(styles, { withTheme: true })(reg);
export default Reg;

// export default withStyles(styles)(Game);

// export default withStyles(useStyles)(Game);
