/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.minuti.store.backend;

import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 *
 * @author Stigus
 */
public class Order implements Serializable {
    
    @Id
    @GeneratedValue
    Long orderid;
    
    
    
}
