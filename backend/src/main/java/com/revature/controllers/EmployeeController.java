package com.revature.controllers;

import com.revature.aspects.AdminOnly;
import com.revature.models.Employee;
import com.revature.models.dtos.OutgoingEmployeeDTO;
import com.revature.services.EmployeeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin
public class EmployeeController {
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<Employee> registerEmployee(@RequestBody Employee newEmployee) {
        Employee e = employeeService.registerEmployee(newEmployee);
        return ResponseEntity.ok(e);
    }

    @GetMapping
    public ResponseEntity<List<OutgoingEmployeeDTO>> getAllEmployees() {
        List<OutgoingEmployeeDTO> allEmployees = employeeService.getAllEmployee();
        return ResponseEntity.ok(allEmployees);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getEmployeeByUsername(@PathVariable String username) {
        if(employeeService.getEmployeeByUsername(username) == null) {
            return ResponseEntity.status(404).body("No user found with username: " + username);
        }

        return ResponseEntity.ok(employeeService.getEmployeeByUsername(username));
    }

    //A method that updates a Employee's role
    @AdminOnly //ONLY ADMINS CAN DO THIS (See the AuthAspect)
    @PatchMapping("/{userId}") //PATCH requests to /employees/{userId} will come here
    public ResponseEntity<Employee> updateEmployeeRole(@PathVariable int userId, @RequestBody String newRole){

        //send back a 202 (ACCEPTED) with the User returned from the Service as the Response Body
        return ResponseEntity.status(202).body(employeeService.updateEmployeeRole(userId, newRole));

    }

    //A method that deletes a Employee by id
    @AdminOnly //ONLY ADMINS CAN DO THIS (See the AuthAspect)
    @DeleteMapping("/{userId}") //DELETE requests to /employees/{userId} will come here
    public ResponseEntity<Employee> deleteEmployeeById(@PathVariable int userId){

        return ResponseEntity.ok(employeeService.deleteEmployeeById(userId));

    }



    //Exception Handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        //returns a 400 BAD REQUEST status code with the message from the exception that got caught
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
