import React, { useContext, useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom"

import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';

import Ingresar from './Ingresar'
import Cola from './Cola'
import NewTicket from './NewTicket'
import Desktop from './Desktop'
import useMenu from '../hooks/useMenu';
import { UiContext } from '../context/UiContext';

const { Content, Sider } = Layout

const RouterPage = () => {

    const [toogle, setToogle] = useState(false)
    const {ocultarMenu} = useContext(UiContext)

    useMenu(true)

    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider 
            collapsible 
            collapsed={toogle} 
            onCollapse={() => setToogle(!toogle)}
            collapsedWidth={50}
            breakpoint='md'
            hidden={ocultarMenu}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to={'/ingresar'}>Ingresar</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to={'/cola'}>Cola</Link>
              </Menu.Item>

              <Menu.Item key="9" icon={<FileOutlined />}>
                <Link to={'/new-ticket'}>Emitir Tickets</Link>
              </Menu.Item>

            </Menu>
          </Sider>

          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{padding: 24, minHeight: '90%', margin: 30}}>
                <Switch>
                  <Route path='/ingresar' component={Ingresar}/>
                  <Route path='/cola' component={Cola}/>
                  <Route path='/new-ticket' component={NewTicket}/>
                  <Route path='/desktop' component={Desktop}/>
                  <Redirect to='/ingresar'/>
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
};

export default RouterPage;