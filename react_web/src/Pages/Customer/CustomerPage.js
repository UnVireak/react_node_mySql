import { useState, useEffect } from 'react'
import { Table, Stack, Button, Modal, Form, FloatingLabel } from 'react-bootstrap'
import { request } from '../../share/request'


const CustomerPage = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        getlist();
    })


    const getlist = async () => {
        const res = await request("customer", "get", {});
        console.log(res)
        if (res) {
            setList(res.list);
        }
    }
    

    const onDelete =  async(id)=> {

         setConfirm(true);
        const handleDelete = async () => {
            const res = await request("customer/" + id, "delete");
            if (res) {
              getlist();
            }
            setConfirm(false); // Close the modal after deletion
          };

          setConfirmDeleteCallback(() => handleDelete); 
    
    };


    // const onConfirmDelete = async(id)=> {
       
    //     const res = await request("customer/" + id, "delete");
    //     if (res) {
    //         getlist();
    //     }


    // cfDelete
    const [confirmDeleteCallback, setConfirmDeleteCallback] = useState(null);
   
    // useState for Add New Custoomer
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [confirm, setConfirm] = useState(false)
    const openConfirm = () => setConfirm(true)
    const closeConfirm = () => setConfirm(false)

    //useState of Records

    const [id, setId] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");



    // Button in add new modal

    const onCancel = () => {
        setShow(false);
        onClear();

    }

    const onClear = () => {
        setId("")
        setFirstName("")
        setLastName("")
        setGender("")
        setPhone("")
    }

    const onSubmit = async () => {
        if (id == "") {
            var param = {
                FirstName: firstName,
                LastName: lastName,
                Gender: gender,
                Phone: phone
            }
            const res = await request("customer", "post", param);
            onClear()
            setShow(false)
            if (res) {
                if (!(res.error)) {
                    getlist();
                } else {
                    alert(res.message)
                }
            }
        }
        else {
            var param = {
                Id: id,
                FirstName: firstName,
                LastName: lastName,
                Gender: gender,
                Phone: phone
            }
            const res = await request("customer", "put", param);
            onClear()
            setShow(false)
            if (res) {
                if (!(res.error)) {
                    getlist();
                } else {
                    //alert(res.message)
                    console.log(res);
                    alert(res.errorMessage);
                }
            }

        }
    }



    const onEdit = (item) => {
        setShow(true)
        setId(item.Id)
        setFirstName(item.FirstName)
        setLastName(item.LastName)
        setGender(item.Gender)
        setPhone(item.Phone)
    }
    return (

        <div>
            <div><h3>Customer</h3></div>
            <div style={{ marginLeft: "900px" }}>
                <Button style={{ marginBottom: "10px", width: "140px" }}
                    type="primary"
                    onClick={() => setShow(true)}> New Customer</Button>
            </div>

            {/* Add New Modal */}
            <Modal show={show} onHide={handleClose} animation={false} backdrop="static">
                <Modal.Header>
                    <Modal.Title>{(id == "") ? "Add New Customer" : "Update Customer"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
                    {/* <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="id"
                                autoFocus
                            /> <br></br> */}
                    {/* <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                            /><br></br>
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                            /><br></br>
                            <Form.Control
                                type="text"
                                placeholder="Gender"
                            /><br></br>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                            />
                        </Form.Group>

                    </Form> */}
                    <FloatingLabel controlId='Id'
                        label='Id'
                        className='mb-3'
                    >
                        <Form.Control
                            onChange={(event) => setId(event.target.value)}
                            value={id}
                            type='text'
                            placeholder='Id'
                            disabled  
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId='firstName'
                        label='First Name'
                        className='mb-3'
                    >
                        <Form.Control
                            onChange={(event) => setFirstName(event.target.value)}
                            value={firstName}
                            type='text'
                            placeholder='First Name'
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId='lastName'
                        label='Last Name'
                        className='mb-3'
                    >
                        <Form.Control
                            onChange={(event) => setLastName(event.target.value)}
                            value={lastName}
                            type='text'
                            placeholder='Last Name'
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId='gender'
                        label='Gender'
                        className='mb-3'
                    >
                        <Form.Control
                            onChange={(event) => setGender(event.target.value)}
                            value={gender}
                            type='text'
                            placeholder='Gender'
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId='phone'
                        label='Phone'
                        className='mb-3'
                    >
                        <Form.Control
                            onChange={(event) => setPhone(event.target.value)}
                            value={phone}
                            type='text'
                            placeholder='Phone'
                        />
                    </FloatingLabel>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="secondary" onClick={onClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        {(id == "") ? "Save" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* confirm modal */}

            <Modal show={confirm} onHide={setConfirm}>
        <Modal.Header >
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirm}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteCallback }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


            <div> <Table >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Gender</th>
                        <th>Phone</th>

                    </tr>
                </thead>

                <tbody >
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td >{item.Id}</td>
                            <td>{item.FirstName}</td>
                            <td>{item.LastName}</td>
                            <td>{item.Gender === 1 ? 'Male' : 'Female'}</td>
                            <td>{item.Phone}</td>
                            <td>
                                <Stack direction="horizontal" gap={2}>
                                    <Button type="primary" onClick={() => onEdit(item)}>Edit</Button>
                                    <Button type="danger" onClick={() => onDelete(item.Id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            </div>
        </div>

    )
}


export default CustomerPage;