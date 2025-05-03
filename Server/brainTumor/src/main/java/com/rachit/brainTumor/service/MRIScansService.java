package com.rachit.brainTumor.service;

import com.rachit.brainTumor.models.MRIScans;
import com.rachit.brainTumor.models.UserInfo;
import com.rachit.brainTumor.repository.MRIScansRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MRIScansService {
    @Autowired
    private MRIScansRepo mriRepo;

    public List<MRIScans> findAllMRIByUserInfo(UserInfo userInfo)
    {
        return mriRepo.findAllByUserInfo(userInfo);
    }

    public void clearDatabse() {
        mriRepo.deleteAll();
    }
}
