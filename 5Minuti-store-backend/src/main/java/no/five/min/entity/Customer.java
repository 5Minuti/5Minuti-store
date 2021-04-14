package no.five.min.entity;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Stigus
 */
public class Customer {

    @NotNull
    private int customerid;
    @NotBlank
    private String name;

    private String number;
    @Email
    @NotNull
    private String email;

    public Customer(int customerid, String name, String number, String email) {
        this.customerid = customerid;
        this.name = name;
        this.number = number;
        this.email = email;
    }

    public int getCustomerid() {
        return customerid;
    }

    public void setCustomerid(int customerid) {
        this.customerid = customerid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
