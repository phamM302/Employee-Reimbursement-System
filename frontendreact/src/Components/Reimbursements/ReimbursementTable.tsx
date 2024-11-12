//This component takes in the Reimbursements array as props from the ReimbursemenContainer

import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap"
import { store } from "../../globalData/store";

//we'll call this reimbursements array "reimbursements"
export const ReimbursementTable:React.FC<{reimbursements:any[]}> = ({reimbursements}) => {


    const[childReimbursements, setReimbursements] = useState<any[]>(reimbursements);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [description, setDescription] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [userId, setUserId] = useState('');
    const [reimbursementToUpdate, setReimbursementToUpdate] = useState<any>(null);
    const [newStatus, setNewStatus] = useState("");
    //Defining a useEffect that calls the function that gets reimbursements by userId
    useEffect(()=>{
        if (store.loggedInUser.role == 'admin') {
            getAllReimbursements();
        } else {
            getReimbursementsByUserId();
        }
    }, []) //this useEffect triggers on component load


    //The function that gets all Reimbursements with an axios GET request
    const getReimbursementsByUserId = async () => {

        //axios GET request 
        //NOTE: using the id of the loggedInUser to get only their Reimbursements
        const response = await axios.get("http://localhost:7777/reimbursements/employees/" + store.loggedInUser.userId)
        .then((response) => {
            //populate the Reimbursements state object
            setReimbursements(response.data) //data holds the data send in the response body

            console.log(response.data)
        })
        .catch((error) => {
                console.error('Error fetching all reimbursements by id:', error);
        })
    }

    // Function to get all reimbursements (for managers)
    const getAllReimbursements = async () => {
        const response = await axios.get('http://localhost:7777/reimbursements')
            .then((response) => {
                setReimbursements(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching all reimbursements:', error);
            })
    }

    const getPendingReimbursements = async () => {
        if (store.loggedInUser.role == "admin") {
            const response = await axios.get('http://localhost:7777/reimbursements/status/PENDING')
                .then((response) => {
                    setReimbursements(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching all of the reimbursements by status');
                })
        }
        else {
            const response = await axios.get("http://localhost:7777/reimbursements/employees/"+ store.loggedInUser.userId +"/status/PENDING")
                .then((response) => {
                    setReimbursements(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching all of the reimbursements by status');
                })
        }
    }

    const handleGetAllReimbursements = () => {
        if (store.loggedInUser.role == "admin") {
            getAllReimbursements();
        } else {
            getReimbursementsByUserId();
        }
    }

    const handleSubmitReimbursement = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate fields
        if (!description || !amount || !userId) {
            alert("Please fill in all fields.");
            return;
        }

        if (userId != store.loggedInUser.userId && store.loggedInUser.role != "admin") {
            alert("Please enter the correct User ID")
            return;
        }

        const newReimbursement = {
            status: "PENDING",
            description,
            amount: parseFloat(amount),
            userId,
        }

        try {
            const response = await axios.post("http://localhost:7777/reimbursements", newReimbursement);
            console.log("Reimbursement Created:", response.data);
            setReimbursements([...childReimbursements, response.data]); // Add new reimbursement to state
            setShowCreateModal(false); // Close modal after submission
        } catch (error) {
            console.error('Error creating reimbursement:', error);
        }
    }

    const handleUpdateReimbursement = async () => {
        if (!newDescription) {
            alert("Please provide a description.");
            return;
        }

        try {
            // Update description
            await axios.patch(
                `http://localhost:7777/reimbursements/description/${reimbursementToUpdate.reimbursementId}`,
                newDescription,
                { headers: { 'Content-Type': 'text/plain' } }
            );

            // If the user is an admin, update the status too
            if (store.loggedInUser.role === "admin") {
                await axios.patch(
                    `http://localhost:7777/reimbursements/status/${reimbursementToUpdate.reimbursementId}`,
                    newStatus,
                    { headers: { 'Content-Type': 'text/plain' } }
                )
            }

            handleGetAllReimbursements();
            setShowUpdateModal(false);
        } catch (error) {
            console.error('Error updating reimbursement:', error);
        }
    }

    const openUpdateModal = (reimbursement: any) => {
        setReimbursementToUpdate(reimbursement);
        setNewDescription(reimbursement.description);
        setNewStatus(reimbursement.status);
        setShowUpdateModal(true);
    }

    return(
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Reimbursement ID</th>
                        <th>Status</th>
                        <th>Decription</th>
                        <th>Amount</th>
                        <th>Employee Id</th>
                        <th>Update Description</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {childReimbursements.map((reimbursement:any)=>(
                        <tr>
                            <td>{reimbursement.reimbursementId}</td>
                            <td>{reimbursement.status}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.amount}</td>
                            <td>{reimbursement.employee.userId}</td>
                            <td><Button onClick={() => openUpdateModal(reimbursement)}>Update</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="row">
                <div className="col">
                    <Button onClick={getPendingReimbursements}>Get Pending Reimbursements</Button>
                </div>
                <div className="col">
                    <Button onClick={handleGetAllReimbursements}>Get All Reimbursements</Button>
                </div>
                <div className="col">
                    <Button onClick={() => setShowCreateModal(true)}>Create a New Reimbursement</Button>
                </div>
            </div>

            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Reimbursement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitReimbursement}>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter user ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Reimbursement Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Enter new description"
                            />
                        </Form.Group>
                        {/* Conditionally render status update for admin users */}
                        {store.loggedInUser.role === "admin" && (
                            <Form.Group className="mt-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                    <option value="PENDING">Pending</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="DENIED">Denied</option>
                                </Form.Select>
                            </Form.Group>
                        )}
                     </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUpdateReimbursement}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )

}