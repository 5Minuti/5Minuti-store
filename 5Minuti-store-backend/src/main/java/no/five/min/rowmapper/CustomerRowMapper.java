package no.five.min.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.five.min.entity.Customer;
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
