package com.rachit.brainTumor.repository;

import com.rachit.brainTumor.models.MRIScans;
import com.rachit.brainTumor.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MRIScansRepo extends JpaRepository<MRIScans, Integer> {
    List<MRIScans> findAllByUserInfo(UserInfo userInfo);
}
