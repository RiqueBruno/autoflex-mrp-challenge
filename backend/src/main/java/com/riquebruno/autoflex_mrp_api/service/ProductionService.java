package com.riquebruno.autoflex_mrp_api.service;

import com.riquebruno.autoflex_mrp_api.dto.ProductionResponseDTO;
import com.riquebruno.autoflex_mrp_api.entity.Product;
import com.riquebruno.autoflex_mrp_api.entity.ProductMaterial;
import com.riquebruno.autoflex_mrp_api.entity.RawMaterial;
import com.riquebruno.autoflex_mrp_api.repository.ProductMaterialRepository;
import com.riquebruno.autoflex_mrp_api.repository.ProductRepository;
import com.riquebruno.autoflex_mrp_api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductionService {
    private final ProductRepository repository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductMaterialRepository productMaterialRepository;

    public ProductionService(
            ProductRepository repository,
            RawMaterialRepository rawMaterialRepository,
            ProductMaterialRepository productMaterialRepository
    ) {
        this.repository = repository;
        this.rawMaterialRepository = rawMaterialRepository;
        this.productMaterialRepository = productMaterialRepository;
    }

    public List<ProductionResponseDTO> findAllProductionSuggestion() {
        List<Product> allProducts = repository.findAll();
        allProducts.sort(Comparator.comparing(Product::getValue).reversed());

        List<RawMaterial> materials = rawMaterialRepository.findAll();

        Map<Long, Integer> stock = new HashMap<>();
        for(RawMaterial rwm : materials) {
            stock.put(rwm.getId(), rwm.getAmount());
        }

        List<ProductionResponseDTO> response = new ArrayList<>();

        for (Product product : allProducts) {
            List<ProductMaterial> components = productMaterialRepository.findByProductId(product.getId());

            if(components == null || components.isEmpty()) {continue;}

            int amountOfProducts = Integer.MAX_VALUE;

            for (ProductMaterial component : components) {
                Integer quantityRequired = component.getQuantityNeeded();
                Integer quantityInStock = stock.getOrDefault(component.getRawMaterial().getId(), 0);

                int howMuchCanIDo = quantityInStock / quantityRequired;

                amountOfProducts = Math.min(amountOfProducts,howMuchCanIDo);
            }

            if(amountOfProducts > 0) {
                for (ProductMaterial component: components) {
                    Integer totalAmount = component.getQuantityNeeded() * amountOfProducts;
                    Integer lastQuantityInStock = stock.getOrDefault(component.getRawMaterial().getId(), 0);
                    stock.put(component.getRawMaterial().getId(),lastQuantityInStock - totalAmount);
                }

                response.add(new ProductionResponseDTO(
                        product.getId(),
                        product.getName(),
                        amountOfProducts,
                        product.getValue() * amountOfProducts
                ));
            }
        }
        return response;
    }
}
