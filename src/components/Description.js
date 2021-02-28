import React from 'react';
import Map from './MapGetData'
import { withScriptjs, withGoogleMap } from "react-google-maps"
import { environment } from '../config/environment';
import { removeTrack , toggleFavorite } from '../redux/pathActions'

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Description({activeTrack}){
    return (
        <div className="description ms-1 pe-4">
            <div className="row"> 
                <h2 className="col-xl-6">{activeTrack.title}</h2>
                <h3 className="col-xl-6">{activeTrack.distance}</h3>
                <p className="mb-4">{activeTrack.fullDes}</p>
                <div className="map-description">
                    <WrappedMap 
                        markers={activeTrack.markers} 
                        googleMapURL={environment.googleMapURL}
                        loadingElement={<div style={{height: '100%'}} />}
                        containerElement={<div style={{height: '100%'}} />}
                        mapElement={<div style={{height: '100%'}} />}
                    />
                </div>
                <h5 className="col-xl-12 text-primary mt-3" onClick={() => toggleFavorite(activeTrack.id)}>
                    <u>{activeTrack.favorite ? 'Remove from' : 'Add to'} favorites</u>
                </h5>
                <h5 className="col-xl-12 text-danger" onClick={() => removeTrack(activeTrack.id)}><u>Remove</u></h5>
            </div>
        </div>
    )
}
