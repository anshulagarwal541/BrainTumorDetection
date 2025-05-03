package com.rachit.brainTumor.repository;

import com.rachit.brainTumor.models.Patient;
import com.rachit.brainTumor.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Integer> {

    Patient findByUserInfo(UserInfo patientUserInfo);

    List<Patient> findAllByDoctor(UserInfo doctorUserInfo);
}
