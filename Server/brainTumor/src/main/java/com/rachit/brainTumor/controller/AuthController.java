package com.rachit.brainTumor.controller;

import com.rachit.brainTumor.CustomErrors.Error;
import com.rachit.brainTumor.jwt.JWTService;
import com.rachit.brainTumor.models.Status;
import com.rachit.brainTumor.models.User;
import com.rachit.brainTumor.models.UserInfo;
import com.rachit.brainTumor.service.MessageService;
import com.rachit.brainTumor.service.StatusService;
import com.rachit.brainTumor.service.UserInfoService;
import com.rachit.brainTumor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jwtService;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private StatusService statusService;


    // Get mappings
    @GetMapping({"", "/"})
    public ResponseEntity<?> global(){
        return new ResponseEntity<>("Backend working successfully..!!", HttpStatus.OK);
    }

    // Post mappings
    @PostMapping("/login/admin")
    public ResponseEntity<?> loginAdmin(@RequestBody User user)
    {
        if(user.getPassword().isEmpty() || user.getEmail().isEmpty())
        {
            return new ResponseEntity<>(new Error("Please enter email or password"), HttpStatus.FORBIDDEN);
        }
        User adminUser = userService.getUserByEmail(user.getEmail());
        if (adminUser == null || !adminUser.getRoles().contains("ADMIN")) {
            return new ResponseEntity<>("Admin not found in database", HttpStatus.NOT_FOUND);
        }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            return new ResponseEntity<>(jwtService.generateToken(user.getEmail()), HttpStatus.OK);
        }
        return new ResponseEntity<>("Failure", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/login/user")
    public ResponseEntity<?> loginUser(@RequestBody User user)
    {
        if(user.getPassword() == "" || user.getEmail() == "")
        {
            return new ResponseEntity<>(new Error("Please enter email or password"), HttpStatus.FORBIDDEN);
        }
        User registeredUser = userService.getUserByEmail(user.getEmail());
        if(registeredUser==null)
        {
            return new ResponseEntity<>(new Error("User not found in database"), HttpStatus.NOT_FOUND);
        }
        if(registeredUser!=null && registeredUser.getRoles().contains("USER"))
        {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if(authentication.isAuthenticated())
            {
                return new ResponseEntity<>(jwtService.generateToken(user.getEmail()), HttpStatus.OK);
            }
            return new ResponseEntity<>(new Error("Error Occured. Please try again..!!"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new Error("User not found"), HttpStatus.NOT_FOUND);
    }

    @PostMapping("/register/user")
    public ResponseEntity<?> registerUser(@RequestBody UserInfo userInfo)
    {
        User user = userInfo.getUser();
        if(user.getPassword().isEmpty() || user.getEmail().isEmpty())
        {
            return new ResponseEntity<>(new Error("Please enter email or password"), HttpStatus.FORBIDDEN);
        }
        if(userInfo.getName().isEmpty() || userInfo.getAge()==0)
        {
            return new ResponseEntity<>(new Error("Please enter name or age"), HttpStatus.FORBIDDEN);
        }
        if(String.valueOf(userInfo.getPhone()).length() != 10)
        {
            return new ResponseEntity<>(new Error("Please enter phone number of 10 digits"), HttpStatus.FORBIDDEN);
        }
        User isUserRegistered = userService.getUserByEmail(user.getEmail());
        if(isUserRegistered != null)
        {
            return new ResponseEntity<>(new Error("User has already registered"), HttpStatus.NOT_ACCEPTABLE);
        }
        String password = user.getPassword();
        user.setPassword(encoder.encode(user.getPassword()));
        userService.addUser(user);
        User addedUser = userService.getUserByEmail(userInfo.getUser().getEmail());
        userInfo.setUser(addedUser);
        userInfoService.addUserInfo(userInfo);
        Status status = new Status();
        status.setUserInfo(userInfo);
        statusService.addPatientStatus(status);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(addedUser.getEmail(), password));
        if(authentication.isAuthenticated())
        {
            return new ResponseEntity<>(jwtService.generateToken(addedUser.getEmail()), HttpStatus.OK);
        }
        return new ResponseEntity<>("Wrong email or password", HttpStatus.FORBIDDEN);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerAmin(@RequestBody User admin)
    {
        if(admin.getEmail()=="" || admin.getPassword()=="")
        {
            return new ResponseEntity<>(new Error("Invalid user entered"), HttpStatus.BAD_REQUEST);
        }
        admin.setPassword(encoder.encode(admin.getPassword()));
        userService.addUser(admin);
        return new ResponseEntity<>("Successfully added the admin", HttpStatus.OK);
    }
    // Patch mappings

    // Delete mappings

}
