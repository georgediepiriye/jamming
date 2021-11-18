
import './App.css';
import React from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [
        {
          name: 'track 1',
          artist: 'George Diepiriye',
          album: 'first album',
          id: 1,
        },
        {
          name: 'track 2',
          artist: 'Blessed',
          album: 'second album',
          id: 2,
        },
      ],
      playlistName: 'George playlist',
      playlistTracks : [
        {
          name: 'pl track 1',
          artist: 'pl George Diepiriye',
          album: 'pl first album',
          id: 3,
        },
        {
          name: 'pl track 2',
          artist: 'pl Blessed',
          album: 'pl second album',
          id: 4,
        },
      ]
    };
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack=>savedTrack.id===track.id)){
      return;
    }
    tracks.push(track);
    this.setState({
      playlistTracks : tracks
    })

  }
  removeTrack(track){
  let tracks = this.state.playlistTracks;
  tracks = tracks.filter(currentTrack=> currentTrack.id !== track.id);
  this.setState({
    playlistTracks : tracks
  });

  }

  updatePlaylistName(name){
     this.setState({playlistName : name})
  }

  savePlaylist(){
    const tracksURIs = this.state.playlistTracks.map(track=>track.uri)
  }

  search(term){
    Spotify.search(term).then(searchResults=>{
      this.setState({searchResults : searchResults})
    })
    console.log(term)

  }
 render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults  searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName}  playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
    </div>
    );
 } 
}

export default App;
