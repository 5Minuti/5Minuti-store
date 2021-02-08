/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.minuti.store.backend;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

/**
 *
 * @author Stigus
 */
public class Customer implements Serializable {
    
    @Id
    @GeneratedValue
    Long customerid;
    
    @NotBlank(message = "name cannot be blank")
    String customername;
    
    @NotBlank(message = "number cannot be blank") 
    @Pattern(regexp="\\d{8}")
    String phonenumber;
    
    
}
