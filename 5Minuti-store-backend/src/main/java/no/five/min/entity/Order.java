package no.five.min.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity(name="orders")
public class Order {
    @Id
    @GeneratedValue
    @NotNull
    private Integer id;
    @ManyToOne
    private Customer customer;
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss'Z'")
    private Date orderDateTime;
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss'Z'")
    private Date pickupDateTime;
    private String status;
    private String comment;
    @OneToMany(mappedBy = "order")
    private List<OrderDetail> details;
}
