/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// COMMENT: com.example is not an appropriate package
package com.example;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.sql.Timestamp;
import java.util.List;
import javax.persistence.Temporal;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Stigus
 */
public class Order {
    
    @NotNull
    private int orderid;
    @NotNull
    private int customerid;
    @Temporal(javax.persistence.TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Timestamp orderDateTime;
    @Temporal(javax.persistence.TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Timestamp pickupDateTime;
    private String status;
    private String comment;
    private List<OrderDetail> orderDetails;

    public Order(int orderid, int customerid, Timestamp orderDateTime, Timestamp pickupDateTime, String status, String comment, List<OrderDetail> orderDetails) {
        this.orderid = orderid;
        this.customerid = customerid;
        this.orderDateTime = orderDateTime;
        this.pickupDateTime = pickupDateTime;
        this.status = status;
        this.comment = comment;
        this.orderDetails = orderDetails;
    }

    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    public int getCustomerid() {
        return customerid;
    }

    public void setCustomerid(int customerid) {
        this.customerid = customerid;
    }

    public Timestamp getOrderDateTime() {
        return orderDateTime;
    }

    public void setOrderDateTime(Timestamp orderDateTime) {
        this.orderDateTime = orderDateTime;
    }

    public Timestamp getPickupDateTime() {
        return pickupDateTime;
    }

    public void setPickupDateTime(Timestamp pickupDateTime) {
        this.pickupDateTime = pickupDateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }
    
    
    
    
}
