import React from 'react'
import Header from './Header.jsx';
import Tools from './Tools.jsx';
import ToolsExp from './ToolsExp.jsx';
import Entries from './Entries.jsx';
import axios from 'axios';


const MockEntry = {
  title: "This is Quite the Long Title Tho What happend?",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.",
  time: "2017/12/31",
  name: "Smith, Mr Smith",
  email:"Smith@smithsson.com",
  country: "United State of Woop yo ass",
  city:"Texas Yo"
}

const longAssEntry = {
  title: "This is Quite the Long Title Tho What happend?",
  text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat doloribus quos sed, dolore amet suscipit cum incidunt eaque dignissimos pariatur sit doloremque asperiores illo? Repellat accusantium facere inventore omnis fuga.`,

  time: "2017/12/31",
  name: "Smith, Mr Smith",
  email:"Smith@smithsson.com",
  country: "United State of Woop yo ass",
  city:"Texas Yo"

}

const MockEntries = [longAssEntry, MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry,MockEntry]


class Gastolibro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {toolsVisible: false, entries: null};

    this.mostRecentEntry = null;
  };

  componentWillMount = () => {
    axios.get(`/api/entries?amount=30`).then(res => {
      this.setState({entries: res.data})

      this.mostRecentEntry = res.data[res.data.length - 1].id;
    });


    // this.setState({entries: MockEntries});
  };

  
  toggleTools = () => {
    if (this.state.toolsVisible) {
      setTimeout(() => this.setState({toolsVisible: false}), 800);
    } else {
      setTimeout(() => this.setState({toolsVisible: true}), 400);
    }
  }


  onSubmit = (entry, captchaId, captchaAnswer) => {
    this.setState(prevState => {
      var updatedEntries = [];
      updatedEntries[0] = entry;

      prevState.entries.map((entry, index) => {
        updatedEntries[index + 1] = entry;
      });

      return {entries: updatedEntries};
    });

    var submission = {
      captcha: {
        id: captchaId,
        answer: captchaAnswer
      },
      entry: entry
    }

    console.log(submission);

    axios.post("/api/entries", submission);
  };

  loadEntries = () => {
      axios.get(`/api/entries?amount=10&id=${this.mostRecentEntry}`).then(res => {
        this.setState(prevState => {
          var index = prevState.entries.length;

          res.data.map((entry, index_) => {
            prevState.entries[index_ + index] = entry;
          })

          return {entries: prevState.entries};
        });

        this.mostRecentEntry = res.data[res.data.length - 1].id;
      });
  }


  render() {

    var tools = (this.state.toolsVisible) ? <ToolsExp onSubmit={this.onSubmit} toggle={this.toggleTools}/> : <Tools toggle={this.toggleTools}/>

    return (
      <div className="app_container">
        <Header title="Ivan och Elsies Gästbok" />
        {tools}
        <Entries loadEntries={this.loadEntries} entries={this.state.entries}/>
      </div>
    )

  }
}

export default Gastolibro
