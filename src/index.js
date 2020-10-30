import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// eslint-disable-next-line no-unused-vars
import mockData from './mock';

class App extends React.Component {
  state = {
    selectedFile: null,
    tableData: null,
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
    axios.post("/api/uploadfile", formData)
      .then((response) => {
        console.log(response);
        this.setState({ tableData: response.data.data });
      })
      .catch((response) => {
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
        {this.state.tableData
          ? <ConfigTable tbData={this.state.tableData}></ConfigTable>
          : <div>please upload file</div>
        }
      </div>
    );
  }
}

class ConfigTable extends React.Component {
  render() {
    const tableData = this.props.tbData;
    const listItems = tableData.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <div className="config-container">
        <ul>{listItems}</ul>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
