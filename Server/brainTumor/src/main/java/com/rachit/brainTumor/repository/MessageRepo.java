package com.rachit.brainTumor.repository;

import com.rachit.brainTumor.models.Message;
import com.rachit.brainTumor.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Integer> {
    List<Message> findAllBySender(User user);
    List<Message> findAllByReciever(User user);
}
