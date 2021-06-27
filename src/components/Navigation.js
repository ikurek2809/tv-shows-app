import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NavigationItem from "./NavigationItem";


const Navigation = props => (
  <AppBar position="static">
    <Toolbar>
      <NavigationItem to="/TvShows" text="Tv Shows"/>
    </Toolbar>
  </AppBar>
);

export default Navigation








