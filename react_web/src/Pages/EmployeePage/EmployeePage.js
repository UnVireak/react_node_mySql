import { request } from "../../share/request"
import React, { useEffect, useState, useRef } from "react"
import { Table, Space, Button, Tag, Input, Search, Modal, Form, Select, message, Spin, Popconfirm} from "antd"
import item from "antd/es/list/Item"
import { formatDateClient, formatDateServer, config_img_path } from "../../share/helper"
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
        if (textSearch != "") {
            param = "?textSearch=" + textSearch;
        }

        const res = await request("employee" + param, "get")

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
    const [image, setImage] = useState(null)
    const [imagePre, setImagePre] = useState(null)
    const refMyImage = useRef()


    const onDelete = async (rows) => {
        var param = {
           emp_id : rows.emp_id,
           emp_img : rows.emp_img
        }
        const res = await request ("employee", "delete", param);
        if (!res.error){
            getData();
        }else{
            alert(res.message)
        }
       
    }
    

    // const onDeletes= async (rows) => {
    //      var param = {
    //         emp_id : rows.emp_id,
    //         emp_img : rows.emp_img
    //     }
    //     setConfirm(true);

    //     const handleDelete = async (param) => {

    //         const res = await request("employee/" + param, "delete");
    //         if (res) {
    //             getData();
    //         }
    //         setConfirm(false); // Close the modal after deletion
    //     };

    //     setConfirmDeleteCallback(() => handleDelete);

    // };
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
        // var param = {
        //     "emp_name": values.emp_name,
        //     "gender": values.gender,
        //     "role": values.role,
        //     "address": values.address,
        //     "phone": values.phone
        // }
        var formData = new FormData();
        formData.append("emp_name", values.emp_name)
        formData.append("gender", values.gender)
        formData.append("role", values.role)
        formData.append("address", values.address)
        formData.append("phone", values.phone)
        formData.append("emp_img", image, image.filename)

        var method = "post"
        if (emp_Id != null) {
            // param.emp_id = emp_Id
            formData.append("emp_id", emp_Id)
            method = "put"
        }
       
        try {
            const res = await request("employee", method, formData);
            if (res && !res.error) {
                message.success(res.message);
                getData();
                onReset();
                handleOk();
            } else {
                message.error(res.message || "Failed to create/update employee");
            }
        } catch (error) {
            console.error("Error:", error);
            message.error("An error occurred while processing your request");
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
    const onClickEdit = (item) => {
        if (item) {
            setEmpID(item.emp_id);
            form.setFieldsValue({
                emp_name: item.emp_name,
                gender: item.gender,
                role: item.role,
                address: item.address,
                phone: item.phone,
                hireDate: formatDateServer(item.hired_date)
            });
            setImagePre(config_img_path.img_path+item.emp_img)
            onOpenModal();
        }
    };



    // Clear
    const onReset = () => {
        form.resetFields();
        setImage(null)
        setImagePre(null)
        refMyImage.current.value = null
    };
    const onFill = () => {
        form.setFieldsValue({
            note: 'Hi There!',
            // gender: 'male',
        });
    };

    const onSearch = (value) => {
        // alert(value)
        getData()
    }

    const onChangeTextSearch = (e) => {
        setTextSearch(e.target.value)
    }

    const onchangeFile = (e)=>{
        var img_file = e.target.files[0]
        // console.log(img_file)
        setImage(img_file)
        setImagePre(URL.createObjectURL(img_file))

    }

    const onRemoveImage = (x) =>{
        x.preventDefault()
        setImage(null)
        setImagePre(null)
    }
    return (
        <div >
            <Spin spinning={loading}>

                {/* <Modal open={confirm} footer={null} closable={false}>
                    <p>hi</p>
                    <space wrapperCol={24} style={{ textAlign: "right" }}>
                        <Button onClick={closeConfirm}>Cancel</Button>
                        <Button onClick={onDelete}>Ok</Button>
                    </space>
                </Modal> */}

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
                                name="emp_name"
                                label="Name"
                                rules={[
                                    { required: true },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="gender"
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
                                label ="Select picture"
                                // name={image}
                            >
                                <Input type="file"
                                ref = {refMyImage}
                                 onChange = {onchangeFile}
                                 
                                />
                                 <img 
                               src ={imagePre}
                               width={150}
                               style={{marginTop:10}}
                               /> 
                               {emp_Id != null && 
                                               
                                                    <button onClick={onRemoveImage}>
                                                        {/* <IoIosCloseCircle size={22} color="red"/> */} remove
                                                    </button>
                                               
                                            }
                            </Form.Item>
                         
                            
                          
                               
                               
                         

                            {/* <Form.Item
                            name="hireDate"
                            label="Hire Date"
                            // rules={[{ required: true, },]}
                            disabled={false}
                            
                        >
                            <Input />
                        </Form.Item> */}

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

                        <Input.Search allowClear className={styles.searchBox} onSearch={onSearch} onChange={onChangeTextSearch} />
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
                            render: (value, item, index) => (index + 0)
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
                            key: "Image",
                            title: "Image",
                            dataIndex: "emp_img",
                            render: (value, rows, index) => {
                                return (
                                    
                                    <img
                                    key = {index}
                                        src={config_img_path.img_path + value}
                                        width={70}
                                        alt="Image"
                                    />
                                );
                            }
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
                                        <Button type="primary" onClick={() => onClickEdit(item)}> EDIT</Button>
                                        <Popconfirm
                                            title="Delete"
                                            description="Are you sure to delete this record?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => onDelete(item)}
                                        >
                                            <Button danger>Delete</Button>
                                        </Popconfirm>

                                        {/* <Button danger onClick={() => onDelete(item)}>DELETE</Button> */}
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
