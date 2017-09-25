import React, { Component } from 'react'



export default class Tools extends Component {
  constructor(props) {
    super(props);

    this.state = {classNames: ""};

  }

  componentWillMount = () => {
    this.setState({classNames: "peniconborder"})
  }


  onClickAction = () => {
    this.setState({classNames: "collapse_penicon"});
    this.props.toggle();
  }
  

  render() {
    return (
      <div className="tools_container">
        <div ref="toolIcon" className={this.state.classNames}>
          <img  onClick={this.onClickAction} className="penicon" src="images/PenIcon.png" alt="There should be an image here, whatever.. click me to write something!"/>
        </div>
        
      </div>
    )
  }
}
