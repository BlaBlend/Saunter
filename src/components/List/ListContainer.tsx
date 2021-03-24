import React , { useEffect, useState } from 'react';
import List from './List'

import store from '../../mobx/store/store';
import { IState } from '../Form/Form'
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
// tracks.sort((a: IState, b: IState) => (b.favorite > a.favorite) ? 1: -1)

const ListContainer: React.FC = () => {
    let tracksA:IState[] = []
    const [search, updateSearch] = useState<string>()

    getTracks()

    function getTracks(){
        const tracks = store.state.tracks
        const tracksSorted = tracks
        if(search){
            const searchString = search.toUpperCase()
            const tracksSearched = tracksSorted.filter((track: IState) => track.title.toUpperCase().includes(searchString) || track.fullDes.toUpperCase().includes(searchString))
            tracksA = tracksSearched
            return
        }
        tracksA = tracksSorted
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
                <List tracks={tracksA}></List>
            </div>
        </div>
    )
}

export default observer(ListContainer)