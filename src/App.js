import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Container from "@material-ui/core/Container";

import Navigation from "./components/Navigation";
import TvShows from "./containers/TvShows/TvShows";


function App() {
  return (
    <Router>
      <div>
        <Container maxWidth="lg">
          <Navigation/>
          <Switch>
            <Route exact path="/" component={TvShows}/>
            <Route exact path="/tvShows" component={TvShows}/>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
