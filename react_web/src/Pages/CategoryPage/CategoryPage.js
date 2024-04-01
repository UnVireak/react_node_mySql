//import {table, Th, Tr, thea, Tbody, Td} from "react-bootstrap"
import axios from "axios";
import { Stack, Table } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { request } from "../../share/request"
import { Button, Modal, Form } from "react-bootstrap";
import useToken from "antd/es/theme/useToken";



const CategoryPage = () => {



    const [list, setList] = useState([])

    useEffect(() => {
        //block form load
        getlist();
    }, []);

    const getlist = async () => {
        request("category", "get", {}).then( res => {
            if (res) {
                setList(res.list)
            }
        })

        //    const res = await request("category","get",{})
        //    if(res){
        //     setList(res.list)
        //    }
        // //body function
        // axios ({
        //     url:"http://localhost:8081/api/category",
        //     method:"get",
        //     data:{}
        // }).then(res=>{
        //     //block respone succes from api
        //     var listCategory = res.data.list;
        //     var totalCategory = res.data.total;
        //     console.log(res.data)
        //     setList(listCategory)
        //    // console.log(res.data);
        // }).catch(error=>{
        //     //block error
        //     console.log(error)
        // }).finally(()=>{
        //     //always execute
        //     console.log("called finally")
        // })
    }

    // const functionGetDataFromApi = () =>{
    //     //body function
    //     axios ({
    //         url:"",
    //         method:"",
    //         data:{}
    //     }).then(res=>{
    //         //block respone succes from api

    //     }).catch(error=>{
    //         //block error
    //     }).finally(()=>{
    //         //always execute

    //     })
    // }

    // const listdata = [
    //     {
    //         category_id: 1,
    //         category_name: "Asus",
    //         description: "NULL"
    //     },
    //     {
    //         category_id: 2,
    //         category_name: "Dell",
    //         description: "NULL"
    //     },
    //     {
    //         category_id: 3,
    //         category_name: "MSI",
    //         description: "NULL"
    //     }
    // ] 
    // useState for Add New Category
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // useState for Edit categoey

    const [showEditModal, setShowEditModal] = useState(false);
    const closeEdit = () => setShowEditModal(false);
    const openEdit = () => setShowEditModal(true);

    //useState for Delete Category

    const [showDelete, setShowDete] = useState(false);
    const handleCloseDelete = () => setShowDete(false);
    const handleOpenDelete = () => setShowDete(true);
    return (

        <div>
            <div style={{ display: 'flex' }}>
                <h3>CategoryPage</h3>
                <Button style={{ marginLeft: '470px' }} type="primary" onClick={handleShow}> New category</Button>

            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {/*   <Form.Label>ID</Form.Label> */}
                            <Form.Control
                                type="text"
                                placeholder="id"
                                autoFocus
                            /> <br></br>
                            {/* <Form.Label>Category Name</Form.Label> */}
                            <Form.Control
                                type="text"
                                placeholder="Category Name"
                            /><br></br>
                            {/* <Form.Label>Description</Form.Label> */}
                            <Form.Control
                                type="text"
                                placeholder="Description"
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit modal */}

            <Modal show={showEditModal} onHide={closeEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3">

                            {/* <Form.Label>Category Name</Form.Label> */}
                            <Form.Control
                                type="text"
                                placeholder="Category Name"
                            /><br></br>
                            {/* <Form.Label>Description</Form.Label> */}
                            <Form.Control
                                type="text"
                                placeholder="Description"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={closeEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={closeEdit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal*/}

          
      {/* className="modal show"
 style={{ display: 'block', position: 'initial' }}    */}
        <Modal show={showDelete} onHide={handleCloseDelete} closeButton>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Do you want to delete this record.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>Close</Button>
          <Button variant="danger" onClick={handleCloseDelete}>Delete</Button>
        </Modal.Footer>
      </Modal.Dialog>
      </Modal>
    
            {/* {list.map((item, index)=>(
               <div key={index} style={{margin:20}}>
                <div>{item.category_name}</div>
                <div>{item.description}</div>
               </div> 
            ))}  
             */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody >
                    {list.map((item, index) => (
                        <tr >
                            <td key={index}>{item.category_id}</td>
                            <td key={index}>{item.category_name}</td>
                            <td key={index}>{item.description}</td>
                            <td>
                                <Stack direction="horizontal" gap={2}>
                                    <Button type="primary" onClick={openEdit}>Edit</Button>
                                    <Button type="danger" onClick={handleOpenDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>
    )
}

export default CategoryPage;