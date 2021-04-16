/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package no.five.min;

import no.five.min.repository.OrderRepository;
import no.five.min.repository.ProductRepository;
import no.five.min.entity.Order;
import no.five.min.entity.Product;
import java.sql.Timestamp;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Stigus
 */
@CrossOrigin
@RestController
public class RESTController {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    
    @Autowired
    public RESTController(ProductRepository restRepository, OrderRepository orderRepository){
        this.productRepository = restRepository;
        this.orderRepository = orderRepository;
    }
    
    @RequestMapping(value = "/product/list")
    public List<Product> listProducts() {
        return productRepository.findAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/product/add", method = RequestMethod.POST)
    public ResponseEntity<String> addProduct(@Valid @RequestBody Product product) {
        System.out.println("post request recived");
        try {
            Integer productId = productRepository.add(product);
            return new ResponseEntity<>(productId.toString(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = "/order/list")
    public List<Order> listOrderss() {
        return orderRepository.findAll();
    }
    
    @CrossOrigin
    @RequestMapping(value = "/order/add", method = RequestMethod.POST)
    // COMMENT: when one submits and empty request (without object in the body, you get back an ugly message which
    // exposes class names: not good from security perspective (and not professional):
    // "message": "Required request body is missing: public org.springframework.http.ResponseEntity<java.lang.String>
    // com.example.RESTController.addOrder(com.example.Order)"
    public ResponseEntity<String> addOrder(@Valid @RequestBody Order order) {
        System.out.println("post request recived");
        try{
            // COMMENT: spellchecker could be nice :) No problem for debug messages, but it should right for the customer
            // COMMENT: Perhaps the status should be "received", not "preparing"?
            order.setStatus("Prepearing");
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            order.setOrderDateTime(timestamp);
            Integer orderId = orderRepository.add(order);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
}
