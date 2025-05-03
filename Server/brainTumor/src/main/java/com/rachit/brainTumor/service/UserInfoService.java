package com.rachit.brainTumor.service;

import com.rachit.brainTumor.models.User;
import com.rachit.brainTumor.models.UserInfo;
import com.rachit.brainTumor.repository.UserInfoRepo;
import com.rachit.brainTumor.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {
    @Autowired
    private UserInfoRepo userInfoRepo;

    public void addUserInfo(UserInfo userInfo)
    {
        userInfoRepo.save(userInfo);
    }

    public UserInfo getUserInfoById(int id)
    {
        return userInfoRepo.findById(id).orElse(new UserInfo());
    }

    public UserInfo findByUser(User user) {
        return userInfoRepo.findByUser(user);
    }

    public void updateUserInfo(UserInfo userInfo) {
        userInfoRepo.save(userInfo);
    }

    public void clearDatabase() {
        userInfoRepo.deleteAll();
    }
}
