import '../../config/firebase'
import { IState } from '../../components/Form/Form'

export interface IStoreState {
	tracks: IState[] | string | undefined
	activeTrack: IState[] | string | undefined
}

export const initState: IStoreState = {
	tracks: [],
    activeTrack: undefined
}

interface TrackAction {
	type: string
	payload: IState[]
}

interface IdAction {
	type: string
	payload: undefined | string
}

type Actions = TrackAction | IdAction

export default function PathReducer(state = initState, action: Actions): IStoreState {
	switch (action.type) {
		case 'loadTracks':
			return {...state, tracks: action.payload}
		case'addActive':
			return {...state, activeTrack: action.payload}
		default:
			return state
	}
}