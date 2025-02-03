package com.employeeProduct.employee;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    
    private final EmployeeRepo er;

    public Employee postEmployee(Employee employee){
        return er.save(employee);
    }

    public List<Employee> getAllEmployee(){
        return er.findAll();
    }

    public void deleteEmployee(Long id) {
        if(!er.existsById(id)) {
            throw new EntityNotFoundException("Employee with Id" + id + "NOT FOUND 😭");
        }

        er.deleteById(id);
    }

    public Employee getEmployeeById(Long id) {
        return er.findById(id).orElse(null);
    }

    public Employee updatEmployee(Long id, Employee employee) {
        Optional<Employee> oe = er.findById(id);
        if(oe.isPresent()) {
            Employee ee = oe.get();
            ee.setEmail(employee.getEmail());
            ee.setName(employee.getName());
            ee.setPhone(employee.getPhone());
            ee.setDepartment(employee.getDepartment());
            return er.save(ee);
        }
        return null;
    } 
}
