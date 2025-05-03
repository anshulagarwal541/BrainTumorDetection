package com.rachit.brainTumor.service;

import com.rachit.brainTumor.models.Doctor;
import com.rachit.brainTumor.models.UserInfo;
import com.rachit.brainTumor.repository.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepo doctorRepo;

    public void addDoctorByUserInfo(UserInfo userInfo) {
        Doctor newDoctor = new Doctor();
        newDoctor.setUserInfo(userInfo);
        doctorRepo.save(newDoctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    public void clearDatabase() {
        doctorRepo.deleteAll();
    }

    public Doctor findByUserInfo(UserInfo doctorUserInfo) {
        return doctorRepo.findByUserInfo(doctorUserInfo);
    }

    public void replaceDoctor(Doctor doctor) {
        doctorRepo.save(doctor);
    }

    public Doctor findById(int doctorId) {
        return doctorRepo.findById(doctorId).orElse(new Doctor());
    }
}
