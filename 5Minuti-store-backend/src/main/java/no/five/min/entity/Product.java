/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.math.BigDecimal;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

/**
 *
 * @author Stigus
 */
public class Product {
    
    @NotNull
    private int productid;
    @NotBlank(message = "Product name cannot be blank")
    private String productname;
    @NotBlank(message = "Description cannot be blank")
    private String description;
    @Positive(message = "Small price must be a positive value")
    private BigDecimal smallprice;
    @NotNull(message = "Medium price must have a value") @Positive(message = "mediumprice must be a positive value")
    private BigDecimal mediumprice;
    @Positive(message = "Large price must be a positive value")
    private BigDecimal largeprice;
    private boolean deleted;

    public Product(int productid, String productname, String description, BigDecimal smallprice, BigDecimal mediumprice, BigDecimal largeprice, boolean deleted) {
        this.productid = productid;
        this.productname = productname;
        this.description = description;
        this.smallprice = smallprice;
        this.mediumprice = mediumprice;
        this.largeprice = largeprice;
        this.deleted = deleted;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public int getProductid() {
        return productid;
    }

    public void setProductid(int productid) {
        this.productid = productid;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public BigDecimal getSmallprice() {
        return smallprice;
    }

    public void setSmallprice(BigDecimal smallprice) {
        this.smallprice = smallprice;
    }

    public BigDecimal getMediumprice() {
        return mediumprice;
    }

    public void setMediumprice(BigDecimal mediumprice) {
        this.mediumprice = mediumprice;
    }

    public BigDecimal getLargeprice() {
        return largeprice;
    }

    public void setLargeprice(BigDecimal largeprice) {
        this.largeprice = largeprice;
    }


    
    
    
    
}
