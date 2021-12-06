package com.teamb.nineline.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Date;

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

    @NotBlank
    private String location;

    @NotBlank
    private String callSign;

    @Min(value = 1)
    private int totalPatient;

    @NotBlank
    private String precedence;

    @NotBlank
    private String equipment;

    @Min(value = 0)
    private int litter;

    @Min(value = 0)
    private int ambulatory;

    @NotBlank
    private String marking;

    @NotBlank
    private String security;

    @NotBlank
    private String national;

    @NotBlank
    private String line9;

    @NotBlank
    private String status;

    @NotBlank
    @Temporal(TemporalType.DATE)
    private Date date;

}
