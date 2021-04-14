/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// COMMENT: com.example is not an appropriate package
package no.five.min.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss'Z'")
    private Timestamp orderDateTime;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss'Z'")
    private Timestamp pickupDateTime;
    private String status;
    private String comment;
    // COMMENT: the orderDetails list should never be null, it will create further handling harder
    private List<OrderDetail> details = new LinkedList<>();

    public Order(int orderid, int customerid, Timestamp orderDateTime, Timestamp pickupDateTime, String status, String comment, List<OrderDetail> orderDetails) {
        this.orderid = orderid;
        this.customerid = customerid;
        this.orderDateTime = orderDateTime;
        this.pickupDateTime = pickupDateTime;
        this.status = status;
        this.comment = comment;
        this.details = orderDetails;
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

    public List<OrderDetail> getDetails() {
        return details;
    }

    public void setDetails(List<OrderDetail> details) {
        this.details = details;
    }
    
    
    
    
}
