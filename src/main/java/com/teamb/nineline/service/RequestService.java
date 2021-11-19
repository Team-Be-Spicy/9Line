package com.teamb.nineline.service;

import com.teamb.nineline.model.Request;
import com.teamb.nineline.repository.RequestRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RequestService {
    private RequestRepository requestRepository;

    public Request createRequest(Request body){
        return requestRepository.save(body);
    }
    public Iterable<Request> listRequests(){return this.requestRepository.findAll();}
    public Request getRequest(Long id) throws Exception{
        Optional<Request> optionalRequest = requestRepository.findById(id);
        try{return optionalRequest.get();}
        catch(Exception e){
            throw new Exception(e);
        }

    }








}
