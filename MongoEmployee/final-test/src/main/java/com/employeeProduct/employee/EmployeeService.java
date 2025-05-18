package com.employeeProduct.employee;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    
    private final EmployeeRepo er;

    // Save new employee with current date and time
    public Employee postEmployee(Employee employee){
        employee.setDate(LocalDateTime.now()); // Set current date & time
        return er.save(employee);
    }

    public List<Employee> getAllEmployee(){
        return er.findAll();
    }

    public void deleteEmployee(String id) {
        if(!er.existsById(id)) {
            throw new RuntimeException("Employee with ID " + id + " not found");
        }

        er.deleteById(id);
    }

    public Employee getEmployeeById(String id) {
        return er.findById(id).orElse(null);
    }

    // Update employee with current date and time
    public Employee updateEmployee(String id, Employee employee) {
        Optional<Employee> oe = er.findById(id);
        if(oe.isPresent()) {
            Employee ee = oe.get();
            ee.setEmail(employee.getEmail());
            ee.setName(employee.getName());
            ee.setPhone(employee.getPhone());
            ee.setDepartment(employee.getDepartment());
            ee.setDate(LocalDateTime.now()); 
            ee.setStatus(employee.getStatus());
            ee.setAge(employee.getAge());
            ee.setGender(employee.getGender());
            return er.save(ee);
        }
        return null;
    }
}