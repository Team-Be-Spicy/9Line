package com.teamb.nineline.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamb.nineline.model.Request;
import com.teamb.nineline.repository.RequestRepository;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;
import static org.junit.jupiter.api.Assertions.*;

import static org.hamcrest.Matchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class RequestControllerTest {

    public static final String DISPATCHER = "dispatcher";
    public static final String RESPONDER = "responder";
    public static final String AUTHORIZATION = "Authorization";

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
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request1.setEquipment("hoist");
        request1.setAmbulatory(3);
        request1.setLitter(0);
        request1.setMarking("smoke");
        request1.setSecurity("clear");
        request1.setNational("US");
        request1.setLine9("no nbc");
        request1.setStatus("Pending");

        MockHttpServletRequestBuilder request = post("/api/request")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request1));

        mvc.perform(request)
                .andExpect(status().isCreated());

        assertEquals(requestRepository.count(), 1);
    }

    @Test
    @Transactional
    @Rollback
    @WithMockUser
    public void getRequestsByDispatcher() throws Exception {
        Request request1 = new Request();
        request1.setLocation("38STM1234567890");
        request1.setResponder(null);
        request1.setCallSign("raptor1");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request1.setEquipment("hoist");
        request1.setAmbulatory(3);
        request1.setLitter(0);
        request1.setMarking("smoke");
        request1.setSecurity("clear");
        request1.setNational("US");
        request1.setLine9("no nbc");
        request1.setStatus("Assigned");

        this.requestRepository.save(request1);

        Request request2 = new Request();
        request2.setLocation("22STL2345678901");
        request2.setResponder(null);
        request2.setCallSign("humvee7");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request2.setEquipment("hoist");
        request2.setAmbulatory(2);
        request2.setLitter(0);
        request2.setMarking("vs panel");
        request2.setSecurity("clear");
        request2.setNational("UK");
        request2.setLine9("no nbc");
        request2.setStatus("Pending");

        this.requestRepository.save(request2);

        Request request3 = new Request();
        request3.setLocation("22STL2345678901");
        request3.setResponder("Responder Two");
        request3.setCallSign("humvee7");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request3.setEquipment("hoist");
        request3.setAmbulatory(2);
        request3.setLitter(0);
        request3.setMarking("vs panel");
        request3.setSecurity("clear");
        request3.setNational("UK");
        request3.setLine9("no nbc");
        request3.setStatus("Complete");

        this.requestRepository.save(request3);

        MockHttpServletRequestBuilder request = get("/api/request/responder/dispatcher@nineline.com");

        String expected = objectMapper.writeValueAsString(Arrays.array(request1,request2,request3));

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json(expected));
    }

    @Test
    @Transactional
    @Rollback
    @WithMockUser
    public void getRequestsByResponder() throws Exception {
        Request request1 = new Request();
        request1.setLocation("38STM1234567890");
        request1.setResponder("responder1@nineline.com");
        request1.setCallSign("raptor1");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request1.setEquipment("hoist");
        request1.setAmbulatory(3);
        request1.setLitter(0);
        request1.setMarking("smoke");
        request1.setSecurity("clear");
        request1.setNational("US");
        request1.setLine9("no nbc");
        request1.setStatus("Pending");

        this.requestRepository.save(request1);

        Request request2 = new Request();
        request2.setLocation("22STL2345678901");
        request2.setResponder("responder1@nineline.com");
        request2.setCallSign("humvee7");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request2.setEquipment("hoist");
        request2.setAmbulatory(2);
        request2.setLitter(0);
        request2.setMarking("vs panel");
        request2.setSecurity("clear");
        request2.setNational("UK");
        request2.setLine9("no nbc");
        request2.setStatus("Pending");

        this.requestRepository.save(request2);

        Request request3 = new Request();
        request3.setLocation("22STL2345678901");
        request3.setResponder("responder2@nineline.com");
        request3.setCallSign("humvee7");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request3.setEquipment("hoist");
        request3.setAmbulatory(2);
        request3.setLitter(0);
        request3.setMarking("vs panel");
        request3.setSecurity("clear");
        request3.setNational("UK");
        request3.setLine9("no nbc");
        request3.setStatus("Pending");

        this.requestRepository.save(request3);

        MockHttpServletRequestBuilder request = get("/api/request/responder/responder1@nineline.com");

        String expected = objectMapper.writeValueAsString(Arrays.array(request1,request2));

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json(expected));
    }

    @Test
    @Transactional
    @Rollback
    @WithMockUser
    public void getRequestById() throws Exception {
        Request request1 = new Request();
        request1.setLocation("38STM1234567890");
        request1.setResponder(null);
        request1.setCallSign("raptor1");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request1.setEquipment("hoist");
        request1.setAmbulatory(3);
        request1.setLitter(0);
        request1.setMarking("smoke");
        request1.setSecurity("clear");
        request1.setNational("US");
        request1.setLine9("no nbc");
        request1.setStatus("Pending");

        this.requestRepository.save(request1);

        MockHttpServletRequestBuilder request = get("/api/request/" + request1.getId());

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.location", is("38STM1234567890")));
    }

    @Test
    @Transactional
    @Rollback
    @WithMockUser
    public void updateRequestStatusById() throws Exception {
        Request request1 = new Request();
        request1.setLocation("38STM1234567890");
        request1.setResponder(null);
        request1.setCallSign("raptor1");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request1.setEquipment("hoist");
        request1.setAmbulatory(3);
        request1.setLitter(0);
        request1.setMarking("smoke");
        request1.setSecurity("clear");
        request1.setNational("US");
        request1.setLine9("no nbc");
        request1.setStatus("Pending");

        Request savedRequest = this.requestRepository.save(request1);

        Request request2 = new Request();
        request2.setId(savedRequest.getId());
        request2.setLocation("38STM1234567890");
        request2.setResponder(null);
        request2.setCallSign("raptor1");
        request2.setUrgent(1);
        request2.setUrgentSurgical(2);
        request2.setPriority(3);
        request2.setRoutine(4);
        request2.setEquipment("hoist");
        request2.setAmbulatory(3);
        request2.setLitter(0);
        request2.setMarking("smoke");
        request2.setSecurity("clear");
        request2.setNational("US");
        request2.setLine9("no nbc");
        request2.setStatus("Complete");



        MockHttpServletRequestBuilder request = patch("/api/request/status/" + savedRequest.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request2));

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(request2)));
    }

    @Test
    @Transactional
    @Rollback
    @WithMockUser
    public void catchRequestExistsException() throws Exception{

        MockHttpServletRequestBuilder request = get("/api/request/" + 10);

        mvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    @Rollback
    @WithMockUser
    public void updateRequestResponder() throws Exception{
        Request request1 = new Request();
        request1.setLocation("38STM1234567890");
        request1.setResponder(null);
        request1.setCallSign("raptor1");
        request1.setUrgent(1);
        request1.setUrgentSurgical(2);
        request1.setPriority(3);
        request1.setRoutine(4);
        request1.setEquipment("hoist");
        request1.setAmbulatory(3);
        request1.setLitter(0);
        request1.setMarking("smoke");
        request1.setSecurity("clear");
        request1.setNational("US");
        request1.setLine9("no nbc");
        request1.setStatus("Pending");

        this.requestRepository.save(request1);

        MockHttpServletRequestBuilder request = patch("/api/request/responder/update/" + request1.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "\"responder\":\"Responder One\"\n" +
                        "}");

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.responder", is("Responder One")));

    }
}