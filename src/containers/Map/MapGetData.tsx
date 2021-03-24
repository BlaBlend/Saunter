import React from 'react';
import { GoogleMap, Marker, Polyline } from "react-google-maps"

interface IProps {
    markers: {lat: number, lng: number}[]
}

const Map: React.FC<IProps> = props => {
    const markers = props.markers

    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: 49.436772, lng: 32.072664 }}
            >
            {markers.map(polyline => <Polyline 
                key={polyline.lat} 
                path={markers}
                // geodesic={true}
                options={{
                    strokeColor: "Red",
                    strokeOpacity: 1,
                    strokeWeight: 5
                }} 
            />)}
            {markers.map(marker => <Marker 
                key={marker.lat} 
                position={{lat: marker.lat , lng: marker.lng}} 
            />)}
        </GoogleMap>
    );
} 

export default Map