import { request } from "../../share/request"
import { useEffect, useState } from "react"
import { Table, Space, Button, Tag, Input, Search, Modal, Form, Select, message, Spin } from "antd"
import item from "antd/es/list/Item"
import { formatDateClient, formatDateServer } from "../../share/helper"
import styles from "./styles.module.css"
import { Footer } from "antd/es/layout/layout"
import { isString } from "antd/es/button"



const EmployeePage = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {
        setLoading(true)
        var param = ""
        if(textSearch != ""){
            var param = "?textSearch="+textSearch; 
        }
       
        const res = await request("employee"+param,  "get")

        setLoading(false)

        // setTimeout(()=>{
        //     setLoading(false)
        // }, 5000)
        
        if (res) {
            setData(res.data);
        } else {
            console.log(res.error)
        }
        handleOk();
    }

    const [confirm, setConfirm] = useState(false)
    const openConfirm = () => setConfirm(true)
    const closeConfirm = () => setConfirm(false)
    const [emp_Id, setEmpID] = useState(null)
    const [loading, setLoading] = useState(false)
    const [textSearch, setTextSearch] = useState('')
    
    


    const onDelete = async (emp_id) => {
        //  var param = {
        //     "emp_id":emp_id
        // }
        setConfirm(true);

        const handleDelete = async () => {
           
            const res = await request("employee/" + emp_id,"delete");
            if (res) {
                getData();
            }
            setConfirm(false); // Close the modal after deletion
        };

        setConfirmDeleteCallback(() => handleDelete);

    };
const [confirmDeleteCallback, setConfirmDeleteCallback] = useState(null);
    //modal useState 

    const [visible, setVisible] = useState(false);

    const onOpenModal = () => {
        setVisible(true)
    }

    // onOk 
    const handleOk = (e) => {
        setVisible(false)
    }
    // onCancel  
    const handleCancel = (e) => {
        console.log(e);
        setVisible(false);
        onReset();
        setEmpID(null)
    }


    // Block Form 
    const [form] = Form.useForm();
    const { Option } = Select;
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    // Post
    const onFinish = async (values) => {
       var param = {
          "emp_name": values.name,
            "gender": values.gebder,
            "role": values.role,
            "address": values.address,
            "phone": values.phone
       } 

       var method = "post"
       if(emp_Id != null){
        param.emp_id = emp_Id
        var method = "put"
       }
        const res = await request("employee", method, param);

         
        if (!res.error) {
            message.success(res.message);
            getData();
            onReset();
            handleOk();
        } else {
            message.error(res.message);
        }

    };

    
    
//     address
// : 
// "Phnom Penh"
// emp_id
// : 
// 1
// emp_name
// : 
// "Meas Sokna"
// gender
// : 
// 0
// hired_date
// : 
// "2023-10-26T09:22:27.000Z"
// phone
// : 
// "012222222"
// role
// : 
// "Admin"
    const onClickEdit = (item)=>{
       setEmpID(item.emp_id)
    //    console.log(item)
        form.setFieldsValue({
            name: item.emp_name,
            gebder:item.gender,
            role: item.role,
            address:item.address,
            phone:item.phone,
            hireDate:formatDateServer(item.hired_date) 

        });
         onOpenModal()
    }


    // Clear
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue({
            note: 'Hi There!',
            // gender: 'male',
        });
    };

    const onSearch = (value) =>{
        // alert(value)
        getData()
    }

    const onChangeTextSearch = (e) =>{
        setTextSearch(e.target.value)
    }
    return (
        <div >
            <Spin spinning = {loading}>
            
           <Modal open={confirm} footer={null} closable={false}>
            <p>hi</p>
            <space wrapperCol={24} style={{ textAlign: "right" }}>
                <Button onClick={closeConfirm}>Cancel</Button>
                <Button onClick={confirmDeleteCallback }>Ok</Button>
            </space>
           </Modal>

            {/* Add new employee modal */}

            <div>
                <Modal
                    title={"Add new employee"}
                    closeIcon={false}
                    maskClosable={false}
                    footer={false}
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                { required: true, },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="gebder"
                            label="Gender"
                            rules={[{ required: true, },]}
                        >
                            <Select
                                placeholder="Select gender"
                                allowClear={true}
                                onChange={() => { }}
                            >
                                <Option value={1}>Male</Option>
                                <Option value={0}>Female</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{ required: true, },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, },]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="hireDate"
                            label="Hire Date"
                            // rules={[{ required: true, },]}
                            disabled={false}
                            
                        >
                            <Input />
                        </Form.Item>
                       
                        <Form.Item >
                            <Space>
                                <Button htmlType="submit" type="primary" onClick={onFinish}>{emp_Id == null ? "Save" : "Update"}</Button>
                                <Button htmlType="button" onClick={onReset}>Clear</Button>
                                <Button htmlType="button" onClick={handleCancel}>Cancel</Button>
                            </Space>

                        </Form.Item>

                    </Form>

                </Modal>

            </div>



            <h1>Employee Page.</h1>
            <div className={styles.searchContainer}>

                <div className={styles.searchBar}>

                    <div className={styles.searchLabel}>Search Employee</div>

                    <Input.Search allowClear className={styles.searchBox} onSearch={onSearch} onChange={onChangeTextSearch}/>
                </div>
                <div className={styles.addNew}>

                    <Button
                        type="primary"
                        onClick={onOpenModal}
                    >
                        Add New
                    </Button>

                </div>

            </div>
            <input type="file"></input>


            <Table
                dataSource={data}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        dataIndex: "emp_id",
                        render: (value, item, index) =>(index+0)
                    },
                    {
                        key: "Name",
                        title: "Name",
                        dataIndex: "emp_name"
                    },
                    {
                        key: "Gender",
                        title: "Gender",
                        dataIndex: "gender",
                        render: (value, item, index) => value == 1 ? "Male" : "Female"
                    },
                    {
                        key: "Role",
                        title: "Role",
                        dataIndex: "role",
                        render: (value) => {
                            return (
                                <Tag>{value}</Tag>
                            )
                        }
                    },
                    {
                        key: "Adderss",
                        title: "Address",
                        dataIndex: "address"
                    },
                    {
                        key: "Phone",
                        title: "Phone",
                        dataIndex: "phone"
                    },
                    {
                        key: "Hired Date",
                        title: "Hired Date",
                        dataIndex: "hired_date",
                        render: (value) => formatDateClient(value)
                    }
                    ,
                    {
                        key: "Action",
                        title: "Action",
                        dataIndex: "hired_date",
                        render: (value, item, index) => {
                            return (
                                <Space key={index}>
                                    <Button type="primary" onClick={()=>onClickEdit(item)}> EDIT</Button>
                                    <Button danger onClick={() => onDelete(item.emp_id)}>DELETE</Button>
                                </Space>

                            )
                        }
                    }
                ]}>

            </Table>

            </Spin>
        </div>
    )
}

export default EmployeePage;
