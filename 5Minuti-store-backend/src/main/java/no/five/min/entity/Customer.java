package no.five.min.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;


@Data
@Entity(name="customers")
public class Customer {
    @Id
    @NotNull
    @GeneratedValue
    private Integer id;
    @NotBlank
    private String name;
    @NotBlank
    private String number;
    @Email
    @NotNull
    private String email;
}
