package com.spring.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadExistException.class)
    public ResponseEntity<String> handleEmailAlreadyExist(EmailAlreadExistException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<String> handleLoginException(LoginException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleLoginException(ResourceNotFoundException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);

    }
}
