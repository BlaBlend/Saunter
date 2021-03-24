import { store } from '../store/store'
import { IState } from '../../components/Form/Form'
import firebase from 'firebase';

export function addTrack(track: IState){
    const currentTracks = store.getState().tracks
    firebase.database().ref('/tracks').set([...currentTracks , track])
}

export function addActive(id: string){
    store.dispatch({
        type: 'addActive',
        payload: id
    })
}

export function removeTrack(id: string){
    const currentTracks = store.getState().tracks;
    currentTracks.splice(currentTracks.map((item: IState) => item.id).indexOf(id), 1);
    firebase.database().ref('/tracks').set(currentTracks)
}

export function toggleFavorite(id: string){
    const currentTracks = store.getState().tracks;
    const favoriteTrack = currentTracks.find((track: IState) => track.id === id)
    favoriteTrack.favorite = !favoriteTrack.favorite
    firebase.database().ref('/tracks').set(currentTracks)
}