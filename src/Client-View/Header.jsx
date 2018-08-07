import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1
  },
  text: {
    width: "100%"
  }
};

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <div className={classes.text}>
            <Typography variant="title" color="inherit">
              Spreadsheet using React, RxDB, and React-Datasheet
            </Typography>
            <Typography variant="subheading" color="inherit">
              by Michael Salaverry
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withStyles(styles)(Header);
