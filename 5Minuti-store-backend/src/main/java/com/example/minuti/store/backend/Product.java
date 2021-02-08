
package com.example.minuti.store.backend;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

/**
 *
 * @author Stigus
 * A product to be sold in the 5minuti website
 */
@Entity @Table(name= "PRODUCT")

public class Product implements Serializable {
    
    
    @Id
    @GeneratedValue
    Long productid;
    
    @NotBlank(message = "Product name cannot be blank")
    String productname;
    
    @NotNull (message = "Price cannot be null") 
    @Positive (message = "price must be a positive number")
    BigDecimal smallprice;
    
    @NotNull (message = "Price cannot be null") 
    @Positive (message = "price must be a positive number")
    BigDecimal mediumprice;
    
    @NotNull (message = "Price cannot be null") 
    @Positive (message = "price must be a positive number")
    BigDecimal largeprice;
    
    
    
}
