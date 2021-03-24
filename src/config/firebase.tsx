import { store } from '../redux/store/store'
import { environment } from './environment'
import firebase from 'firebase'

firebase.initializeApp(environment.firebaseConfig)

let ref = firebase.database().ref('/tracks')
ref.on('value' , event => {
    store.dispatch({
        type: 'loadTracks',
        payload: event.val() || []
    })
})