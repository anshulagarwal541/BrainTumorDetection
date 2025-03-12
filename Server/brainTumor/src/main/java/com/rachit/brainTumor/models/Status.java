package com.rachit.brainTumor.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Entity
@Scope("prototype")
@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    @Enumerated(EnumType.STRING)
    private CurrentStatus status = CurrentStatus.Active;
    @OneToOne
    @JoinColumn(name = "user_info", nullable = false)
    private UserInfo userInfo;
    public enum CurrentStatus {
        Active, Inactive
    }
}
