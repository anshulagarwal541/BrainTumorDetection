package com.rachit.brainTumor.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Component
@Scope("prototype")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "\"messages\"")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String message;
    @ManyToOne
    @JoinColumn(name = "sender", nullable = false)
    private User sender;
    @ManyToOne
    @JoinColumn(name = "reciever", nullable = false)
    private User reciever;
    private LocalDateTime dateTime;

}
