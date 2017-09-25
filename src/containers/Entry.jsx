import React, { Component } from 'react'

class EntryModal extends Component {
    constructor(props) {
        super(props);

        this.state = {classNames: ""}
    }

    componentWillMount = () => {
      this.setState({classNames: "entry_modal"});
    }
    
    
    hideModal = () => {
        this.setState({classNames: "entry_modal_collapse"});
    };

    render() {

        return (
            <div onClick={this.hideModal} className={this.state.classNames}>

                <div className="modal_body">
                    {this.props.text}
                </div>

                 <div className="modal_contact">
                    <div className="modal_email">{this.props.email}</div>
                    <div className="modal_name"> - {this.props.name} </div>
                 </div>

                <div className="modal_location">
                    <div className="modal_country"> {this.props.country} </div>
                    -
                    <div className="modal_city"> {this.props.city} </div>
                </div>
                <div className="modal_time"> {this.props.time} </div>

            </div>
        )
    }

}

export class Entry extends Component {
    constructor(props) {
        super(props);

        this.state = {showModal: false};
    }

    toggleModal = () => {
        if (this.state.showModal) {
            setTimeout(() => this.setState({showModal: false}), 600);
        } else {
            this.setState({showModal: true});
        }
    }

    render() {

        var modal = (this.state.showModal) ? <EntryModal {... this.props} hide={this.toggleModal} /> : null


        return (
            <div onClick={this.toggleModal} className="entry_container">
                <div className="entry_title">
                    {this.props.title}
                </div>
                <div className="entry_misc">
                    <div className="entry_time">
                            {this.props.time}
                    </div>
                    <div className="entry_name">
                            {this.props.name}
                    </div>
                </div>

                {modal}
            </div>
        )
    }
}

export default Entry
