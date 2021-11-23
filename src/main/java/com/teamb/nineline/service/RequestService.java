package com.teamb.nineline.service;

import com.teamb.nineline.exception.RequestExistsException;
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

    public Request getRequest(Long id) throws RequestExistsException {
        return requestRepository.findById(id).orElseThrow(() -> new RequestExistsException("Request not found"));
    }

    public Request updateRequestResponder(Long id, Request responder) throws RequestExistsException{
        Request request = requestRepository.findById(id).orElseThrow(() -> new RequestExistsException("Request not found"));
        request.setResponder(responder.getResponder());
        return requestRepository.save(request);
    }
}
