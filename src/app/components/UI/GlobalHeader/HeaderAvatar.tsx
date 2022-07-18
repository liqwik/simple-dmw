import React, { Component } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Avatar } from 'antd';
import { AppStorage } from 'utils';
import './styles.css';

export class HeaderAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      displayName: '',
    };
  }

  componentDidMount() {
    const userData = AppStorage.getAuthData();
    let displayName = 'Anonymous';

    if (userData && userData.email) {
      displayName = userData.email.split('@')[0];
    }

    this.setState({ user: userData, displayName });
  }

  handleLogout = () => {
    AppStorage.removeAuthData(true);
  };

  render() {
    const menuHeaderDropdown = (
      <Menu>
        <Menu.Item key="center">
          <UserOutlined />
          Account Center
        </Menu.Item>

        <Menu.Item key="settings">
          <SettingOutlined />
          Account Settings
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="logout" onClick={this.handleLogout}>
          <LogoutOutlined />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="avatar-wrapper">
        <Dropdown overlay={menuHeaderDropdown}>
          <div>
            <Avatar style={{ backgroundColor: '#87d068', marginRight: '10px' }} icon={<UserOutlined />} />
            {/* <span>{this.state.displayName}</span> */}
          </div>
        </Dropdown>
      </div>
    );
  }
}
