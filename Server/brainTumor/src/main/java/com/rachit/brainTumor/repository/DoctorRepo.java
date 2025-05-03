package com.rachit.brainTumor.repository;

import com.rachit.brainTumor.models.Doctor;
import com.rachit.brainTumor.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepo extends JpaRepository<Doctor, Integer> {

    Doctor findByUserInfo(UserInfo doctorUserInfo);
}
