package com.teamb.nineline.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String responder;
    private String location;
    private String callSign;
    private int totalPatient;
    private String precedence;
    private String equipment;
    private int litter;
    private int ambulatory;
    private String  marking;
    private String security;
    private String national;
    private String line9;
    private String status;

}
