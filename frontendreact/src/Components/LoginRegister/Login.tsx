import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"

export const Login:React.FC = () => {

    //A state object that holds username and password
    const[loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    //we need a useNavigate hook to navigate between components programatically
        //(which means we don't have to manually switch the URL!)
    const navigate = useNavigate()

    //Function that stores user input
    const storeValues = (input:any) => {

        const name = input.target.name //the name of the input box that changed
        const value = input.target.value //the value in the input box 

        setLoginCreds((loginCreds) => ({...loginCreds, [name]:value}))

        //check comments in storeValues() of Register.tsx for how this all works
    }

    //Function that sends login POST request to the server
    //This navigates to /reimbursements if role is "User" and /users if role is "Admin"
    const login = async () => {

        //TODO: we should make sure the username/password are inputted first

        //use the username/password in the loginCreds state object
        const response = await axios.post("http://localhost:7777/auth", loginCreds)
        .then(

            //if the request is successful: 
                //print the data 
                //save it locally
                //alert the user they logged in
                //navigate to /reimbursements
                    //TODO: navigate to /users OR /reimbursements depending on role

            //response's definition doesn't exist if we just try to invoke it without an arrow function
            //React doesn't know what the value is otherwise
            (response) => {
                console.log("hi")
                console.log(response.data)

                //saving the logged in user data globally
                store.loggedInUser = response.data

                //greet the user
                alert("Welcome, " + store.loggedInUser.username)
                if (store.loggedInUser.role == "admin") {
                    navigate("/employees")
                }
                else {//navigate to /reimbursements
                    navigate("/reimbursements")
                }
            }
        )
        .catch((error)=>{
            alert("Login Failed! Please try again.")
        })

    }


    return(
        /*Bootstrap gives us this Container element that does some default padding and centering*/
        <Container> 

            <h1>Welcome to the Reimbursement Center</h1>
                <h3>Please Log In:</h3>
                
                <div>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={storeValues}
                    />
                </div>
                

            <Button className="btn-success m-1" onClick={login}>Login</Button>
            <Button className="btn-dark" onClick={()=>navigate("/register")}>Register</Button>
        </Container>
    )

}