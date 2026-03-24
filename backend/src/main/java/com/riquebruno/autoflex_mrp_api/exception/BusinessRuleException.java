package com.riquebruno.autoflex_mrp_api.exception;

public class BusinessRuleException extends RuntimeException{
    public BusinessRuleException (String message) {
        super(message);
    }
}
