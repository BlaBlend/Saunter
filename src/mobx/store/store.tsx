import { makeAutoObservable } from "mobx"
import { IState } from '../../components/Form/Form'
import firebase from 'firebase';
import '../../config/firebase'

interface IStore{
    tracks: IState[]
    activeTrack: string | undefined
}

class Store{
    state:IStore = { tracks: [], activeTrack: undefined }

    constructor(){
        makeAutoObservable(this)
    }

    addActive(id: string){
        this.state.activeTrack = id
    }

    loadTracks(tracks: IState[]){
        this.state.tracks = tracks
    }

    addTrack(track: IState){
        const currentTracks = this.state.tracks
        firebase.database().ref('/tracks').set([...currentTracks , track])
    }

    toggleFavorite(id: string){
        const currentTracks = this.state.tracks;
        const favoriteTrack = currentTracks.find((track: IState) => track.id === id)
        if(favoriteTrack) {
            favoriteTrack.favorite = !favoriteTrack.favorite
        }
        firebase.database().ref('/tracks').set(currentTracks)
    }

    removeTrack(id: string){
        const currentTracks = this.state.tracks;
        currentTracks.splice(currentTracks.map((item: IState) => item.id).indexOf(id), 1);
        firebase.database().ref('/tracks').set(currentTracks)
    }
}

export default new Store