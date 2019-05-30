import React, {Component} from 'react';
import './App.css'; 
import Movie from './Movie';


class App extends Component{
  // Render : componterWillMoint() -> render() -> componentDidMount()
  // componentWillMount(){
  //   console.log('will mount');
  // }
  
state = {}

//여기에서 00초 후에 페이지로드후 다른 작업을 진행시킬 수 있음. 
componentDidMount() {
  this._getMovies();
}
    // //api
    // fetch("https://yts.ag/api/v2/list_movies.json?sort_by=like_count")
    // .then(response => response.json())
    // .then(json=>{
    //   this.setState({
    //     movies : json.data.movies
    //   })
    // })
    // //if it has errors
    // .catch(err => console.log(err))
     
 

_renderMovies = () => {
      const movies = this.state.movies.map(movie => {
        console.log(movie)
        return (
          <Movie
            title={movie.title_english}
            poster={movie.medium_cover_image}
            key={movie.id}
            genres={movie.genres}
            synopsis={movie.synopsis}
          />
        );
      });
      return movies;
   };

_getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies 
    })
  };

  _callApi = () => {
    return fetch(
      "https://yts.am/api/v2/list_movies.json?sort_by=download_count"
    )
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };
  

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}
export default App;
