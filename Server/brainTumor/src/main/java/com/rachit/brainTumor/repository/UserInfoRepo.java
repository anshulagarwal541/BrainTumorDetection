package com.rachit.brainTumor.repository;

import com.rachit.brainTumor.models.User;
import com.rachit.brainTumor.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepo extends JpaRepository<UserInfo, Integer> {

    UserInfo findByUser(User user);
}
