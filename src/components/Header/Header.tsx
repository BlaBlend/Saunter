import React from 'react';
import NavIcon from '../NavIcon/NavIcon'

const Header: React.FC<{onShowDialog: Function}> = ({onShowDialog}) => {
    return (
        <div className="col-xl-12 top d-flex mb-4 pb-4">
            <NavIcon size="2em"></NavIcon>
            <h1 className="m-0">Saunter</h1>
            <button type="button" onClick={() => {onShowDialog()}} className="btn btn-primary ms-auto">Add path</button>
        </div>
    )
}

export default Header