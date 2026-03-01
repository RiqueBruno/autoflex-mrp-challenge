package com.riquebruno.autoflex_mrp_api.repository;

import com.riquebruno.autoflex_mrp_api.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
}
