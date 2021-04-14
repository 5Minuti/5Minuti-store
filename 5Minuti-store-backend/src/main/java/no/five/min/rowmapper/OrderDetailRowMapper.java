/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package no.five.min.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.five.min.entity.OrderDetail;

import org.springframework.jdbc.core.RowMapper;

/**
 * @author Stigus
 */
public class OrderDetailRowMapper implements RowMapper<OrderDetail> {

    // COMMENT: Default constructor is probably not necessary, it will be created anyway by Java
    public OrderDetailRowMapper() {
    }

    @Override
    public OrderDetail mapRow(ResultSet rs, int rowIndex) throws SQLException {
        return new OrderDetail(
                rs.getInt("productid"),
                rs.getString("size"),
                rs.getBigDecimal("price")
        );
    }
}
