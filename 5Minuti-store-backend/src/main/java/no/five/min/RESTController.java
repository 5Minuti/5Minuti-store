package no.five.min;

import java.io.IOException;
import no.five.min.entity.OrderDetail;
import no.five.min.repository.OrderDetailRepository;
import no.five.min.repository.OrderRepository;
import no.five.min.repository.ProductRepository;
import no.five.min.entity.Order;
import no.five.min.entity.Product;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import no.five.min.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

/**
 *
 * @author Stigus
 */
@CrossOrigin
@RestController
public class RESTController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public RESTController(ProductRepository restRepository,
            OrderRepository orderRepository,
            OrderDetailRepository orderDetailRepository,
            CustomerRepository customerRepository) {
        this.productRepository = restRepository;
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.customerRepository = customerRepository;
    }
    
    //Lists all the products that aren't set as deleted
    @RequestMapping(value = "/product/list", method = RequestMethod.GET)
    public List<Product> listProducts() {
        return productRepository.findByDeletedFalse();
    }
    
    //Lists all products including deleted ones
    @RequestMapping(value = "/product/listall", method = RequestMethod.GET)
    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/product/add", method = RequestMethod.POST)
    public ResponseEntity<String> addProduct(@Valid @RequestBody Product product) {
        System.out.println("post request recived");
        try {
            productRepository.save(product);
            return new ResponseEntity<String>(String.valueOf(product.getId()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = "/image/add", method = RequestMethod.POST)
    public ResponseEntity<String> addImage(@RequestParam("id") String id, @RequestParam("image") MultipartFile multipartFile) throws IOException {

        try {
            String uploadDir = "product-photos/";
            String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
            String fileName = id + "." + extension;
            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/product/delete", method = RequestMethod.PUT)
    public ResponseEntity<String> deleteProduct(@Valid @RequestBody int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        Product product = optionalProduct.get();
        product.setDeleted(true);
        try {
            productRepository.save(product);
            return new ResponseEntity<String>(String.valueOf(product.getId()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @CrossOrigin
    @RequestMapping(value = "/order/list", method = RequestMethod.GET)
    public List<Order> listOrders() {
        return orderRepository.findAll();
    }
    
    @RequestMapping(value = "/order/changestatus", method = RequestMethod.PUT)
    public ResponseEntity<String> changeOrderStatus(@Valid @RequestParam int id, String status) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        Order order = optionalOrder.get();
       // if (status == "Recived" || status == "Prepearing" || status == "Ready"
       //         || status == "Completed" || status == "Canceled"){
        order.setStatus(status);
       // }else{}
        try {
            orderRepository.save(order);
            return new ResponseEntity<String>(String.valueOf(order.getId()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    
    @CrossOrigin
    @RequestMapping(value = "/order/add", method = RequestMethod.POST)
    // COMMENT: when one submits and empty request (without object in the body, you get back an ugly message which
    // exposes class names: not good from security perspective (and not professional):
    // "message": "Required request body is missing: public org.springframework.http.ResponseEntity<java.lang.String>
    // com.example.RESTController.addOrder(com.example.Order)"
    public ResponseEntity<String> addOrder(@Valid @RequestBody Order order) {
        // TODO - need to receive customer info also somehow!
        // TODO - need to find out how products will be passed. Currently they are not set
        System.out.println("post request received");
        try{
            // COMMENT: spellchecker could be nice :) No problem for debug messages, but it should right for the customer
            // COMMENT: Perhaps the status should be "received", not "preparing"?
            order.setStatus("Recived");
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            order.setOrderDateTime(timestamp);
            orderRepository.save(order);
//          This will happen automatically  customerRepository.save(order.getCustomer());
            for (OrderDetail d : order.getDetails()) {
                // The order was not set because it was not persisted in the DB when the details object was created
              Optional<Product> optionalProduct = productRepository.findById(d.getProduct().getId());
              if (optionalProduct.isPresent()) {
                  // If the product Id would be wrong, the order saving would crash and we would not get this far
                  // Therefore there is no need for an "else" branch
                  Product product = optionalProduct.get();
                  d.setOrder(order);
                  d.setProduct(product);
                  orderDetailRepository.save(d);
              }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    

    
}
