/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

/**
 *
 * @author Stigus
 */
public class RESTRowMapper implements RowMapper<Product> {

    public RESTRowMapper() {
    }

    @Override
    public Product mapRow(ResultSet rs, int rowIndex) throws SQLException {
        return new Product(
        rs.getInt("productid"),
        rs.getString("productName"),
        rs.getBigDecimal("smallprice"),
        rs.getBigDecimal("mediumprice"),
        rs.getBigDecimal("largeprice")
        );
    }
    
}
