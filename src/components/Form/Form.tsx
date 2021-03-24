import React, { useState } from 'react';
import Map from '../../containers/Map/MapSetData';

import { withScriptjs, withGoogleMap } from 'react-google-maps'
import store from '../../mobx/store/store'
import { environment } from '../../config/environment'
import idGenerator from '../../utils/id-generator'

const WrappedMap = withScriptjs(withGoogleMap(Map));

export interface IState {
    title: string
    shortDes: string
    fullDes: string
    distance: string
    markers: { lat: number, lng: number }[]
    favorite: boolean
    id: string
}

const initState = {
    title: '',
    shortDes: '',
    fullDes: '', 
    distance: '',
    markers: [],
    favorite: false,
    id: ''
}

const Form: React.FC<{onHideDialog: Function }> = ({onHideDialog}) => {
    const [state,setState] = useState<IState>({ ...initState})

    function deleteInfo(){
        setState({
            ...state, ...initState
        })
    }

    function getData(distance: string, markers: {lat: number, lng: number }[]){
        setState({
            ...state,
            distance,
            markers
        })
    }

    function onChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        let title = event.target.value;
        setState({...state, title});
    }

    function onChangeShortDes(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let shortDes = event.target.value;
        setState({...state, shortDes});
    }

    function onChangeFullDes(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let fullDes = event.target.value;
        setState({...state, fullDes});
    }

    function addPath(){
        const payload = state
        payload.id = idGenerator()
        store.addTrack(payload)
    }

    function validateMap(){
        if(state.markers.length >= 2 && state.title.length != 0 && state.shortDes.length != 0 && state.fullDes.length != 0){
            return addPath(), deleteInfo(), onHideDialog()
        } else {
            return alert('Data is empty')
        }
    }

    return (
        <div className="position-absolute formPath h-100 w-100">
            <div className="row bg-white form mt-4 mx-auto w-100">
                <div className="col-xl-12 d-flex justify-content-between formTop p-2 px-3">
                    <h3>Add new path</h3>
                    <i className="fas fa-times fa-2x mt-1" onClick={() => {onHideDialog(); deleteInfo(); }}></i>
                </div>
                <div className="col-xl-6 py-3 px-4 formLeft d-flex flex-column">
                    <div>
                        <label htmlFor="title" className="d-block">Title:</label>
                        <input className="mb-3 w-100" maxLength={70} name="title" value={state.title} onChange={onChangeTitle}/>
                    </div>
                    <div>
                        <label htmlFor="shortDes" className="d-block">Short Description:</label>
                        <textarea maxLength={160} className="mb-1 w-100" value={state.shortDes} onChange={onChangeShortDes} name="shortDes"/>
                        <p className="m-0">Limit {state.shortDes.length} of 160</p>
                    </div>
                    <div>
                        <label htmlFor="fullDes" className="d-block">Full description:</label>
                        <textarea id="fullDes" className="w-100" name="fullDes" value={state.fullDes} onChange={onChangeFullDes}/>
                    </div>
                    <div className="m-auto">
                        <i className="far fa-map fa-2x me-2"></i>
                        <h2 className="my-auto d-inline">Length {state.distance}</h2>
                    </div>

                    <button 
                        type="button" 
                        className="btn py-4 mx-auto mb-3 mt-auto border border-dark" 
                        id="addPathBtn"
                        onClick={() => { validateMap() }}
                    >
                        <i className="fas fa-check me-2"></i>
                        Add path
                    </button>
                </div>

                <div className="col-xl-6 formRight p-3">
                    <div className="h-100">
                        <WrappedMap 
                            googleMapURL={environment.googleMapURL}
                            loadingElement={<div style={{height: '100%'}} />}
                            containerElement={<div style={{height: '100%'}} />}
                            mapElement={<div style={{height: '100%'}} />}
                            sendData={(distance: string, markers: {lat: number, lng: number}[])=>getData(distance,markers)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form