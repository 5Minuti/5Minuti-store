/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

/**
 * @author Stigus
 */
@Repository
public class RESTRepository {


    private final JdbcTemplate jdbcTemplate;
    private RowMapper<Product> productRowMapper = new ProductRowMapper();

    @Autowired
    public RESTRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> findAll() {
        return jdbcTemplate.query("SELECT * FROM product", productRowMapper);
    }


    public Integer add(Product product) throws Exception {
        // Using approach proposed in
        // https://docs.spring.io/spring-framework/docs/3.1.x/spring-framework-reference/html/jdbc.html#jdbc-auto-genereted-keys
        String query = "INSERT INTO product (productid, productname, description, smallprice, mediumprice, largeprice, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(query, new String[]{"id"});
                ps.setInt(1, product.getProductid());
                ps.setString(2, product.getProductname());
                ps.setString(3, product.getDescription());
                ps.setBigDecimal(4, product.getSmallprice());
                ps.setBigDecimal(5, product.getMediumprice());
                ps.setBigDecimal(6, product.getLargeprice());
                ps.setBoolean(7, product.isDeleted());
                return ps;
            }, keyHolder);
            if (numRows == 1) {
                Number key = keyHolder.getKey();
                return key != null ? key.intValue() : null;
            } else {
                throw new Exception("Could not add new product");
            }
        } catch (Exception e) {
            throw new Exception("Could not add new product: " + e.getMessage());
        }
    }

    public Integer add(Order order) throws Exception {
        String query = "INSERT INTO 5minuti.order (order_id, customer_id, order_datetime, pickup_datetime, status, comment) VALUES (?, ?, ?, ?, ?, ?)";
        String detalQuery = "INSERT INTO order_detail (order_detail_id, product_id, order_id, size, price) VALUES (?, ?, ?, ?, ?)";
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            int numRows = jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(query, new String[]{"id"});
                ps.setInt(1, order.getOrderid());
                ps.setInt(2, order.getCustomerid());
                ps.setTimestamp(3, order.getOrderDateTime());
                ps.setTimestamp(4, order.getPickupDateTime());
                ps.setString(5, order.getStatus());
                ps.setString(6, order.getComment());
                
                for (OrderDetail orderDetail : order.getOrderDetails()){
                    orderDetail.setOrderid(order.getOrderid());
                    jdbcTemplate.update(detalQuery, orderDetail.getOrderDetailid(), orderDetail.getProductid(), orderDetail.getOrderid(), orderDetail.getSize(), orderDetail.getPrice());
                }
                return ps;
            }, keyHolder);
            if (numRows == 1) {
                Number key = keyHolder.getKey();
                return key != null ? key.intValue() : null;
            } else {
                throw new Exception("Could not add new Order");
            }
        } catch (Exception e) {
            throw new Exception("Could not add new Order: " + e.getMessage());
        }

    }

}
