package com.revature.daos;

import com.revature.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDAO extends JpaRepository<Employee, Integer> {
    //property expression to find employee by username
    Employee findByUsername(String username);
}
