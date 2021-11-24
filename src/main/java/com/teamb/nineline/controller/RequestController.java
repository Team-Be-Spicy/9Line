package com.teamb.nineline.controller;

import com.teamb.nineline.exception.RequestExistsException;
import com.teamb.nineline.model.Request;
import com.teamb.nineline.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/request")
@AllArgsConstructor
public class RequestController {

    private RequestService requestService;

    @PostMapping
    private ResponseEntity<Request> createNewRequest(@RequestBody Request body){
       return new ResponseEntity<>(requestService.createRequest(body), HttpStatus.CREATED);
    }

    @GetMapping
    private Iterable<Request> getRequestsByRole(@RequestHeader String authorization) {
        return requestService.getRequestsByRole(authorization);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Request> getRequestById(@PathVariable Long id) throws RequestExistsException {
        return new ResponseEntity<>(requestService.getRequest(id),HttpStatus.OK);
    }

    @PatchMapping("/responder/{id}")
    private ResponseEntity<Request> updateRequestResponder(@PathVariable Long id, @RequestBody Request responder) throws RequestExistsException {
        return new ResponseEntity<>(requestService.updateRequestResponder(id, responder),HttpStatus.OK);
    }

    @PatchMapping("/status/{id}")
    private ResponseEntity<Request> patchStatusRequestById(@PathVariable Long id) throws RequestExistsException {
        return new ResponseEntity<>(requestService.updateStatus(id),HttpStatus.OK);
    }
}
