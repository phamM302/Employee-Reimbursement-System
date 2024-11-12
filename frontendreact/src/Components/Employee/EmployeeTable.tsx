//This component takes in the Employeee array as props from Employee

import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap"

//we'll call this Employee array "Employees"
export const EmployeeTable:React.FC<{employees:any[]}> = ({employees}) => {

    const[childEmployees, setEmployees] = useState<any[]>(employees);

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

    const deleteEmployee = async (id:number) => {
        const response = await axios.delete("http://localhost:7777/employees/" + id)
        .then((response) => {
            alert("deleted")
        })
        .then(()=> {
            getAllEmployees()
        })
    }

    return(
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Delete Employee</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {childEmployees.map((employee:any)=>(
                        <tr>
                            <td>{employee.userId}</td>
                            <td>{employee.username}</td>
                            <td>{employee.role}</td>
                            <td><Button className="btn-danger" 
                                onClick={() =>deleteEmployee(employee.userId)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}