package com.revature.services;

import com.revature.daos.EmployeeDAO;
import com.revature.models.Employee;
import com.revature.models.dtos.OutgoingEmployeeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private EmployeeDAO employeeDAO;

    @Autowired
    public EmployeeService(EmployeeDAO employeeDAO) {
        this.employeeDAO = employeeDAO;
    }

    public Employee registerEmployee(Employee newEmployee) {
        if (newEmployee.getUsername() == null || newEmployee.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        return employeeDAO.save(newEmployee);
    }

    public List<OutgoingEmployeeDTO> getAllEmployee(){
        //findAll() is a JPA method that returns all records in a table
        List<Employee> employees = employeeDAO.findAll();
        //Not much error handling in a get all... maybe checking to see if it's empty?

        List<OutgoingEmployeeDTO> outEmployees = new ArrayList<OutgoingEmployeeDTO>();
        for (Employee employee : employees) {
            outEmployees.add(
                    new OutgoingEmployeeDTO(employee.getUserId(),employee.getUsername(), employee.getRole())
            );
        }
        return outEmployees;
    }

    public Employee getEmployeeByUsername(String username){

        //a little error handling
        if(username == null || username.isBlank()){
            throw new IllegalArgumentException("Please search for a valid username!");
        }

        //TODO: we could check if the returned user is null and throw an exception
        //if(userDAO.findByUsername(username) == null){throw Exp}

        //findByUsername is a method WE DEFINED in the UserDAO (but didn't have to implement!)
        return employeeDAO.findByUsername(username);
    }

    public Employee updateEmployeeRole(int userId, String newRole) {
        Employee e = employeeDAO.findById(userId).orElseThrow(() ->
                new IllegalArgumentException("No user found with id: " + userId));

        e.setRole(newRole);
        employeeDAO.save(e);
        return e;
    }

    //This method deletes a User from the DB
    public Employee deleteEmployeeById(int userId){

        //TODO: error handling - make sure the user id is > 0

        //Find the user ID - if it exists, delete it, otherwise IllegalArgException
        //Remember, this Exception will be handled in the Controller
        Employee employeeToDelete = employeeDAO.findById(userId).orElseThrow(() ->
                new IllegalArgumentException("No user found with id: " + userId));

        employeeDAO.deleteById(userId); //Inherited from JpaRepository

        return employeeToDelete;

    }
}
