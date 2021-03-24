import { createStore } from 'redux'
import PathReducer , { IStoreState, initState } from '../reducer/pathReducer'

export const store = createStore<IStoreState, any, any, any>(
    PathReducer, 
    initState
)