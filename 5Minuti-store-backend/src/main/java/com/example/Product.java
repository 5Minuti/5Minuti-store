/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.math.BigDecimal;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Stigus
 */
public class Product {
    
    @NotNull
    private int productid;
    @NotBlank
    private String productname;
    private BigDecimal smallprice;
    private BigDecimal mediumprice;
    private BigDecimal largeprice;

    public Product(int productid, String productname, BigDecimal smallprice, BigDecimal mediumprice, BigDecimal largeprice) {
        this.productid = productid;
        this.productname = productname;
        this.smallprice = smallprice;
        this.mediumprice = mediumprice;
        this.largeprice = largeprice;
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
