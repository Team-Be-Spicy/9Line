package com.teamb.nineline.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamb.nineline.model.Request;
import com.teamb.nineline.repository.RequestRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;
import static org.junit.jupiter.api.Assertions.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class RequestControllerTest {
    @Autowired
    MockMvc mvc;

    @Autowired
    RequestRepository requestRepository;

    @Autowired
    ObjectMapper objectMapper;


    @Test
    @Transactional
    @Rollback
    public void createNewRequest() throws Exception {
        Request request1 = new Request();
        request1.setLocation("38STM1234567890");
        request1.setResponder(null);
        request1.setCallSign("raptor1");
        request1.setTotalPatient(3);
        request1.setPrecedence("urgent");
        request1.setEquipment("hoist");
        request1.setAmbulatory(3);
        request1.setLitter(0);
        request1.setMarking("smoke");
        request1.setSecurity("clear");
        request1.setNational("US");
        request1.setLine9("no nbc");
        request1.setStatus(null);

        MockHttpServletRequestBuilder request = post("/api/request")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request1));

        mvc.perform(request)
                .andExpect(status().isCreated());

        assertEquals(requestRepository.count(), 1);
    }
}