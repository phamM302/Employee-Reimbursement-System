import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { ReimbursementTable } from "./ReimbursementTable"
import { store } from "../../globalData/store"

export const ReimbursementContainer:React.FC = () => {

    //we'll store a state object that contains an Array of ReimbursementInterfaces
    //TODO: make the reimbursement interface, but for now, we can just use an any[]
    const[reimbursements, setReimbursements] = useState([])

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
        //TODO: then(), catch() etc

        //populate the Reimbursements state object
        setReimbursements(response.data) //data holds the data send in the response body

        console.log(response.data)
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
        const response = await axios.get('http://localhost:7777/reimbursements/status/PENDING')
            .then((response) => {
                setReimbursements(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching all of the reimbursements by status');
            })
    }

    const handleGetAllReimbursements = () => {
        if (store.loggedInUser.role == "admin") {
            getAllReimbursements();
        } else {
            getReimbursementsByUserId();
        }
    }


    return(
        /* TODO: navbar thing? for navigation options etc */
        <Container>

            <h3>{store.loggedInUser.username}'s Reimbursements:</h3>
            {/* Sending the entire Reimbursements array to get rendered in the ReimbursementTable Component */}
            <ReimbursementTable reimbursements={reimbursements}></ReimbursementTable>
        </Container>
    )

}