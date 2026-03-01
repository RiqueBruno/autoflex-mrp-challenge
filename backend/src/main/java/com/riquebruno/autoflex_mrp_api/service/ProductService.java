package com.riquebruno.autoflex_mrp_api.service;

import com.riquebruno.autoflex_mrp_api.dto.ProductRequestDTO;
import com.riquebruno.autoflex_mrp_api.entity.Product;
import com.riquebruno.autoflex_mrp_api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;


    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public ProductResponseDTO create(ProductRequestDTO product) {
        Product entity = new Product();
        entity.setName(product.name());
        entity.setValue(product.value());

        Product savedEntity = repository.save(entity);

        ProductResponseDTO reponse = new ProductResponseDTO(
                savedEntity.getId(),
                savedEntity.getName(),
                savedEntity.getValue()
        );

        return reponse;
    }
    public List<ProductResponseDTO> findAll() {
        List<Product> products = repository.findAll();
        List<ProductResponseDTO> response = products.stream()
                .map(product -> new ProductResponseDTO(
                        product.getId(),
                        product.getName(),
                        product.getValue()
                )
        ).toList();
        return response;
    }

    public ProductResponseDTO findById(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        ProductResponseDTO reponse = new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getValue()
        );

        return reponse;
    };

    public ProductResponseDTO update(Long id, ProductRequestDTO product) {
        Product entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));

        entity.setName(product.name());
        entity.setValue(product.value());

        Product updatedEntity = repository.save(entity);

        return new ProductResponseDTO(
                updatedEntity.getId(),
                updatedEntity.getName(),
                updatedEntity.getValue()
        );
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Product not found!");
        }
        repository.deleteById(id);
    }
}
