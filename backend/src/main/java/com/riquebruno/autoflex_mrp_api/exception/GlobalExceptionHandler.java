package com.riquebruno.autoflex_mrp_api.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> noDuplications(DataIntegrityViolationException error) {
        return ResponseEntity.status(409).body("Data conflict: This name is already in use or the item is linked to another record and cannot be deleted.");
    };

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> resourceNotFoundException (ResourceNotFoundException error) {
        return ResponseEntity.status(404).body(error.getMessage());
    }

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<String> businessRuleException (BusinessRuleException error) {
        return ResponseEntity.status(400).body(error.getMessage());
    }
}
