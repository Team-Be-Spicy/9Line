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

    @Min(0)
    private int urgent;

    @Min(0)
    private int urgentSurgical;

    @Min(0)
    private int priority;

    @Min(0)
    private int routine;

    @NotBlank
    private String equipment;

    @Min(0)
    private int litter;

    @Min(0)
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

    @Temporal(TemporalType.DATE)
    private Date date;

}
