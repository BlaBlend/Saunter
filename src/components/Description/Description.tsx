import React from 'react';
import Map from '../../containers/Map/MapGetData'

import { IState } from '../Form/Form'
import { environment } from '../../config/environment';
import { withScriptjs, withGoogleMap } from "react-google-maps"
import store from '../../mobx/store/store'

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Description: React.FC<{activeTrack: IState}> = ({activeTrack}) => (
        <div className="description ms-1 pe-4">
            <div className="row"> 
                <h2 className="col-xl-10">{activeTrack.title}</h2>
                <h3 className="col-xl-2">{activeTrack.distance}</h3>
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
                <h5 className="col-xl-12 text-primary mt-3" onClick={() => store.toggleFavorite(activeTrack.id)}>
                    <u>{activeTrack.favorite ? 'Remove from' : 'Add to'} favorites</u>
                </h5>
                <h5 className="col-xl-12 text-danger" onClick={() => store.removeTrack(activeTrack.id)}><u>Remove</u></h5>
            </div>
        </div>
)

export default Description
