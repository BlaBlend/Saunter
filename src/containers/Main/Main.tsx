import React, { useState } from 'react'

import Header from '../../components/Header/Header'
import Form from '../../components/Form/Form'
import ListContainer from '../../components/List/ListContainer'
import DescriptionContainer from '../../components/Description/DescriptionContainer'

const Main: React.FC = () => {
    const [isModalVisible, changeVisible] = useState(false)

	function showDialog(){
		changeVisible(true)
	}

	function hideDialog(){
		changeVisible(false)
	}

    return (
        <div className="row m-3">
            <Header onShowDialog={showDialog}></Header>
            <ListContainer></ListContainer>
            <DescriptionContainer></DescriptionContainer>
            {isModalVisible && (<Form onHideDialog={hideDialog}></Form>)}
        </div>
    )
}

export default Main