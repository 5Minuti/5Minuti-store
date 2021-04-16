package no.five.min.entity;

import lombok.Data;

import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity(name = "products")
public class Product {
    @NotNull
    @Id
    @GeneratedValue
    private int id;
    @NotBlank(message = "Product name cannot be blank")
    private String productname;
    @NotBlank(message = "Description cannot be blank")
    private String description;
    @Positive(message = "Small price must be a positive value")
    private BigDecimal smallprice;
    @NotNull(message = "Medium price must have a value")
    @Positive(message = "Medium price must be a positive value")
    private BigDecimal mediumprice;
    @Positive(message = "Large price must be a positive value")
    private BigDecimal largeprice;
    private boolean deleted;
}
