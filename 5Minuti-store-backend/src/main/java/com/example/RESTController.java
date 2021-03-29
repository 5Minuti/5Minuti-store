/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Stigus
 */
@CrossOrigin
@RestController
public class RESTController {
    private final RESTRepository restRepository;
    
    @Autowired
    public RESTController(RESTRepository restRepository){
        this.restRepository = restRepository;
    }
    
    @RequestMapping(value = "/product/list")
    public List<Product> listProducts() {
        // COMMENT: probably you want to filter those with deleted == 0?
        return restRepository.findAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/product/add", method = RequestMethod.POST)
    public ResponseEntity<String> addProduct(@Valid @RequestBody Product product) {
        System.out.println("post request recived");
        try {
            Integer productId = restRepository.add(product);
            return new ResponseEntity<>(productId.toString(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @CrossOrigin
    @RequestMapping(value = "/order/add", method = RequestMethod.POST)
    public ResponseEntity<String> addOrder(@Valid @RequestBody Order order) {
        System.out.println("post request recived");
        try{
            // COMMENT: spellchecker could be nice :) No problem for debug messages, but it should right for the customer
            // COMMENT: Perhaps the status should be "received", not "preparing"?
            order.setStatus("Prepearing");
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            order.setOrderDateTime(timestamp);
            Integer orderId = restRepository.add(order);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
}
