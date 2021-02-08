/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.minuti.store.backend;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

/**
 *
 * @author Stigus
 */
public class Order implements Serializable {
    
    @Id
    @GeneratedValue
    Long orderid;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    Product product;
    
    @NotBlank(message = "please choose a size")
    String size;
    
    Customer customer;
       
    @Temporal(TemporalType.DATE)
    Date orderdate;
    
    @Temporal(TemporalType.DATE)
    Date pickupdate;
    
    @NotBlank(message = "please set a status")
    String status;
}
