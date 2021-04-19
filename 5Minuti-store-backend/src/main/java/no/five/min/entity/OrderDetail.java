package no.five.min.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity(name="order_details")
public class OrderDetail {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private Product product;
    private String size;
    private BigDecimal price;

    @ManyToOne
    private Order order;
}
