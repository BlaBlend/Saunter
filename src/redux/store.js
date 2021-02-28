import { createStore } from 'redux';
import PathReducer from './pathReducer';

export const store = createStore(PathReducer , 
    {
        tracks: [],
        activeTrack: undefined
    }
)