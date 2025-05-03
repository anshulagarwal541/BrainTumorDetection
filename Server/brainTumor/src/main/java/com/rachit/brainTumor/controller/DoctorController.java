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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/doctor")
public class DoctorController {

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

    public static void sortMessagesByDateTime(List<Message> messages) {
        messages.sort((m1, m2) -> {
            LocalDateTime dateTime1 = m1.getDateTime();
            LocalDateTime dateTime2 = m2.getDateTime();
            return dateTime1.compareTo(dateTime2);
        });
    }

    // Get Mapping
    @GetMapping({"", "/"})
    public ResponseEntity<?> getDoctor(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain){
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
                UserInfo userInfo = userInfoService.findByUser(user);
                if(userInfo != null)
                {
                    Doctor doctor = doctorService.findByUserInfo(userInfo);
                    return new ResponseEntity<>(doctor, HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<>(new Error("No user with given email found."), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{doctorUserInfoId}/allPatients")
    public ResponseEntity<?> getAllActivePatients(@PathVariable("doctorUserInfoId") int doctorUserInfoId){
        UserInfo doctorUserInfo = userInfoService.getUserInfoById(doctorUserInfoId);
        List<Patient> allPatients = patientService.findAllPatientsByDoctor(doctorUserInfo);
        List<Status> allPatientsStatus = new ArrayList<>();
        for(Patient patient : allPatients)
        {
            Status patientStatus = statusService.getStatusByUserInfo(patient.getUserInfo());
            allPatientsStatus.add(patientStatus);
        }
        return new ResponseEntity<>(allPatientsStatus, HttpStatus.OK);
    }

    @GetMapping("/getUser/{statusId}")
    public ResponseEntity<?> getUserByStatus(@PathVariable("statusId") int statusId)
    {
        Status currentUserStatus = statusService.getStatusById(statusId);
        if(currentUserStatus.getUserInfo().getUser().getEmail() == "")
        {
            return new ResponseEntity<>(new Error("Invalid Request"), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(currentUserStatus.getUserInfo(), HttpStatus.OK);
    }

    @GetMapping("/{userId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable("userId") int userId)
    {
        User user = userService.getUserById(userId);
        if(user.getEmail() == null)
        {
            return new ResponseEntity<>(new Error("Invalid Submit"), HttpStatus.NOT_ACCEPTABLE);
        }
        List<Message> allMessagesSender = messageService.getAllSenderMessage(user);
        List<Message> allMessageReciever = messageService.getAllRecieverMessage(user);
        allMessagesSender.addAll(allMessageReciever);
        sortMessagesByDateTime(allMessagesSender);
        return new ResponseEntity<>(allMessagesSender, HttpStatus.OK);
    }

    @GetMapping("/{userInfoId}/scans")
    public ResponseEntity<?> getAllScans(@PathVariable("userInfoId") int userInfoId)
    {
        UserInfo userInfo = userInfoService.getUserInfoById(userInfoId);
        if(userInfo.getAge() == 0)
        {
            return new ResponseEntity<>(new Error("Invalid Patient"), HttpStatus.NOT_FOUND);
        }
        List<MRIScans> allMRIScans = mriService.findAllMRIByUserInfo(userInfo);
        return new ResponseEntity<>(allMRIScans, HttpStatus.OK);
    }

    // Post Mapping
    @PostMapping("/{doctor_id}/addUser")
    public ResponseEntity<?> addPatient(@RequestBody UserInfo userInfo, @PathVariable("doctor_id") int doctor_id)
    {
            if(userInfo.getUser().getEmail() == ""  || userInfo.getUser().getPassword() == "")
            {
                return new ResponseEntity<>(new Error("Email shouldn't be left blank"),  HttpStatus.NOT_ACCEPTABLE);
            }
            if(userInfo.getName() == "" || String.valueOf(userInfo.getPhone()).length() != 10)
            {
                return new ResponseEntity<>(new  Error("Name shouldn't be blank & phone should be of 10 digits"), HttpStatus.NOT_ACCEPTABLE);
            }
            if(userInfo.getAge() <= 0)
            {
                return new ResponseEntity<>(new Error("Age should be more than 0"), HttpStatus.NOT_ACCEPTABLE);
            }
            Doctor doctor = doctorService.findById(doctor_id);
            userInfo.getUser().setPassword(encoder.encode(userInfo.getUser().getPassword()));
            userService.addUser(userInfo.getUser());
            User patientUser = userService.getUserByEmail(userInfo.getUser().getEmail());
            userInfo.setUser(patientUser);
            userInfoService.addUserInfo(userInfo);
            UserInfo patientUserInfo = userInfoService.findByUser(patientUser);
            patientService.addPatientByUserInfo(patientUserInfo);
            Patient patient = patientService.getPatientByUserInfo(patientUserInfo);
            if(!doctor.getPatients().contains(patientUserInfo))
            {
                doctor.getPatients().add(patientUserInfo);
                doctorService.replaceDoctor(doctor);
            }
            patient.setDoctor(doctor.getUserInfo());
            patientService.replacePatient(patient);
            Status patientStatus = new Status();
            patientStatus.setUserInfo(patientUserInfo);
            statusService.addPatientStatus(patientStatus);
            return new ResponseEntity<>("Successfully added the patient", HttpStatus.OK);
    }

    @PostMapping("/{userId}/message")
    public ResponseEntity<?> SendMessage(@RequestBody Message message, @PathVariable("userId") int userId)
    {
        if(message == null || message.getMessage() == "" || message.getDateTime() == null)
        {
            return new ResponseEntity<>(new Error("Please enter a message "), HttpStatus.NOT_ACCEPTABLE);
        }
        User user = userService.getUserById(userId);
        if(user == null || user.getEmail() == "")
        {
            return new ResponseEntity<>(new Error("Invalid Submit"), HttpStatus.NOT_ACCEPTABLE);
        }
        messageService.AddMessage(message);
       List<Message> allMessagesSender = messageService.getAllSenderMessage(user);
       List<Message> allMessageReciever = messageService.getAllRecieverMessage(user);
       allMessagesSender.addAll(allMessageReciever);
       sortMessagesByDateTime(allMessagesSender);
       return new ResponseEntity<>(allMessagesSender, HttpStatus.OK);
    }

    @PostMapping("/{userInfoId}/upload")
    public ResponseEntity<?> upload(ImageModel imageModel, @PathVariable("userInfoId") int userInfoId) {
        try {
            UserInfo userInfo = userInfoService.getUserInfoById(userInfoId);
            if(userInfo.getAge() == 0)
            {
                return new ResponseEntity<>(new Error("Invalid patient."), HttpStatus.NOT_FOUND);
            }
            imageService.uploadImage(imageModel, userInfo);
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/file/upload")
    public ResponseEntity<?> fileUpload(ImageModel imageModel) {
        try {
            System.out.println("**********");
            System.out.println(imageModel);
            System.out.println("**********");
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Put Mapping

    // Delete Mapping

}
