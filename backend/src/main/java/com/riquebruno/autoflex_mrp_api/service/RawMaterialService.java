package com.riquebruno.autoflex_mrp_api.service;

import com.riquebruno.autoflex_mrp_api.dto.RawMaterialRequestDTO;
import com.riquebruno.autoflex_mrp_api.dto.RawMaterialResponseDTO;
import com.riquebruno.autoflex_mrp_api.entity.RawMaterial;
import com.riquebruno.autoflex_mrp_api.exception.BusinessRuleException;
import com.riquebruno.autoflex_mrp_api.exception.ResourceNotFoundException;
import com.riquebruno.autoflex_mrp_api.repository.RawMaterialRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RawMaterialService {

    private final RawMaterialRepository repository;

    public RawMaterialService(RawMaterialRepository repository) {
        this.repository = repository;
    }

    public RawMaterialResponseDTO create(RawMaterialRequestDTO material) {
        if(material.name() == null || material.name().isBlank()) {
            throw new BusinessRuleException("The name is required.");
        }
        if(material.amount() == null || material.amount() < 0) {
            throw new BusinessRuleException("The value must be greater than 0.");
        }

        RawMaterial entity = new RawMaterial();
        entity.setName(material.name());
        entity.setAmount(material.amount());

        RawMaterial savedEntity = repository.save(entity);

        return new RawMaterialResponseDTO(
                savedEntity.getId(),
                savedEntity.getName(),
                savedEntity.getAmount()
        );
    }

    public List<RawMaterialResponseDTO> findAll() {
        List<RawMaterial> materials = repository.findAll();
        return materials.stream()
                .map(material -> new RawMaterialResponseDTO(
                    material.getId(),
                    material.getName(),
                    material.getAmount()
        )).toList();
    }

    public Page<RawMaterialResponseDTO> findAllByPage(Pageable pageable) {
        Page<RawMaterial> rawMaterials = repository.findAll(pageable);
        return rawMaterials.map(rawMaterial -> new RawMaterialResponseDTO(
                rawMaterial.getId(),
                rawMaterial.getName(),
                rawMaterial.getAmount()
        ));
    }

    public RawMaterialResponseDTO findById(Long id) {
        RawMaterial entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));
        return new RawMaterialResponseDTO(
                entity.getId(),
                entity.getName(),
                entity.getAmount()
        );
    }

    public RawMaterialResponseDTO update(Long id, RawMaterialRequestDTO material) {
        RawMaterial entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));

        entity.setName(material.name());
        entity.setAmount(material.amount());

        RawMaterial updatedEntity = repository.save(entity);

        return new RawMaterialResponseDTO(
                updatedEntity.getId(),
                updatedEntity.getName(),
                updatedEntity.getAmount()
        );
    }

    public void delete(Long id) {
        if(!repository.existsById(id)){
            throw new ResourceNotFoundException("Material not found!");
        }
        repository.deleteById(id);
    }
}
