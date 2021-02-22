/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.util.List;
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
        return restRepository.findAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/product/add", method = RequestMethod.POST)
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        String error = restRepository.add(product);
        System.out.println("post request recived");
        if (error == null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }
    
}
