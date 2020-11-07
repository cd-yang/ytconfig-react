import axios from 'axios';
import React, { Component } from 'react';
import { Layout, Table } from 'antd';
const { Sider, Content } = Layout;

export class Subsystem extends Component {
  static displayName = Subsystem.name;

  constructor(props) {
    super(props);
    this.state = { subsystemData: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

  static renderSubsystemTable(subsystemData) {
    let columns = [
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
    return (
      <Layout>
        {/* <Sider>
        </Sider> */}
        <Content>
          <Table dataSource={subsystemData} columns={columns} pagination={false} />
        </Content>
      </Layout>
    );
  }

  render() {
    return (
      <div>
        {this.state.loading
          ? <p><em>Loading...</em></p>
          : Subsystem.renderSubsystemTable(this.state.subsystemData)}
      </div>
    );
  }

  async populateData() {
    await axios.get("/api/subsystemdata")
      .then((response) => {
        console.log(response);
        this.setState({
          subsystemData: response.data.subsystemData,
          loading: false
        });
      })
      .catch((response) => {
        console.log(response);
      });

    console.log("get subsys data");
  }

}
