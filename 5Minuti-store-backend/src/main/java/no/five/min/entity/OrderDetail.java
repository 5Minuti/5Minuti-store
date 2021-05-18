package no.five.min.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity(name = "order_details")
public class OrderDetail {

    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private Product product;
    private String size;
    private BigDecimal price;

    @ManyToOne
    @JsonBackReference
    private Order order;
}
