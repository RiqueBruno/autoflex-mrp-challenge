package com.riquebruno.autoflex_mrp_api.controller;

import com.riquebruno.autoflex_mrp_api.dto.ProductMaterialRequestDTO;
import com.riquebruno.autoflex_mrp_api.dto.ProductMaterialResponseDTO;
import com.riquebruno.autoflex_mrp_api.service.ProductMaterialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products-material")
public class ProductMaterialController {

    private final ProductMaterialService service;

    public ProductMaterialController(ProductMaterialService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProductMaterialResponseDTO> create(@RequestBody ProductMaterialRequestDTO request) {
        ProductMaterialResponseDTO response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProductMaterialResponseDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductMaterialResponseDTO>> findById(@PathVariable Long productId) {
        return ResponseEntity.ok(service.findByProductId(productId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductMaterialResponseDTO> update(@PathVariable Long id, @RequestBody ProductMaterialRequestDTO request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
