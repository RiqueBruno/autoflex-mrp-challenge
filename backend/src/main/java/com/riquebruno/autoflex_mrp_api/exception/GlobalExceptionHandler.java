package com.riquebruno.autoflex_mrp_api.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> noDuplications(DataIntegrityViolationException error) {
        return ResponseEntity.status(409).body("It is not possible to have duplicate names.");
    };
}
