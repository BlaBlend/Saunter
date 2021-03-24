import React, { useState } from 'react';
import Description from './Description'
import NavIcon from '../NavIcon/NavIcon'

import { store } from '../../redux/store/store';
import { IState } from '../Form/Form'

const DescriptionContainer: React.FC = () =>{
    const [activeTrack, addActive] = useState<IState>()
    store.subscribe(() => {
        addActive(store.getState().tracks.find((track: IState) => track.id === store.getState().activeTrack))
    })

    return (
        <div className="col-xl-6 right pe-0 ps-4 pb-4">
            {activeTrack ? <Description activeTrack={activeTrack}></Description> : (
                <div className="text-center none d-flex flex-column justify-content-center align-items-center">
                    <NavIcon className="mb-3" size="10em"></NavIcon>
                    <h5>Select any path</h5>
                </div>
            )}   
        </div>  
    )
}

export default DescriptionContainer