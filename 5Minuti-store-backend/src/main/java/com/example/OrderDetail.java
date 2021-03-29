/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.math.BigDecimal;

/**
 *
 * @author Stigus
 */
public class OrderDetail {
    
    private int orderDetailid;
    private int productid;
    private int orderid;
    private String size;
    private  BigDecimal price;

    public OrderDetail(int orderDetailid, int productid, int orderid, String size, BigDecimal price) {
        this.orderDetailid = orderDetailid;
        this.productid = productid;
        this.orderid = orderid;
        this.size = size;
        this.price = price;
    }

    public int getOrderDetailid() {
        return orderDetailid;
    }

    public void setOrderDetailid(int orderDetailid) {
        this.orderDetailid = orderDetailid;
    }

    public int getProductid() {
        return productid;
    }

    public void setProductid(int productid) {
        this.productid = productid;
    }

    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    
    
}
