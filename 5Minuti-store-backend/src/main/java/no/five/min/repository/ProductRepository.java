package no.five.min.repository;

import java.util.List;
import no.five.min.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    List<Product> findByDeletedFalse();
}
