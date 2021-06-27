import React, {useState, useEffect} from 'react';

import {Grid} from "@material-ui/core";

import classes from "./TvShows.module.css";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import tvShowsApi from "../../api/tvShowsApi";
import TextField from "@material-ui/core/TextField";
import TvShowCard from "../../components/TvShowCard";
import sortingOptions from "./sortingOptions";
import Button from "@material-ui/core/Button";


const TvShows = () => {

  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [numberOfShows, setNumberOfShows] = useState(10);
  const [sortOption, setSortOption] = useState(sortingOptions.RATING_DESC);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  useEffect(() => {
    tvShowsApi.get(`/shows`)
      .then(response => {
        setTvShows(response.data);
        setFilteredShows(response.data.sort((show1, show2) => show1.rating.average < show2.rating.average ? 1 : -1));
        const genresWithDuplicates = response.data.map(show => show.genres).flat();
        const genresSet = new Set(genresWithDuplicates);
        const genres = [...genresSet];
        setGenres(genres)
      })
  }, []);


  useEffect(() => {
    let newFilteredShows = [...tvShows];
    if (selectedGenre !== "") {
      newFilteredShows = newFilteredShows.filter(s => s.genres.includes(selectedGenre));
    }
    newFilteredShows = newFilteredShows.filter(s => s.name.toUpperCase().includes(searchInput.toUpperCase()))

    if (sortOption === sortingOptions.RATING_ASC) {
      newFilteredShows.sort((show1, show2) => show1.rating.average > show2.rating.average ? 1 : -1)
    } else if (sortOption === sortingOptions.RATING_DESC) {
      newFilteredShows.sort((show1, show2) => show1.rating.average < show2.rating.average ? 1 : -1)
    } else if (sortOption === sortingOptions.ALPHABET_ASC) {
      newFilteredShows.sort((show1, show2) => show1.name > show2.name ? 1 : -1)
    } else if (sortOption === sortingOptions.ALPHABET_DESC) {
      newFilteredShows.sort((show1, show2) => show1.name < show2.name ? 1 : -1)
    }

    setFilteredShows(newFilteredShows)
  }, [selectedGenre, searchInput, sortOption])

  const onClearButtonClick = () => {
    setSelectedGenre("")
    setNumberOfShows(10)
    setSortOption(sortingOptions.RATING_DESC)
    setSearchInput("")
  }


  return (
    <Grid container>
      <Grid className={classes.shows} item xs={12}>
          <FormControl style={{minWidth: "200px", padding: "20px"}}>
            <InputLabel id="demo-simple-select-label">Genres</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedGenre}
              onChange={e => setSelectedGenre(e.target.value)}
            >
              <MenuItem value="">...</MenuItem>
              {genres.map(genre => (
                <MenuItem value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{minWidth: "200px", padding: "20px"}}>
            <InputLabel id="demo-simple-select-label">Number of shows</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={numberOfShows}
              onChange={(e) => setNumberOfShows(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        <FormControl style={{minWidth: "200px", padding: "20px"}}>
          <InputLabel  id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <MenuItem value={sortingOptions.RATING_ASC}>Rating asc</MenuItem>
            <MenuItem value={sortingOptions.RATING_DESC}>Rating desc</MenuItem>
            <MenuItem value={sortingOptions.ALPHABET_ASC}>Alphabet asc</MenuItem>
            <MenuItem value={sortingOptions.ALPHABET_DESC}>Alphabet desc</MenuItem>
          </Select>
        </FormControl>
          <TextField style={{padding: "20px"}} value={searchInput} onChange={e => setSearchInput(e.target.value)} id="standard-basic" label="Search"/>
        <Grid item xs={12}>
          <Button onClick={onClearButtonClick}>Clear</Button>
        </Grid>
        <Grid item xs={12}>
          {filteredShows.slice(0, numberOfShows).map((tvShow, index) => (
            <TvShowCard index={index + 1} tvShow={tvShow}/>
          ))}

        </Grid>
      </Grid>
    </Grid>
  )
}

export default TvShows;
