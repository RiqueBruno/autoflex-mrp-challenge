package com.riquebruno.autoflex_mrp_api.service;

import com.riquebruno.autoflex_mrp_api.dto.ProductMaterialRequestDTO;
import com.riquebruno.autoflex_mrp_api.dto.ProductMaterialResponseDTO;
import com.riquebruno.autoflex_mrp_api.entity.Product;
import com.riquebruno.autoflex_mrp_api.entity.ProductMaterial;
import com.riquebruno.autoflex_mrp_api.entity.RawMaterial;
import com.riquebruno.autoflex_mrp_api.repository.ProductMaterialRepository;
import com.riquebruno.autoflex_mrp_api.repository.ProductRepository;
import com.riquebruno.autoflex_mrp_api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductMaterialService {

    private final ProductMaterialRepository repository;
    private final ProductRepository productRepository;
    private final RawMaterialRepository materialRepository;

    public ProductMaterialService(
            ProductMaterialRepository repository,
            ProductRepository productRepository,
            RawMaterialRepository materialRepository
    ) {
        this.repository = repository;
        this.productRepository = productRepository;
        this.materialRepository = materialRepository;
    }

    public ProductMaterialResponseDTO create(ProductMaterialRequestDTO request) {
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        RawMaterial material = materialRepository.findById(request.rawMaterialId())
                .orElseThrow(() -> new RuntimeException("Material not found!"));

        ProductMaterial entity = new ProductMaterial();
        entity.setProduct(product);
        entity.setRawMaterial(material);
        entity.setQuantityNeeded(request.quantityNeeded());

        ProductMaterial savedEntity = repository.save(entity);

        return new ProductMaterialResponseDTO(
                savedEntity.getId(),
                product.getName(),
                material.getName(),
                savedEntity.getQuantityNeeded()
        );
    }

    public List<ProductMaterialResponseDTO> findAll(){
        List<ProductMaterial> entities = repository.findAll();

        return entities.stream()
                .map(entity -> new ProductMaterialResponseDTO(
                        entity.getId(),
                        entity.getProduct().getName(),
                        entity.getRawMaterial().getName(),
                        entity.getQuantityNeeded()
                )).toList();
    }

    public List<ProductMaterialResponseDTO> findByProductId(Long id) {
        List<ProductMaterial> materials = repository.findByProductId(id);
        return materials.stream()
                .map(material -> new ProductMaterialResponseDTO(
                        material.getId(),
                        material.getProduct().getName(),
                        material.getRawMaterial().getName(),
                        material.getQuantityNeeded()
                )).toList();
    }

    public ProductMaterialResponseDTO update(Long id, ProductMaterialRequestDTO request) {
        ProductMaterial entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe item not found!"));

        entity.setQuantityNeeded(request.quantityNeeded());

        ProductMaterial savedEntity = repository.save(entity);

        return new ProductMaterialResponseDTO(
                savedEntity.getId(),
                savedEntity.getProduct().getName(),
                savedEntity.getRawMaterial().getName(),
                savedEntity.getQuantityNeeded()
        );
    }

    public void delete(Long id){
        if(!repository.existsById(id)) {
            throw new RuntimeException("Recipe item not found!");
        }
        repository.deleteById(id);
    }
}
