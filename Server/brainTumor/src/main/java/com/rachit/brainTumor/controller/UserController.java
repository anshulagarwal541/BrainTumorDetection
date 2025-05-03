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
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

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
                UserInfo userInfo = userInfoService.findByUser(user);
                if(userInfo != null)
                {
                    Patient patient = patientService.getPatientByUserInfo(userInfo);
                    if(patient != null)
                    {
                        return new ResponseEntity<>(patient, HttpStatus.OK);
                    }
                }
            }
        }
        return new ResponseEntity<>(new Error("No user with given email found."), HttpStatus.NOT_FOUND);
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

    @GetMapping("/getDoctor")
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
                UserInfo userInfo = userInfoService.findByUser(user);
                if(userInfo != null)
                {
                    Patient patient = patientService.getPatientByUserInfo(userInfo);
                    if(patient != null)
                    {
                        return new ResponseEntity<>(patient.getDoctor(), HttpStatus.OK);
                    }
                }
            }
        }
        return new ResponseEntity<>(new Error("No user with given email found."), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{userId}/scans")
    public ResponseEntity<?> getAllScans(@PathVariable("userId") int userId)
    {
        User user = userService.getUserById(userId);
        if(user.getEmail() == "")
        {
            return new ResponseEntity<>(new Error("Invalid Patient"), HttpStatus.NOT_FOUND);
        }
        UserInfo userInfo = userInfoService.findByUser(user);
        if(userInfo.getAge() == 0)
        {
            return new ResponseEntity<>(new Error("Invalid Patient"), HttpStatus.NOT_FOUND);
        }
        List<MRIScans> allMRIScans = mriService.findAllMRIByUserInfo(userInfo);
        return new ResponseEntity<>(allMRIScans, HttpStatus.OK);
    }

    @GetMapping("/{userId}/getDetails")
    public ResponseEntity<?> getDetails(@PathVariable("userId") int userId)
    {
        User user = userService.getUserById(userId);
        if(user.getEmail() == "")
        {
            return new ResponseEntity<>(new Error("User not found"), HttpStatus.NOT_FOUND);
        }
        UserInfo userInfo = userInfoService.findByUser(user);
        if(userInfo.getAge() == 0)
        {
            return new ResponseEntity<>(new Error("User Details not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    // Post Mapping

    @PostMapping("/{userId}/message")
    public ResponseEntity<?> SendMessage(@RequestBody Message message, @PathVariable("userId") int userId)
    {
        if(message == null || message.getMessage() == "")
        {
            return new ResponseEntity<>(new Error("Please enter a message"), HttpStatus.NOT_ACCEPTABLE);
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

    @PostMapping("/{userId}/upload")
    public ResponseEntity<?> upload(ImageModel imageModel, @PathVariable("userId") int userId) {
        try {
            User user = userService.getUserById(userId);
            if(user == null || user.getEmail() == "")
            {
                return new ResponseEntity<>(new Error("User not found"), HttpStatus.NOT_ACCEPTABLE);
            }
            UserInfo userInfo = userInfoService.findByUser(user);
            if(userInfo.getAge() == 0)
            {
                return new ResponseEntity<>(new Error("Invalid patient."), HttpStatus.NOT_FOUND);
            }
            imageService.uploadImage(imageModel, userInfo);
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/updateDetails")
    public ResponseEntity<?> updateDetails(@RequestBody UserInfo userInfo)
    {
        if(userInfo.getAge() <= 0)
        {
            return new ResponseEntity<>(new Error("Age must be greater than 0"), HttpStatus.NOT_ACCEPTABLE);
        }
        if(userInfo.getName() == "")
        {
            return new ResponseEntity<>(new Error("Name must not be blanked"), HttpStatus.NOT_ACCEPTABLE);
        }
        if(String.valueOf(userInfo.getPhone()).length() != 10)
        {
            return new ResponseEntity<>(new Error("Phone number should be 10"), HttpStatus.NOT_ACCEPTABLE);
        }
        userInfoService.addUserInfo(userInfo);
        UserInfo updatedUserInfo = userInfoService.getUserInfoById(userInfo.getId());
        return new ResponseEntity<>(updatedUserInfo, HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody Patient patient)
    {
        User  user = patient.getUserInfo().getUser();
        user.setPassword(encoder.encode(user.getPassword()));
        userService.updateUserByPassword(user);
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }


    // Put Mapping

    // Delete Mapping
}
