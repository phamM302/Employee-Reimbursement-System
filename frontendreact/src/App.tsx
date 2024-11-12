import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Components/LoginRegister/Login';
import { Register } from './Components/LoginRegister/Register';
import { ReimbursementContainer } from './Components/Reimbursements/ReimbursementContainer';
import { Employee } from './Components/Employee/Employee'
import { Navbar } from './Components/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path ="" element={<Login/>}/>
          <Route path ="/employees" element={<Employee/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/reimbursements" element={<ReimbursementContainer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
