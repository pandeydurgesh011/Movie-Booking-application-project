import React from "react";
import "./Home.css";
import Header from "./../../common/header/Header";
import moviesData from "./../../common/moviesData";
import UpComingMovies from "./HomeComponents/UpcomingMovies";
import AllMovies from "./HomeComponents/AllMovies";
import MoviesFilterForm from "./HomeComponents/MoviesFilterForm";
import genres from "./../../common/genre";
import artists from "./../../common/artists";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: moviesData,
      formValues: {
        movieName: "",
        genresList: [],
        artistsList: [],
        releaseDateStart: null,
        releaseDateEnd: null,
      },
    };
  }
  filterList = () => {
    let finalFilteredMovieList = moviesData;
    const formValues = { ...this.state.formValues };
    if (formValues.movieName) {
      finalFilteredMovieList = finalFilteredMovieList.filter(
        movie =>
          movie.title.toLowerCase() ===
          this.state.formValues.movieName.toLowerCase()
      );
    }
    if (formValues.genresList.length > 0) {
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        for (let i = 0; i < formValues.genresList.length; i++) {
          console.log(movie.genres, formValues.genresList);
          if (movie.genres.includes(formValues.genresList[i].name)) return true;
        }
        return false;
      });
    }
    if (formValues.artistsList.length > 0) {
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        const fullNameArray = [];
        movie.artists.forEach(artist =>
          fullNameArray.push(`${artist.first_name} ${artist.last_name}`)
        );
        for (let i = 0; i < formValues.artistsList.length; i++) {
          if (
            fullNameArray.includes(
              `${formValues.artistsList[i].first_name} ${formValues.artistsList[i].last_name}`
            )
          )
            return true;
        }
        return false;
      });
    }
    if (formValues.releaseDateStart && formValues.releaseDateEnd) {
      const releaseDateStart = new Date(formValues.releaseDateStart);
      const releaseDateEnd = new Date(formValues.releaseDateEnd);
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        const movieReleaseDate = new Date(movie.release_date);
        return (
          movieReleaseDate >= releaseDateStart &&
          movieReleaseDate <= releaseDateEnd
        );
      });
    } else if (formValues.releaseDateStart && !formValues.releaseDateEnd) {
      const releaseDateStart = new Date(formValues.releaseDateStart);
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        const movieReleaseDate = new Date(movie.release_date);
        return movieReleaseDate >= releaseDateStart;
      });
    } else if (!formValues.releaseDateStart && formValues.releaseDateEnd) {
      const releaseDateEnd = new Date(formValues.releaseDateEnd);
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        const movieReleaseDate = new Date(movie.release_date);
        return movieReleaseDate <= releaseDateEnd;
      });
    }
    console.log(formValues.releaseDateStart, formValues.releaseDateEnd);
    console.log(finalFilteredMovieList);
    this.setState({ movies: finalFilteredMovieList });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.filterList();
    console.log("Submitted");
  };

  handleChange = e => {
    const formValues = { ...this.state.formValues };
    formValues[e.target.name] = e.target.value;
    this.setState({ formValues });
  };

  handleAutoCompleteChange = (e, v) => {
    const formValues = { ...this.state.formValues };
    formValues[`${e.target.id.split("-")[0]}List`] = v;
    this.setState({ formValues });
  };

  handleDateChange = (d, v, name) => {
    const formValues = { ...this.state.formValues };
    formValues[name] = new Date(d).toDateString();
    this.setState({ formValues });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="upcoming-movies-header">
        <span>Upcoming Movies</span>
        </div>
        <UpComingMovies movies={moviesData} />
        <div className="flex-container">
          <div className="left">
            <AllMovies movies={this.state.movies} />
          </div>
          <div className="right">
            <MoviesFilterForm
              genres={genres}
              artists={artists}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleAutoCompleteChange={this.handleAutoCompleteChange}
              handleDateChange={this.handleDateChange}
              releaseDateStart={this.state.formValues.releaseDateStart}
              releaseDateEnd={this.state.formValues.releaseDateEnd}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;