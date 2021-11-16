
import './App.css';
import React from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [
        {
          name: 'track 1',
          artist: 'George Diepiriye',
          album: 'first album',
          id: 1
        },
        {
          name: 'track 2',
          artist: 'Blessed',
          album: 'second album',
          id: 2
        },
      ]
    }
  }
 render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist/>
          </div>
        </div>
    </div>
    );
 } 
}

export default App;
