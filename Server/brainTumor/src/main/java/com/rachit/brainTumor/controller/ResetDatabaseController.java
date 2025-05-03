package com.rachit.brainTumor.controller;

import com.rachit.brainTumor.models.Doctor;
import com.rachit.brainTumor.models.Patient;
import com.rachit.brainTumor.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ResetDatabaseController {

    @Autowired
    private MRIScansService mriScansService;
    @Autowired
    private MessageService messageService;
    @Autowired
    private StatusService statusService;
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private UserService userService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private PatientService patientService;

    @GetMapping("/clearDatabase")
    public ResponseEntity<?>  ClearDatabase()
    {
        try{
            userInfoService.clearDatabase();
            mriScansService.clearDatabse();
            statusService.clearDatabse();
            doctorService.clearDatabase();
            patientService.clearDatabase();
            messageService.clearDatabase();
            userService.clearDatabase();
        } catch(Exception e) {
            System.out.println("*****");
            System.out.println(e.getMessage());
            System.out.println("*****");
        }

        return new ResponseEntity<>("Successfully cleared database....", HttpStatus.OK);
    }

}
