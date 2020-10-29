import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// eslint-disable-next-line no-unused-vars
import mockData from './mock';

class App extends React.Component {
  state = {
    selectedFile: null
  };

  onFileChange = event => {
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);
    axios.post("/api/uploadfile", formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  render() {
    return (
      <div className="app-container">
        <input type="file" onChange={this.onFileChange} />
        <br />
        <button onClick={this.onFileUpload}>Upload config file</button>
        <br />
        <ConfigTable />
      </div>
    );
  }
}

class ConfigTable extends React.Component {
  render() {
    return (
      <div className="config-container">
        <div>config table here</div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
