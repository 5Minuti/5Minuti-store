package no.five.min.entity;

import java.math.BigDecimal;

/**
 * @author Stigus
 */
public class OrderDetail {
    // COMMENT: orderDetailId and orderId are not necessary
    private int productId;
    private String size;
    private BigDecimal price;

    public OrderDetail(int productid, String size, BigDecimal price) {
        this.productId = productid;
        this.size = size;
        this.price = price;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
