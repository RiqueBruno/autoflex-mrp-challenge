package com.riquebruno.autoflex_mrp_api.dto;

public record ProductMaterialResponseDTO(
        Long id,
        String productName,
        String materialName,
        Integer quantity
) {}
