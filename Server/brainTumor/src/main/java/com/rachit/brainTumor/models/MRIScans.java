package com.rachit.brainTumor.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
@Scope("prototype")
@Table(name = "\"mri_scans\"")
public class MRIScans {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_info", nullable = false)
    private UserInfo userInfo;
    private String name;
    private String url;

}
