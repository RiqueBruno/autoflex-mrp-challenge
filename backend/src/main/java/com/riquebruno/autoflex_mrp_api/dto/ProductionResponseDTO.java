package com.riquebruno.autoflex_mrp_api.dto;

public record ProductionResponseDTO(
        Long productId,
        String productName,
        Integer possibleQuantity,
        Double totalValue
) {
}
