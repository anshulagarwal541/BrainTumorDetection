package com.rachit.brainTumor.repository;

import com.rachit.brainTumor.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepo extends JpaRepository<Status, Integer> {

    List<Status> findAllByStatus(Status.CurrentStatus status);
}
