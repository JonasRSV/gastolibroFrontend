import React, { Component } from 'react'
import Entry from './Entry.jsx';



export class Entries extends Component {
  constructor(props) {
    super(props);

    this.state = {entries: props.entries}
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({entries: nextProps.entries});
  }

  scrollHandler = evt => { 
    if (evt.target.scrollHeight < evt.target.offsetHeight + evt.target.scrollTop + 100) {
      this.props.loadEntries();
    }
  }

  
  render() {

    if (this.state.entries) {
      return (
        <div onScroll={this.scrollHandler} className="entries_container">
            {this.state.entries.map((entry, index) => <Entry key={index} {...entry}/>)}
        </div>
      )
    } else {
      return (
        <div className="entries_container">
            No Entries TO be FOUND :((((
        </div>
      )
    }
  }
}

export default Entries
