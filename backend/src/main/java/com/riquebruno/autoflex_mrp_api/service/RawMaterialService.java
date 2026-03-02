package com.riquebruno.autoflex_mrp_api.service;

import com.riquebruno.autoflex_mrp_api.dto.RawMaterialRequestDTO;
import com.riquebruno.autoflex_mrp_api.dto.RawMaterialResponseDTO;
import com.riquebruno.autoflex_mrp_api.entity.RawMaterial;
import com.riquebruno.autoflex_mrp_api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RawMaterialService {

    private final RawMaterialRepository repository;

    public RawMaterialService(RawMaterialRepository repository) {
        this.repository = repository;
    }

    public RawMaterialResponseDTO create(RawMaterialRequestDTO material) {
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
        List<RawMaterialResponseDTO> response = materials.stream()
                .map(material -> new RawMaterialResponseDTO(
                    material.getId(),
                    material.getName(),
                    material.getAmount()
        )).toList();
        return response;
    }

    public RawMaterialResponseDTO findById(Long id) {
        RawMaterial entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found"));
        return new RawMaterialResponseDTO(
                entity.getId(),
                entity.getName(),
                entity.getAmount()
        );
    }

    public RawMaterialResponseDTO update(Long id, RawMaterialRequestDTO material) {
        RawMaterial entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found"));

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
            throw new RuntimeException("Material not found!");
        }
        repository.deleteById(id);
    }
}
