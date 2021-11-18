


let accessToken = '';
const CLIENT_ID = 'e20f72a0f82149eda7e81420e7cd9bc5'
const REDIRECT_URI = "http://localhost:3000/"
const Spotify={
    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        }).then(response=>{
            return response.json;
        }).then(jsonResponse=>{
            if(!jsonResponse.tracks){
                return []
            }
            return jsonResponse.tracks.items.map(track=>({
                id : track.id,
                name : track.name,
                artist : track.artists[0].name,
                album : track.album.name,
                uri : track.uri
            }))
        })
  
    },
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
        
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])

            //clears parameters and allows ur to grab a new access token
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
           

        } else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`
            window.location = accessUrl
        }
 
    }
  
}


export default Spotify;



