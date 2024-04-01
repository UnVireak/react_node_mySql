import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

function MainLayout() {
// turn to login page first
    
        const isLogin = localStorage.getItem("isLogin")
        useEffect( ()=>{
            if(isLogin == null || isLogin == "null"){
                alert(isLogin)
               window.location.href="/login"
            }
        },[])

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const navigate = useNavigate()
    const onClickPage = (pagename) => {
        navigate(pagename)
    }

    const onLogout = () =>{
            localStorage.setItem("isLogin", "null")
            window.location.href="/login"
} 
  
 return (



        // window.location.href=param

        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                // icon: <UserOutlined />,
                                label: 'Dashboad',
                                onClick: () => onClickPage("/")

                            },
                            {
                                key: '2',
                                // icon: <VideoCameraOutlined />,
                                label: 'Category',
                                onClick: () => onClickPage("/category")
                            },
                            {
                                key: '3',
                                // icon: <UploadOutlined />,
                                label: 'Login',
                                onClick: () => onClickPage("/login")
                            },
                            
                            {
                                key: '4',
                                // icon: <UploadOutlined />,
                                label: 'Logout',
                                onClick:()=>onLogout()
                            },
                            
                            {
                                key: '5',
                                // icon: <UploadOutlined />,
                                label: 'Customer',
                                onClick: () => onClickPage("/customer")

                            }
                            ,
                            
                            {
                                key: '6',
                                // icon: <UploadOutlined />,
                                label: 'Employee',
                                onClick: () => onClickPage("/employee")

                            }
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style = {{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "90vh",
                            background: colorBgContainer,
                        }}
                    >
                        < Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>





    );
}
export default MainLayout;