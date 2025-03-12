package com.rachit.brainTumor.service;

import com.rachit.brainTumor.models.Status;
import com.rachit.brainTumor.repository.StatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {
    @Autowired
    private StatusRepo statusRepo;

    public void addPatientStatus(Status status) {
        statusRepo.save(status);
    }

    public List<Status> getAllStatusByStatus(String givenStatus){
        Status.CurrentStatus statusEnum = Status.CurrentStatus.valueOf(givenStatus);
        return statusRepo.findAllByStatus(statusEnum);
    }

    public List<Status> getAllStatus(){
        return statusRepo.findAll();
    }

    public Status getStatusById(int statusId) {
        return statusRepo.findById(statusId).orElse(new Status());
    }
}
