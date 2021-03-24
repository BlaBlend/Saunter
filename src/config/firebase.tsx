import store from '../mobx/store/store'
import { environment } from './environment'
import firebase from 'firebase'

firebase.initializeApp(environment.firebaseConfig)

let ref = firebase.database().ref('/tracks')
ref.on('value' , event => {
    store.loadTracks(event.val() || [])
})