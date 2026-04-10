package com.riquebruno.autoflex_mrp_api.service;

import com.riquebruno.autoflex_mrp_api.dto.ProductRequestDTO;
import com.riquebruno.autoflex_mrp_api.dto.ProductResponseDTO;
import com.riquebruno.autoflex_mrp_api.entity.Product;
import com.riquebruno.autoflex_mrp_api.exception.BusinessRuleException;
import com.riquebruno.autoflex_mrp_api.exception.ResourceNotFoundException;
import com.riquebruno.autoflex_mrp_api.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;


    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public ProductResponseDTO create(ProductRequestDTO product) {
        if (product.name() == null || product.name().isBlank()) {
            throw new BusinessRuleException("The name is required.");
        }
        if (product.value() == null || product.value() <= 0) {
            throw new BusinessRuleException("The value must be greater than 0.");
        }

        Product entity = new Product();
        entity.setName(product.name());
        entity.setValue(product.value());

        Product savedEntity = repository.save(entity);

        return new ProductResponseDTO(
                savedEntity.getId(),
                savedEntity.getName(),
                savedEntity.getValue()
        );
    }

    public List<ProductResponseDTO> findAll() {
        List<Product> products = repository.findAll();
        return products.stream()
                .map(product -> new ProductResponseDTO(
                        product.getId(),
                        product.getName(),
                        product.getValue()
                )
        ).toList();
    }

    public Page<ProductResponseDTO> findAllByPage(Pageable pageable) {
        Page<Product> products = repository.findAll(pageable);
        return products.map(product -> new ProductResponseDTO(
                                product.getId(),
                                product.getName(),
                                product.getValue()
                        )
                );
    }

    public ProductResponseDTO findById(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found!"));
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getValue()
        );
    }

    public ProductResponseDTO update(Long id, ProductRequestDTO product) {
            Product entity = repository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found!"));

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
            throw new ResourceNotFoundException("Product not found!");
        }
        repository.deleteById(id);
    }
}
