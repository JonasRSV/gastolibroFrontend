import React, { Component } from 'react'

export class Header extends Component {
    constructor(props) {
      super(props);
    }

    redirect = () => window.location.replace("http://www.valfridsson.net/ivan/");

    render() {
      return (
        <div className="header_container">
          <img className="header_image" src="images/BookImg.png" alt="Fancy Background"/>
          <div className="page_title">
            {this.props.title}
          </div>
          <div className="header_misc">
            {/* <img onClick={this.redirect} className="return_arrow" src="images/ReturnImage.png" alt="Cute Image"/> */}
            {/* <img src="" alt="Cute Image2"/> */}
          </div>
        

        </div>
      )
    }
}

export default Header
