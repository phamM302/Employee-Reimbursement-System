package com.revature.controllers;

import com.revature.models.dtos.LoginDTO;
import com.revature.models.dtos.OutgoingEmployeeDTO;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public static HttpSession session;

    @PostMapping
    public ResponseEntity<OutgoingEmployeeDTO> login(@RequestBody LoginDTO lDTO, HttpSession session) {
        //send loginDTO to service getting us the OutUser
        OutgoingEmployeeDTO eDTO = authService.login(lDTO, session);
        return ResponseEntity.ok(eDTO);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e){
        //Return a 400 (BAD REQUEST) status code with the exception message
        return ResponseEntity.status(400).body(e.getMessage());
    }

}
