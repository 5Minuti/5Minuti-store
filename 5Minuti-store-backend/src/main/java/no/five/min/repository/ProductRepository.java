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
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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

@PersistenceContext
EntityManager em;

    // COMMENT: I suggest to split the repository in OrderRepository, ProductRepository etc. If you do so, perhaps
    // a good idea to create a separate folder, such as `repositories`
    // If you don't split the class, then method names should be changed. addProduct(), addOrder() etc
    public List<Product> findAll() {
        // COMMENT: probably you want to filter those with deleted == 0?
        return em.createNamedQuery(Product.FIND_ALL_PRODUCTS, Product.class).getResultList();
    }

//    public Integer add(Product product) throws Exception {
//
//    }

}
