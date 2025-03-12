package com.rachit.brainTumor.service;

import com.rachit.brainTumor.models.Message;
import com.rachit.brainTumor.models.User;
import com.rachit.brainTumor.repository.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepo messageRepo;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    public void AddMessage(Message message)
    {
        messageRepo.save(message);
    }

    public List<Message> getAllSenderMessage(User user) {
        List<Message> allMessages = messageRepo.findAllBySender(user);
        return allMessages;
    }

    public List<Message> getAllRecieverMessage(User user) {
        List<Message> allMessages = messageRepo.findAllByReciever(user);
        return allMessages;
    }
}
