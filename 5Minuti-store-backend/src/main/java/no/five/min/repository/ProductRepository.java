/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package no.five.min.repository;

import no.five.min.entity.Order;
import no.five.min.entity.OrderDetail;
import no.five.min.entity.Product;
import no.five.min.rowmapper.ProductRowMapper;
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
public class ProductRepository {

    private final JdbcTemplate jdbcTemplate;
    // COMMENT: IDE suggests that productRowMapper could be final.
    private RowMapper<Product> productRowMapper = new ProductRowMapper();

    @Autowired
    public ProductRepository(JdbcTemplate jdbcTemplate) {
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

}
