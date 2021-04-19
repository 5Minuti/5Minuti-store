package no.five.min.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;

/**
 *
 * @author Stigus
 */
@Data
@Entity(name="customers")
public class Customer {
    @Id
    @NotNull
    @GeneratedValue
    private Integer id;
    @NotBlank
    private String name;
    private String number;
    @Email
    @NotNull
    private String email;
}
