package com.employeeProduct.employee;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import lombok.Data;

@Document(collection = "employees")
@Data
public class Employee {
    @Id
    private String id;

    private String name;
    private String email;
    private String age; 
    private String gender;
    private String phone;
    private String department;
    private LocalDateTime date;
    private String status;
}