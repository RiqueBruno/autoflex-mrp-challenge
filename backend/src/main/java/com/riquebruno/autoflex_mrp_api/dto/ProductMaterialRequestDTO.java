package com.riquebruno.autoflex_mrp_api.dto;

public record ProductMaterialRequestDTO(Long productId, Long rawMaterialId, Integer quantityNeeded) {
}
