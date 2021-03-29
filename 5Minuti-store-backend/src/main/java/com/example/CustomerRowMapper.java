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
public class CustomerRowMapper implements RowMapper<Customer> {

    public CustomerRowMapper() {
    }

    @Override
    public Customer mapRow(ResultSet rs, int rowIndex) throws SQLException {
        return new Customer(
        rs.getInt("customerid"),
        rs.getString("name"),
        rs.getString("number"),
        rs.getString("email")        
        );
    }
    
}
