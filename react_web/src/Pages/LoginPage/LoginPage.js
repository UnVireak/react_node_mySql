import { useState } from "react"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import request, {} from '../../share/request'
import styles from "./loginStyle.module.css"
const LoginPage = () => {

    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const Username = "sa"
    // const Password = "123"

    // when username and password is correct



       
  

    const onFinish =async (values) => {
      var param = {
        "phone":values.username,
        "password": values.password
      }
      const res = await request ("employee/login", "post", param)
       if (res) {
            // JSON.stringify(obj) convert object to string
            // JSON.parse(obj) convert string obj to object json
            localStorage.setItem("user", JSON.stringify(res.user))

            localStorage.setItem("isLogin", '1')
            window.location.href = "/"
           
        } else {
            message.warning(res.message)
        }
    
        
    }

    return (
      <div className={styles.section}>
    <div className={styles.container}>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
        </Form>
    </div>
    </div>
        // <div>
        //     <h3 style={{ color: "red" }}> This is Login Page.</h3>
        //     <>Username</><input type="text"
        //         onChange={(event) => {
        //             setUsername(event.target.value)
        //         }} />  <br></br> <br></br>
        //     <>Password</><input type="text"
        //         onChange={(event) => {
        //             setPassword(event.target.value)
        //         }} />  <br></br> <br></br>


        //     <button type="button" style={{ marginLeft: 80 }} onClick={handleLogin}>Login</button>
        //     <button type="button" style={{ marginLeft: 10 }}>Register</button>


        // </div>
    )

}

export default LoginPage;