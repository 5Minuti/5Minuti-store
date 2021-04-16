/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package no.five.min.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.five.min.entity.Order;

import org.springframework.jdbc.core.RowMapper;

/**
 * @author Stigus
 */
public class OrderRowMapper implements RowMapper<Order> {

    // COMMENT: Default constructor is probably not necessary, it will be created anyway by Java
    public OrderRowMapper() {
    }

    @Override
    public Order mapRow(ResultSet rs, int rowIndex) throws SQLException {
        return new Order(
                rs.getInt("orderid"),
                rs.getInt("customerid"),
                rs.getTimestamp("orderDateTime"),
                rs.getTimestamp("pickupDateTime"),
                rs.getString("status"),
                rs.getString("comment")
        );
    }
}