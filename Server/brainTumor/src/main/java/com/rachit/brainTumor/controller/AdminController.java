package com.rachit.brainTumor.controller;

import com.rachit.brainTumor.Cloudinary.ImageService;
import com.rachit.brainTumor.jwt.JWTService;
import com.rachit.brainTumor.models.*;
import com.rachit.brainTumor.service.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private JWTService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserInfoService userInfoService;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    private StatusService statusService;
    @Autowired
    private MessageService messageService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private MRIScansService mriService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private PatientService patientService;

    // Get Mapping
    @GetMapping({"", "/"})
    public ResponseEntity<?> getAdmin(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain){
        String  authHeader = request.getHeader("Authorization");
        String token = null;
        String email = null;
        if(authHeader!=null && authHeader.startsWith("Bearer "))
        {
            token=authHeader.substring(7);
            email=jwtService.extractUsername(token);
        }
        if (email != null) {
            User user = userService.getUserByEmail(email);
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new Error("No user with given email found."), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/allPatients")
    public ResponseEntity<?> getAllActivePatients(){
        List<Patient> allPatients = patientService.getAllPatients();
        return new ResponseEntity<>(allPatients, HttpStatus.OK);
    }

    @GetMapping("/allDoctors")
    public ResponseEntity<?> getAllDoctors(){
        List<Doctor> allDoctors = doctorService.getAllDoctors();
        return new ResponseEntity<>(allDoctors, HttpStatus.OK);
    }

    @GetMapping("/{doctorId}/assign/patient/{patientId}")
    public ResponseEntity<?> assignDoctor(@PathVariable("doctorId") int doctorId, @PathVariable("patientId") int patientId)
    {
        Doctor doctor = doctorService.findById(doctorId);
        System.out.println("********");
        System.out.println(1);
        System.out.println("********");
        Patient patient = patientService.getPatientById(patientId);
        System.out.println("********");
        System.out.println(2);
        System.out.println("********");
        if(doctor == null)
        {
            return new ResponseEntity<>(new Error("Doctor not found in database"), HttpStatus.NOT_FOUND);
        }
        System.out.println("********");
        System.out.println(3);
        System.out.println("********");
        if(patient == null)
        {
            return new ResponseEntity<>(new Error("Patient not found in database"), HttpStatus.NOT_FOUND);
        }
        System.out.println("********");
        System.out.println(4);
        System.out.println("********");
        patient.setDoctor(doctor.getUserInfo());
        System.out.println("********");
        System.out.println(5);
        System.out.println("********");
        if(!doctor.getPatients().contains(patient.getUserInfo()))
        {
            doctor.getPatients().add(patient.getUserInfo());
        }
        System.out.println("********");
        System.out.println(6);
        System.out.println("********");
        patientService.replacePatient(patient);
        System.out.println("********");
        System.out.println(7);
        System.out.println("********");
        doctorService.replaceDoctor(doctor);
        System.out.println("********");
        System.out.println(8);
        System.out.println("********");
        return new ResponseEntity<>("Successfully assigned the doctor", HttpStatus.OK);
    }

    // Post Mapping
    @PostMapping("/addDoctor")
    public ResponseEntity<?> addDoctor(@RequestBody UserInfo userInfo)
    {
        if(userInfo.getUser().getEmail() == ""  || userInfo.getUser().getPassword() == "")
        {
            return new ResponseEntity<>(new Error("Email  and password shouldn't be left blank"),  HttpStatus.NOT_ACCEPTABLE);
        }
        if(userInfo.getName() == "" || String.valueOf(userInfo.getPhone()).length() != 10)
        {
            return new ResponseEntity<>(new  Error("Name shouldn't be blank & phone should be of 10 digits"), HttpStatus.NOT_ACCEPTABLE);
        }
        if(userInfo.getAge() <= 0)
        {
            return new ResponseEntity<>(new Error("Age should be more than 0"), HttpStatus.NOT_ACCEPTABLE);
        }
        userInfo.getUser().setPassword(encoder.encode(userInfo.getUser().getPassword()));
        userService.addUser(userInfo.getUser());
        User doctorUser = userService.getUserByEmail(userInfo.getUser().getEmail());
        userInfo.setUser(doctorUser);
        userInfoService.addUserInfo(userInfo);
        UserInfo doctorUserInfo = userInfoService.findByUser(doctorUser);
        doctorService.addDoctorByUserInfo(doctorUserInfo);
        return new ResponseEntity<>("Successfully added the doctor", HttpStatus.OK);
    }

}
