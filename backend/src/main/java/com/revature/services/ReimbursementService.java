package com.revature.services;

import com.revature.daos.EmployeeDAO;
import com.revature.daos.ReimbursementDAO;
import com.revature.models.Employee;
import com.revature.models.Reimbursement;
import com.revature.models.dtos.IncomingReimbursementDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {
    private EmployeeDAO eDAO;
    private ReimbursementDAO rDAO;

    public ReimbursementService(ReimbursementDAO rDAO, EmployeeDAO eDAO) {
        this.rDAO = rDAO;
        this.eDAO = eDAO;
    }

    public Reimbursement addReimbursement(IncomingReimbursementDTO incomingReimbursementDTO) {
        Reimbursement newReimbursement = new Reimbursement(0, incomingReimbursementDTO.getStatus(),
                incomingReimbursementDTO.getDescription(), incomingReimbursementDTO.getAmount(),
                null);
        Optional<Employee> e = eDAO.findById(incomingReimbursementDTO.getUserId());
        if (e.isEmpty()) {
            throw new IllegalArgumentException("No employee found with id: " +
                    incomingReimbursementDTO.getUserId());
        } else {
            newReimbursement.setEmployee(e.get());
            return rDAO.save(newReimbursement);
        }
    }

    public List<Reimbursement> getAllReimbursements() {
        return rDAO.findAll();
    }

    public List<Reimbursement> getReimbursementByUserId(int userId){

        //TODO: error handling - incoming id, make sure user exists, make sure > 0 pets returned etc

        return rDAO.findByEmployeeUserId(userId);

    }

    public List<Reimbursement> getReimbursementByStatus(String status) {
        return rDAO.findByStatus(status);
    }

    public List<Reimbursement> getReimbursementByUserIdAndStatus(int id, String status) {
        return rDAO.findByEmployeeUserIdAndStatus(id, status);
    }

    public Reimbursement updateReimbursementStatus(int id, String status) {
        Reimbursement r = rDAO.findById(id).orElseThrow(() ->
            new IllegalArgumentException("No reimbursement found with id: " + id));
        r.setStatus(status);

        rDAO.save(r);
        return r;
    }

    public Reimbursement updateReimbursementDescription(int id, String description) {
        Reimbursement r = rDAO.findById(id).orElseThrow(() ->
            new IllegalArgumentException("No reimbursement found with id: " + id));
        r.setDescription(description);

        rDAO.save(r);
        return r;
    }
}
