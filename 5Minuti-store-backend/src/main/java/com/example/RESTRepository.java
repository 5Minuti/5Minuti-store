/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

/**
 * COMMENT: I suggest to not use @author tag is any files, as that does not do much good:
 * 1) This is a group project
 * 2) Over time perhaps other people will modify the files
 * 3) We can get the author of the file from GIT history
 * @author Stigus
 */
@Repository
public class RESTRepository {


    private final JdbcTemplate jdbcTemplate;
    private RowMapper<Product> rowMapper = new RESTRowMapper();
    
    @Autowired
    public RESTRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public List<Product> findAll(){
        return jdbcTemplate.query("SELECT * FROM product", rowMapper);
    }
    
    
      public String add(Product product) {
        String query = "INSERT INTO product (productid, productname, description, smallprice, mediumprice, largeprice, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try {
            // COMMENT: the lines should not be longer than 100 characters, preferably no longer than 80 chars
            int numRows = jdbcTemplate.update(query, product.getProductid(), product.getProductname(), product.getDescription(), product.getSmallprice(), product.getMediumprice(), product.getLargeprice(), product.isDeleted());
            if (numRows == 1) {
                return null;
            } else {
                return "Could not add new product";
            }
        } catch (Exception e) {
            return "Could not add new product: " + e.getMessage();
        }
    }  
}
