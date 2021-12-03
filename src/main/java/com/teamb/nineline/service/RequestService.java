package com.teamb.nineline.service;

import com.teamb.nineline.exception.RequestExistsException;
import com.teamb.nineline.model.Request;
import com.teamb.nineline.repository.RequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RequestService {

    private static final String REQUEST_NOT_FOUND = "Request not found";
    public static final String COMPLETE = "Complete";
    public static final String DISPATCHER = "dispatcher@nineline.com";

    private RequestRepository requestRepository;

    public Request createRequest(Request body){
        return requestRepository.save(body);
    }

    public Iterable<Request> getRequestsByRole(String responderName){
        return this.requestRepository.findAllByResponder(responderName.equals(DISPATCHER) ? null : responderName);
    }

    public Iterable<Request> getAllRequests(){
        return this.requestRepository.findAll();
    }

    public Iterable<Request> getCompleteRequests(){
        return this.requestRepository.findAllByStatus(COMPLETE);
    }

    public Request getRequest(Long id) throws RequestExistsException {
        return requestRepository.findById(id).orElseThrow(() -> new RequestExistsException(REQUEST_NOT_FOUND));
    }
    public Request updateRequestResponder(Long id, Request responder) throws RequestExistsException{
        Request request = requestRepository.findById(id).orElseThrow(() -> new RequestExistsException(REQUEST_NOT_FOUND));
        request.setResponder(responder.getResponder());
        return requestRepository.save(request);
    }

    public Request updateStatus(Long id) throws RequestExistsException {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RequestExistsException(REQUEST_NOT_FOUND));
        request.setStatus(COMPLETE);
        return requestRepository.save(request);
    }
}
