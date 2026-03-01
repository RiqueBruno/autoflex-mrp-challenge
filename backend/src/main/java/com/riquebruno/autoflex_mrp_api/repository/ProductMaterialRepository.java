package com.riquebruno.autoflex_mrp_api.repository;

import com.riquebruno.autoflex_mrp_api.entity.ProductMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMaterialRepository extends JpaRepository<ProductMaterial, Long> {
}
