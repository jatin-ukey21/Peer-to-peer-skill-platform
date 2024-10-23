package com.spring.backend.exception;


public class EmailAlreadExistException extends RuntimeException {

    public EmailAlreadExistException(String message){
        super(message);
    }
}
