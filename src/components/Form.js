import React from 'react';
import Map from './MapSetData';
import { addTrack } from '../redux/pathActions'
import idGenerator from '../utils/id-generator'
import { withScriptjs, withGoogleMap } from "react-google-maps"
import { environment } from '../config/environment';

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default class Form extends React.Component{
    constructor(){
        super()
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeShortDes = this.onChangeShortDes.bind(this);
        this.deleteInfo = this.deleteInfo.bind(this);
        this.onChangeFullDes = this.onChangeFullDes.bind(this);
        this.addPath = this.addPath.bind(this);
        this.state = {
            title: "",
            shortDes: "",
            fullDes: "", 
            distance: 0,
            markers: [],
            favorite: false
        }
    }

    deleteInfo(){
        this.setState({
            title: "",
            shortDes: "",
            fullDes: "", 
            distance: 0,
            markers: []
        })
    }

    getData(dis, mar){
        this.setState({distance: dis})
        this.setState({markers: mar})
    }

    onChangeTitle(e) {
        var val = e.target.value;
        this.setState({title: val});
    }

    onChangeShortDes(e) {
        var val = e.target.value;
        this.setState({shortDes: val});
    }

    onChangeFullDes(e) {
        var val = e.target.value;
        this.setState({fullDes: val});
    }

    addPath(){
        const payload = this.state
        payload.id = idGenerator()
        addTrack(payload)
    }

    render(){
        return (
            <div className="position-absolute formPath h-100 w-100">
                <div className="row bg-white form mt-4 mx-auto w-100">
                    <div className="col-xl-12 d-flex justify-content-between formTop p-2 px-3">
                        <h3>Add new path</h3>
                        <i className="fas fa-times fa-2x mt-1" onClick={()  => { this.props.onHideDialog(); this.deleteInfo()}}></i>
                    </div>
                    <div className="col-xl-6 py-3 px-4 formLeft d-flex flex-column">
                        <div>
                            <label htmlFor="title" className="d-block">Title:</label>
                            <input type="text" className="mb-3 w-100" name="title" value={this.state.title} onChange={this.onChangeTitle} required/>
                        </div>
                        <div>
                            <label htmlFor="shortDes" className="d-block">Short Description:</label>
                            <textarea type="text" maxLength="160" className="mb-1 w-100" value={this.state.shortDes} onChange={this.onChangeShortDes} name="shortDes" required/>
                            <p className="m-0">Limit {this.state.shortDes.length} of 160</p>
                        </div>
                        <div>
                            <label htmlFor="fullDes" className="d-block">Full description:</label>
                            <textarea type="text" id="fullDes" className="w-100" name="fullDes" value={this.state.fullDes} onChange={this.onChangeFullDes} required/>
                        </div>
                        <div className="m-auto">
                            <i className="far fa-map fa-2x me-2"></i>
                            <h2 className="my-auto d-inline">Length {this.state.distance}</h2>
                        </div>
                        <button type="button" className="btn py-4 mx-auto mb-3 mt-auto border border-dark" id="addPathBtn" onClick={() => { this.addPath(); this.deleteInfo(); this.props.onHideDialog();}}><i className="fas fa-check me-2"></i>Add path</button>
                    </div>
                    <div className="col-xl-6 formRight p-3">
                        <div className="h-100">
                            <WrappedMap googleMapURL={environment.googleMapURL}
                                loadingElement={<div style={{height: '100%'}} />}
                                containerElement={<div style={{height: '100%'}} />}
                                mapElement={<div style={{height: '100%'}} />}
                                sendData={(dis,mar)=>this.getData(dis,mar)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}