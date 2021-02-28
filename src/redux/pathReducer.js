import '../firebase';

export default function PathReducer(state, action) {
  switch (action.type) {
    case 'loadTracks':
      state.tracks = action.payload
      return state
    case'addActive':
      state.activeTrack = action.payload
      return state
    default:
      return state
  }
}