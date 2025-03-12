package com.rachit.brainTumor.controller;

import com.rachit.brainTumor.Cloudinary.ImageService;
import com.rachit.brainTumor.jwt.JWTService;
import com.rachit.brainTumor.models.*;
import com.rachit.brainTumor.service.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/admin")
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

    public static void sortMessagesByDateTime(List<Message> messages) {
        messages.sort((m1, m2) -> {
            LocalDateTime dateTime1 = m1.getDateTime();
            LocalDateTime dateTime2 = m2.getDateTime();
            return dateTime1.compareTo(dateTime2);
        });
    }

    // Get Mapping
    @GetMapping({"", "/"})
    public ResponseEntity<?> getUser(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain){
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
        List<Status> allPatients = statusService.getAllStatusByStatus("Active");
        return new ResponseEntity<>(allPatients, HttpStatus.OK);
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
    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody UserInfo userInfo)
    {
        if(userInfo.getUser().getEmail() == "" || userInfo.getUser().getPassword() == "")
        {
            return new ResponseEntity<>(new Error("Please enter email and password.!!"), HttpStatus.NOT_ACCEPTABLE);
        }
        User alreadyUser = userService.getUserByEmail(userInfo.getUser().getEmail());
        if(alreadyUser != null)
        {
            return new ResponseEntity<>(new Error("User already registered. !!"), HttpStatus.NOT_ACCEPTABLE);
        }
        if(String.valueOf(userInfo.getPhone()).length() != 10)
        {
            return new ResponseEntity<>(new Error("Please enter 10 digit phone number.!!"), HttpStatus.NOT_ACCEPTABLE);
        }
        userInfo.getUser().setPassword(encoder.encode(userInfo.getUser().getPassword()));
        userService.addUser(userInfo.getUser());
        User nowRegisteredUser = userService.getUserByEmail(userInfo.getUser().getEmail());
        userInfo.setUser(nowRegisteredUser);
        userInfoService.addUserInfo(userInfo);
        Status status = new Status();
        status.setUserInfo(userInfo);
        statusService.addPatientStatus(status);
        return new ResponseEntity<>("Successfully registered user.", HttpStatus.OK);
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

    // Put Mapping

    // Delete Mapping

}
