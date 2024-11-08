package com.revature.daos;

import com.revature.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthDAO extends JpaRepository<Employee, Integer> {
    //verify a user login credentials are correct
    Employee findByUsernameAndPassword(String username, String password);
}
