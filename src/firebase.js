import {store} from './redux/store'
import firebase from 'firebase';
import { environment } from './config/environment';

firebase.initializeApp(environment.firebaseConfig)

let ref = firebase.database().ref('/tracks')
ref.on('value' , event => {
    store.dispatch({
        type: 'loadTracks',
        payload: event.val() || []
    })
})