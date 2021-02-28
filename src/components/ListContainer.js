import React , { useEffect, useState } from 'react';
import { store } from '../redux/store';
import List from './List'

export default function ListContainer(){
    const [tracks, updateTracks] = useState([])
    const [search, updateSearch] = useState()
    store.subscribe(() => {
        getTracks()
    })

    function getTracks(){
        const tracks = store.getState().tracks
        const tracksSorted = tracks.sort((a,b) =>  b.favorite - a.favorite)
        if(search){
            const searchString = search.toUpperCase()
            const tracksSearched = tracksSorted.filter(track => track.title.toUpperCase().includes(searchString) || track.fullDes.toUpperCase().includes(searchString))
            return  updateTracks(tracksSearched)
        }
        updateTracks(tracksSorted)
    }

    useEffect(() => getTracks(),[search])
    return (
        <div className="col-xl-6 left pe-4 pb-4 ps-0">
            <div className="input-group rounded mb-4">
                <input type="search" className="form-control rounded" onChange={event => updateSearch(event.target.value)} placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                </span>
            </div>
            
            <div id="divList">
                <List tracks={tracks}></List>
            </div>
        </div>
    )
}

// 