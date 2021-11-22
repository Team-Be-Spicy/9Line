package com.teamb.nineline.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandling {

    private final String REQUEST_NOT_FOUND = "Request not found.";

    @ExceptionHandler(RequestExistsException.class)
    public ResponseEntity<String> requestExistsException(RequestExistsException exception){
        return new ResponseEntity<>(REQUEST_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
}
