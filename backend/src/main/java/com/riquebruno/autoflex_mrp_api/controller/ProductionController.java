package com.riquebruno.autoflex_mrp_api.controller;

import com.riquebruno.autoflex_mrp_api.dto.ProductionResponseDTO;
import com.riquebruno.autoflex_mrp_api.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/productions")
public class ProductionController {
    private final ProductionService service;

    public ProductionController(ProductionService service) {
        this.service = service;
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<ProductionResponseDTO>> findAllProductionSuggestion() {
        return ResponseEntity.ok(service.findAllProductionSuggestion());
    }
}
