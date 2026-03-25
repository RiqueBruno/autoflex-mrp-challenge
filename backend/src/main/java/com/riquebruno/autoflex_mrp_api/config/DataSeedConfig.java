package com.riquebruno.autoflex_mrp_api.config;

import com.riquebruno.autoflex_mrp_api.entity.Product;
import com.riquebruno.autoflex_mrp_api.entity.ProductMaterial;
import com.riquebruno.autoflex_mrp_api.entity.RawMaterial;
import com.riquebruno.autoflex_mrp_api.repository.ProductMaterialRepository;
import com.riquebruno.autoflex_mrp_api.repository.ProductRepository;
import com.riquebruno.autoflex_mrp_api.repository.RawMaterialRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "mrp.seed.activate", havingValue = "true")
public class DataSeedConfig implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductMaterialRepository productMaterialRepository;

    public DataSeedConfig(
            ProductRepository productRepository,
            RawMaterialRepository rawMaterialRepository,
            ProductMaterialRepository productMaterialRepository
    ) {
        this.productRepository = productRepository;
        this.rawMaterialRepository = rawMaterialRepository;
        this.productMaterialRepository = productMaterialRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() > 0) return;

        RawMaterial bun = createRawMaterial("Hamburger Bun", 500);
        RawMaterial beef = createRawMaterial("Beef Patty", 300);
        RawMaterial chicken = createRawMaterial("Breaded Chicken", 200);
        RawMaterial cheese = createRawMaterial("Cheddar Cheese", 400);
        RawMaterial bacon = createRawMaterial("Sliced Bacon", 150);
        RawMaterial lettuce = createRawMaterial("Lettuce", 100);
        RawMaterial tomato = createRawMaterial("Tomato", 100);
        RawMaterial onion = createRawMaterial("Red Onion", 80);
        RawMaterial fries = createRawMaterial("French Fries", 1000);
        RawMaterial soda = createRawMaterial("Cola Syrup", 50);
        RawMaterial box = createRawMaterial("Cardboard Box", 1000);
        RawMaterial cup = createRawMaterial("Plastic Cup", 1000);

        Product p1 = createProduct("Classic Burger", 15.0);
        Product p2 = createProduct("Cheeseburger", 18.0);
        Product p3 = createProduct("Bacon Burger", 22.0);
        Product p4 = createProduct("Double Cheese", 25.0);
        Product p5 = createProduct("Chicken Burger", 20.0);
        Product p6 = createProduct("Monster Burger", 35.0);
        Product p7 = createProduct("Salad Burger", 19.0);
        Product p8 = createProduct("Onion Burger", 21.0);
        Product p9 = createProduct("Chicken Bacon", 24.0);
        Product p10 = createProduct("Small Fries", 8.0);
        Product p11 = createProduct("Medium Fries", 12.0);
        Product p12 = createProduct("Large Fries", 16.0);
        Product p13 = createProduct("Fries with Cheddar", 20.0);
        Product p14 = createProduct("Monster Fries", 28.0);
        Product p15 = createProduct("Small Soda", 6.0);
        Product p16 = createProduct("Medium Soda", 8.0);
        Product p17 = createProduct("Large Soda", 10.0);
        Product p18 = createProduct("Classic Combo", 25.0);
        Product p19 = createProduct("Bacon Combo", 35.0);
        Product p20 = createProduct("Family Combo", 60.0);

        createRecipe(p1, bun, 1);
        createRecipe(p1, beef, 1);
        createRecipe(p1, box, 1);

        createRecipe(p2, bun, 1);
        createRecipe(p2, beef, 1);
        createRecipe(p2, cheese, 1);
        createRecipe(p2, box, 1);

        createRecipe(p3, bun, 1);
        createRecipe(p3, beef, 1);
        createRecipe(p3, cheese, 1);
        createRecipe(p3, bacon, 2);
        createRecipe(p3, box, 1);

        createRecipe(p4, bun, 1);
        createRecipe(p4, beef, 2);
        createRecipe(p4, cheese, 2);
        createRecipe(p4, box, 1);

        createRecipe(p5, bun, 1);
        createRecipe(p5, chicken, 1);
        createRecipe(p5, lettuce, 1);
        createRecipe(p5, tomato, 1);
        createRecipe(p5, box, 1);

        createRecipe(p6, bun, 1);
        createRecipe(p6, beef, 3);
        createRecipe(p6, cheese, 3);
        createRecipe(p6, bacon, 3);
        createRecipe(p6, box, 1);

        createRecipe(p7, bun, 1);
        createRecipe(p7, beef, 1);
        createRecipe(p7, lettuce, 2);
        createRecipe(p7, tomato, 2);
        createRecipe(p7, onion, 1);
        createRecipe(p7, box, 1);

        createRecipe(p8, bun, 1);
        createRecipe(p8, beef, 1);
        createRecipe(p8, cheese, 1);
        createRecipe(p8, onion, 3);
        createRecipe(p8, box, 1);

        createRecipe(p9, bun, 1);
        createRecipe(p9, chicken, 1);
        createRecipe(p9, cheese, 1);
        createRecipe(p9, bacon, 2);
        createRecipe(p9, box, 1);

        createRecipe(p10, fries, 100);
        createRecipe(p10, box, 1);

        createRecipe(p11, fries, 200);
        createRecipe(p11, box, 1);

        createRecipe(p12, fries, 300);
        createRecipe(p12, box, 1);

        createRecipe(p13, fries, 200);
        createRecipe(p13, cheese, 2);
        createRecipe(p13, box, 1);

        createRecipe(p14, fries, 400);
        createRecipe(p14, cheese, 3);
        createRecipe(p14, bacon, 3);
        createRecipe(p14, box, 1);

        createRecipe(p15, soda, 1);
        createRecipe(p15, cup, 1);

        createRecipe(p16, soda, 2);
        createRecipe(p16, cup, 1);

        createRecipe(p17, soda, 3);
        createRecipe(p17, cup, 1);

        createRecipe(p18, bun, 1);
        createRecipe(p18, beef, 1);
        createRecipe(p18, box, 2);
        createRecipe(p18, fries, 100);
        createRecipe(p18, soda, 1);
        createRecipe(p18, cup, 1);

        createRecipe(p19, bun, 1);
        createRecipe(p19, beef, 1);
        createRecipe(p19, cheese, 1);
        createRecipe(p19, bacon, 2);
        createRecipe(p19, box, 2);
        createRecipe(p19, fries, 200);
        createRecipe(p19, soda, 2);
        createRecipe(p19, cup, 1);

        createRecipe(p20, bun, 4);
        createRecipe(p20, beef, 4);
        createRecipe(p20, cheese, 4);
        createRecipe(p20, box, 5);
        createRecipe(p20, fries, 600);
        createRecipe(p20, soda, 4);
        createRecipe(p20, cup, 4);
    }

    private RawMaterial createRawMaterial(String name, Integer amount) {
        RawMaterial rm = new RawMaterial();
        rm.setName(name);
        rm.setAmount(amount);
        return rawMaterialRepository.save(rm);
    }

    private Product createProduct(String name, Double value) {
        Product p = new Product();
        p.setName(name);
        p.setValue(value);
        return productRepository.save(p);
    }

    private void createRecipe(Product product, RawMaterial rawMaterial, Integer quantity) {
        ProductMaterial pm = new ProductMaterial();
        pm.setProduct(product);
        pm.setRawMaterial(rawMaterial);
        pm.setQuantityNeeded(quantity);
        productMaterialRepository.save(pm);
    }
}