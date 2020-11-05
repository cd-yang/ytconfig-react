import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Table, Button, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

// eslint-disable-next-line no-unused-vars
import mockData from './mock';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  state = {
    selectedFile: null,
    tableData: null,
  };

  onFileChange = event => {
    event.stopPropagation();
    event.preventDefault();

    // Update the state 
    let file = event.target.files[0];
    console.log(file);
    this.setState({ selectedFile: file }, this.onFileUpload);
  };

  onFileUpload = () => {
    if (this.state.selectedFile === undefined || this.state.selectedFile === null
      || this.state.selectedFile.name === undefined || this.state.selectedFile.name === null)
      return;
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
      <Layout className="app-container">
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" onClick={() => { this.upload.click() }}>
              <input type="file" id="file" style={{ display: "none" }}
                directory="" webkitdirectory=""
                ref={(ref) => this.upload = ref}
                onChange={this.onFileChange.bind(this)} />
              加载配置
            </Menu.Item>
            <Menu.Item key="2">加载 Excel</Menu.Item>
            <Menu.Item key="3">设置配置</Menu.Item>
            <Menu.Item key="4">设置模板</Menu.Item>
            <Menu.Item key="5">保存配置</Menu.Item>
            <Menu.Item key="6">另存配置</Menu.Item>
          </Menu>
        </Header>
        <Content>
          {this.state.tableData
            ? <ConfigTable tbData={this.state.tableData}></ConfigTable>
            : <h1 className="emptyProjectInfo">请打开配置文件所在文件夹</h1>
          }
        </Content>
        <Footer style={{ textAlign: "center" }}>ShareE ©2020 YCD</Footer>
      </Layout>
    );
  }
}

class ConfigTable extends React.Component {
  render() {
    const tableData = this.props.tbData;
    return (
      <div className="config-container">
        <Table dataSource={tableData} columns={columns} pagination={false} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: text => <a>{text}</a>,
  },
  {
    title: 'Guid',
    dataIndex: 'id',
    key: 'id',
  },
];