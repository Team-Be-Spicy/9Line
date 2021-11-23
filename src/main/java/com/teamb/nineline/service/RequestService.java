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

    private RequestRepository requestRepository;

    public Request createRequest(Request body){
        return requestRepository.save(body);
    }

    public Iterable<Request> listRequests(){return this.requestRepository.findAll();}

    public Request getRequest(Long id) throws RequestExistsException {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RequestExistsException(REQUEST_NOT_FOUND));
        return request;
    }

    public Request updateStatus(Long id) throws RequestExistsException {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RequestExistsException(REQUEST_NOT_FOUND));
        request.setStatus("Complete");
        return requestRepository.save(request);
    }
}
