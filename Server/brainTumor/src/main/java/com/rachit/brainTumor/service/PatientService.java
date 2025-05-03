package com.rachit.brainTumor.service;

import com.rachit.brainTumor.models.Patient;
import com.rachit.brainTumor.models.UserInfo;
import com.rachit.brainTumor.repository.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepo patientRepo;

    public void addPatientByUserInfo(UserInfo userInfo) {
        Patient newPatient = new Patient();
        newPatient.setUserInfo(userInfo);
        patientRepo.save(newPatient);
    }

    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    public Patient getPatientById(int patientId) {
        return patientRepo.findById(patientId).orElse(new Patient());
    }

    public void clearDatabase() {
        patientRepo.deleteAll();
    }

    public Patient getPatientByUserInfo(UserInfo patientUserInfo) {
        return patientRepo.findByUserInfo(patientUserInfo);
    }

    public void replacePatient(Patient patient) {
        patientRepo.save(patient);
    }

    public List<Patient> findAllPatientsByDoctor(UserInfo doctorUserInfo) {
        return patientRepo.findAllByDoctor(doctorUserInfo);
    }
}
