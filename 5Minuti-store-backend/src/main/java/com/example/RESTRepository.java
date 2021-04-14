/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.sql.PreparedStatement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

/**
 * @author Stigus
 */
// COMMENT: The convention is to create one Repository class per entity (table), it could work fine with one as well
// But you see already now that you get longer variable names, methods with the same name etc. For example,
// can one intuitively guess, what method RESTRepository::findAll() will return? All of what?
@Repository
public class RESTRepository {


    private final JdbcTemplate jdbcTemplate;
    // COMMENT: IDE suggests that productRowMapper could be final.
    private RowMapper<Product> productRowMapper = new ProductRowMapper();

    @Autowired
    public RESTRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // COMMENT: I suggest to split the repository in OrderRepository, ProductRepository etc. If you do so, perhaps
    // a good idea to create a separate folder, such as `repositories`
    // If you don't split the class, then method names should be changed. addProduct(), addOrder() etc
    public List<Product> findAll() {
        // COMMENT: probably you want to filter those with deleted == 0?
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

    /**
     * Inserts order and consequential order_details in the database
     * @param order
     * @return ID of the newly created order on success. Throws exception on error
     * @throws Exception
     */
    public Integer add(Order order) throws Exception {
        // COMMENT: I would suggest to not include DB name in the query. It is more flexible then - one can have any
        // name for the database
        // COMMENT: names which collide with reserved keywords (order collides with SQLs ORDER BY) should be
        // enclosed in `tick quotes`
        // COMMENT: we could split the order and order_detail insertion into two, see the implementation of this method
        String query = "INSERT INTO `order` (order_id, customer_id, order_datetime, pickup_datetime, status, comment) VALUES (?, ?, ?, ?, ?, ?)";
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
                
                return ps;
            }, keyHolder);
            if (numRows == 1) {
                Number key = keyHolder.getKey();
                if (key == null) {
                    // This should never happen, but just to be sure...
                    throw new Exception("Could not created order, ID error, contact administrator");
                }
                int orderId = key.intValue();
                for (OrderDetail orderDetail : order.getDetails()){
                    if (!this.addOrderDetails(orderId, orderDetail)) {
                        // COMMENT: you should handle SQL transactions correctly here: if one of order detail inserts
                        // fails, the whole transaction should be rolled back. I.e., in one order_detail insert fails,
                        // all previous order detail objects and the order object should not be inserted either
                        throw new Exception("Could not add order details for product " + orderDetail.getProductId());
                    }
                }
                return orderId;
            } else {
                throw new Exception("Could not add new Order");
            }
        } catch (Exception e) {
            throw new Exception("Could not add new Order: " + e.getMessage());
        }

    }

    /**
     * Add OrderDetails to Database
     * @param orderId ID of the parent order
     * @param orderDetail OrderDetails object
     * @return true when order_details correctly inserted, false otherwise
     */
    private boolean addOrderDetails(int orderId, OrderDetail orderDetail) {
        String query = "INSERT INTO `order_detail` (order_id, product_id, size, price) VALUES (?, ?, ?, ?)";
        int insertedRowCount = jdbcTemplate.update(query, orderId, orderDetail.getProductId(),
                orderDetail.getSize(), orderDetail.getPrice());
        return insertedRowCount == 1;
    }

}
