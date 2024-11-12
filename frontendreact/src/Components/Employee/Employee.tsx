//This is sort of a placeholder component - admins get navigated to this after login
//In your P1 this is probably where admins could see all users, update, delete etc.

import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { EmployeeTable } from "./EmployeeTable"

//And maybe there's a navbar or some button that navigates to the admin reimbursement manager
export const Employee:React.FC = () => {
    
    //state object for array of employees
    const[employees, setEmployees] = useState([])

    useEffect(()=>{
        getAllEmployees()
    }, [])//triggers on component load

    const getAllEmployees = async () => {
        const response = await axios.get("http://localhost:7777/employees")

        
        .then((response) => {
            setEmployees(response.data)
        })
        .catch((error) => {
            alert("Error in getting all users")
        })
        
    }

    return(
        <Container>
            <h3>Employees</h3>
            {}
            <EmployeeTable employees={employees}></EmployeeTable>
        </Container>
    )

}