package com.employeeProduct.employee;

import java.util.List;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {
    
    private final EmployeeService es;
    private final JavaMailSender mailSender;

    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody Employee employee) {
        return es.postEmployee(employee);
    }

    @GetMapping("/employees") 
    public List<Employee> getAllEmployee(){
        return es.getAllEmployee();
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String id){
        try{
            es.deleteEmployee(id);
            return new ResponseEntity<>("Employee with ID " + id + " deleted successfully", HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>("Employee with ID " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable String id){
        Employee employee = es.getEmployeeById(id);
        if(employee == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(employee);
    }

    @PatchMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable String id, @RequestBody Employee employee) {
        Employee updatedEmployee = es.updateEmployee(id, employee);
        if(updatedEmployee == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedEmployee);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployeeStatus(@PathVariable String id, @RequestBody EmployeeStatusUpdate statusUpdate) {
        try {
            Employee existingEmployee = es.getEmployeeById(id);
            if (existingEmployee == null) {
                return new ResponseEntity<>("Employee with ID " + id + " not found", HttpStatus.NOT_FOUND);
            }
            existingEmployee.setStatus(statusUpdate.getStatus());
            Employee updatedEmployee = es.updateEmployee(id, existingEmployee);
            if (updatedEmployee == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            return ResponseEntity.ok(updatedEmployee);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/employee/{id}/send-email")
    public ResponseEntity<?> sendEmail(@PathVariable String id, @RequestBody EmailRequest emailRequest) {
        try {
            Employee employee = es.getEmployeeById(id);
            if (employee == null) {
                return new ResponseEntity<>("Employee with ID " + id + " not found", HttpStatus.NOT_FOUND);
            }
            
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(emailRequest.getEmail());
            helper.setSubject("Thank You for Your Appointment");
            helper.setFrom("your-email@gmail.com"); 
            
           
            String htmlContent = "<html>" +
                   "<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>" +
                "<h2 style='color: #333;'>Thank You, " + employee.getName() + "!</h2>" +
                "<p style='color: #555; line-height: 1.6;'>We appreciate your appointment with us. Your appointment status has been updated to: <strong>" + employee.getStatus() + "</strong>.</p>" +
                  "<p style='color: #555; line-height: 1.6;'>Your Patient Id is: <strong>" + employee.getId() + "</strong>.</p>"+
                "<p style='color: #555; line-height: 1.6;'>Please join between 2:00 pm - 5:00 pm (IST) from the link below.</p>" +
                "<a href='https://chat.gise.at/#Doctor' style='display: inline-block; padding: 12px 24px; background-color: #FF0000; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;'>Click to join</a>" +
                "<p style='color: #555; line-height: 1.6; margin-top: 20px;'>Best regards,<br>Doctor Admin</p>" +
                "</body>" +
                "</html>";
                
                
            helper.setText(htmlContent, true);
            mailSender.send(message);

            return new ResponseEntity<>("Email sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error sending email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


class EmailRequest {
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}


class EmployeeStatusUpdate {
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}