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
public class OrderDetailRowMapper implements RowMapper<OrderDetail> {

    public OrderDetailRowMapper() {
    }

    @Override
    public OrderDetail mapRow(ResultSet rs, int rowIndex) throws SQLException {
        return new OrderDetail(
        rs.getInt("orderDetailid"),
        rs.getInt("productid"),
        rs.getInt("orderid"),
        rs.getString("size"),
        rs.getBigDecimal("price")
        );
    }
    
}
