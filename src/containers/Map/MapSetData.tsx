import React, { useState } from 'react';
import { GoogleMap, Marker, Polyline } from "react-google-maps"

interface IProps {
    sendData: Function
}

interface IMarkers {
    lat: number, lng: number
}

const Map: React.FC<IProps> = props => {
    const [markers, setMarkers] = useState<IMarkers[]>([]);
    let [lengthMath , setLengthMath] = useState<number>(0);
    let lengthKm = ""

    const calcLength = (mk1: IMarkers, mk2: IMarkers): number => {
        let R = 6371.0710;
        let rlat1 = mk1.lat * (Math.PI/180);
        let rlat2 = mk2.lat * (Math.PI/180);
        let difflat = rlat2-rlat1;
        let difflon = (mk2.lng - mk1.lng) * (Math.PI/180);
      
        let d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
    }

    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: 49.436772, lng: 32.072664 }}
            onClick={(event) => {
                const newMarkers = [...markers, {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                }]
                setMarkers(() => newMarkers)

                if(newMarkers.length > 1){
                    const newLenght = lengthMath + ~~(calcLength(newMarkers[newMarkers.length - 2] , {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    }) * 1000)
                    setLengthMath(() => newLenght)
                    if(Math.ceil(Math.log10(newLenght + 1)) >= 4){
                        lengthKm =  (~~(newLenght/100))/10 + " km";
                        props.sendData(lengthKm ,newMarkers)
                    } else{
                        lengthKm = newLenght + " m";
                        props.sendData(lengthKm ,newMarkers)
                    }
                } else {
                    props.sendData(0 + " " , newMarkers)
                }
            }}
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