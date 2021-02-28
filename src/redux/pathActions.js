import {store} from './store'
import firebase from 'firebase';

export function addTrack(track){
    const currentTracks = store.getState().tracks
    firebase.database().ref('/tracks').set([...currentTracks , track])
}

export function addActive(id){
    store.dispatch({
        type: 'addActive',
        payload: id
    })
}

export function removeTrack(id){
    const currentTracks = store.getState().tracks;
    currentTracks.splice(currentTracks.map(item => item.id).indexOf(id), 1);
    firebase.database().ref('/tracks').set(currentTracks)
}

export function toggleFavorite(id){
    const currentTracks = store.getState().tracks;
    const favoriteTrack = currentTracks.find(track => track.id === id)
    favoriteTrack.favorite = !favoriteTrack.favorite
    console.log(currentTracks)
    firebase.database().ref('/tracks').set(currentTracks)
}