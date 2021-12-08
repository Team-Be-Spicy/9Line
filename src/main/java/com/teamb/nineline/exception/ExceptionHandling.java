package com.teamb.nineline.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class ExceptionHandling {

    private final String REQUEST_NOT_FOUND = "Request not found.";

    @ExceptionHandler(RequestExistsException.class)
    public ResponseEntity<String> requestExistsException(RequestExistsException exception) {
        return new ResponseEntity<>(REQUEST_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> constraintViolationException(ConstraintViolationException exception) {
        return new ResponseEntity<>("Field can't be empty", HttpStatus.BAD_REQUEST);
    }
}
