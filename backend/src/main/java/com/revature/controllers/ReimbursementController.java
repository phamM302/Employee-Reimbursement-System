package com.revature.controllers;

import com.revature.models.Reimbursement;
import com.revature.models.dtos.IncomingReimbursementDTO;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
public class ReimbursementController {

    private ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }


    //insert new reimbursement
    @PostMapping
    public ResponseEntity<Reimbursement> registerReimbursement(@RequestBody IncomingReimbursementDTO incomingReimbursementDTO) {
        Reimbursement r = reimbursementService.addReimbursement(incomingReimbursementDTO);
        return ResponseEntity.status(201).body(r);
    }

    //get all reimbursements
    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        List<Reimbursement> allReimbursements = reimbursementService.getAllReimbursements();
        return ResponseEntity.ok(allReimbursements);
    }

    //A method that gets all Reimbursements by UserId
    @GetMapping("/employees/{userId}") //GET requests to /reimbursements/employees/{userId} will come here
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId){

        //Another one liner
        return ResponseEntity.ok(reimbursementService.getReimbursementByUserId(userId));

    }


    //Exception Handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        //returns a 400 BAD REQUEST status code with the message from the exception that got caught
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
