import React, { useState } from 'react'
import NavIcon from '../NavIcon/NavIcon' 

import store from '../../mobx/store/store'
import { IState } from '../Form/Form'
import { observer } from 'mobx-react-lite'

const List: React.FC<{tracks: IState[]}> = ({tracks}) =>{    
    const activeElement = store.state.activeTrack

    return (
        <ul className="p-0">
            {tracks && tracks.map(track => (
                <li key={track.id} className={activeElement === track.id ? 'active bg-primary text-white': ''} 
                onClick={() => store.addActive(track.id)}>
                    <div className="li mb-2 py-1 pe-2 ps-3 d-flex justify-content-between align-items-center">
                        <NavIcon size="3em" className="flex-shrink-0"></NavIcon>
                        <div className="flex-grow-1 p-2">
                            {track.favorite && <i className="fas fa-star"></i>}
                            <h5 className="d-inline">{track.title}</h5>
                            <p>{track.shortDes}</p>
                        </div> 
                        <h4 className="mw-100 mt-1 pe-4 text-nowrap">{track.distance}</h4>
                        <i className="fas fa-angle-right fa-2x"></i>
                    </div>
                </li>
            ))
            }
        </ul>
    )
}

export default observer(List)