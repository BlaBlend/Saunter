import Header from './components/Header'
import Form from './components/Form'
import React from 'react'
import ListContainer from './components/ListContainer'
import DescriptionContainer from './components/DescriptionContainer'

export default class Main extends React.Component {
  constructor() {
    super();
    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.state = {isModalVisible: false}
  }

  showDialog(){
    this.setState({
      isModalVisible: true
    })
  }
  
  console.log('test)

  hideDialog(){
    this.setState({
      isModalVisible: false
    })
  }
  
  render(){
    return (
      <div className="row m-3">
        <Header onShowDialog={this.showDialog}></Header>
        <ListContainer></ListContainer>
        <DescriptionContainer></DescriptionContainer>
        {this.state.isModalVisible && (<Form onHideDialog={this.hideDialog}></Form>)}
      </div>
    );
  } 
}
