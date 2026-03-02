package com.riquebruno.autoflex_mrp_api.dto;

public record ProductMaterialResponseDTO(
        Long id,
        Long productId,
        String productName,
        Long rawMaterialId,
        String rawMaterialName,
        Integer quantityNeeded
) {}
