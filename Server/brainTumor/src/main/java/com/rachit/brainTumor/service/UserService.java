package com.rachit.brainTumor.service;

import com.rachit.brainTumor.models.User;
import com.rachit.brainTumor.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User getUserByEmail(String email) {
        User user = userRepo.findByEmail(email);
        return user;
    }

    public void addUser(User user) {
        User currentUser = userRepo.findByEmail(user.getEmail());
        if (currentUser == null) {
            userRepo.save(user);
        }
    }

    public User getUserById(int userId) {
        User user = userRepo.findById(userId).orElse(new User());
        return user;
    }

    public User getUserByRole(String role) {
        List<User> allAdmins = userRepo.findAllByRoles(role);
        if(allAdmins.size()>0)
        {
            return allAdmins.get(0);
        }
        return new User();
    }

    public void updateUser(User user) {
        userRepo.save(user);
    }

    public void updateUserByPassword(User user) {
        userRepo.save(user);
    }
}
