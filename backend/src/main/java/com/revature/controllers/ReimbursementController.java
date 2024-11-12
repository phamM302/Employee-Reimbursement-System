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
@CrossOrigin
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

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable String status){

        //Another one liner
        return ResponseEntity.ok(reimbursementService.getReimbursementByStatus(status));

    }

    @GetMapping("/employees/{userId}/status/{status}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserIdAndStatus(
            @PathVariable int userId, @PathVariable String status) {
        return ResponseEntity.ok(reimbursementService.getReimbursementByUserIdAndStatus(userId, status));
    }


    @PatchMapping("/status/{id}")
    public ResponseEntity<Reimbursement> updateReimbursementStatus(@PathVariable int id, @RequestBody String status) {
        return ResponseEntity.ok(reimbursementService.updateReimbursementStatus(id, status));
    }

    @PatchMapping("/description/{id}")
    public ResponseEntity<Reimbursement> updateReimbursementDescription(@PathVariable int id, @RequestBody String description) {
        return ResponseEntity.ok(reimbursementService.updateReimbursementDescription(id, description));
    }

    //Exception Handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        //returns a 400 BAD REQUEST status code with the message from the exception that got caught
        return ResponseEntity.status(400).body(e.getMessage());
    }

}
