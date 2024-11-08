package com.revature.services;

import com.revature.controllers.AuthController;
import com.revature.daos.AuthDAO;
import com.revature.models.Employee;
import com.revature.models.dtos.LoginDTO;
import com.revature.models.dtos.OutgoingEmployeeDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private AuthDAO aDAO;

    @Autowired
    public AuthService(AuthDAO aDAO) {
        this.aDAO = aDAO;
    }

    public OutgoingEmployeeDTO login(LoginDTO lDTO, HttpSession session) {
        Employee e = aDAO.findByUsernameAndPassword(lDTO.getUsername(), lDTO.getPassword());
        if (e == null) {
            throw new IllegalArgumentException("No user found with those credentials!");
        }

        AuthController.session = session;
        AuthController.session.setAttribute("userId", e.getUserId());
        AuthController.session.setAttribute("username", e.getUsername());
        AuthController.session.setAttribute("role", e.getRole());
        return new OutgoingEmployeeDTO(e.getUserId(), e.getUsername(), e.getRole());
    }
}
