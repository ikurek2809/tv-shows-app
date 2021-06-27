import React from 'react';

import classes from "./TvShowCard.module.css";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";


const TvShowCard = (props) => {
  const {tvShow} = props;
  return (
    <Paper className={classes.TvShowCard}>
      <Grid container>
        <Grid item xs={4}>
          <span className={classes.badge}>{props.index}</span>
          <img style={{padding: "10px"}} src={tvShow.image.medium} alt=""/>
        </Grid>
        <Grid  item xs={8}>
          <h4>Title: {tvShow.name}</h4>
          <p>Summary: {tvShow.summary}</p>
          <p>Rating: {tvShow.rating.average}</p>
          <p>{tvShow.genres.map(genre => (
           <p style={{display: "inline"}}>{genre}, </p>
          ))}</p>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TvShowCard
