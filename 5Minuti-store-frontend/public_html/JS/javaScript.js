
function loadNavBar(adminMode = false){
    var ul = document.createElement('ul');
    
    var li = document.createElement('li');
    ul.appendChild(li);
    
    var aboutUs = document.createElement('a');
    aboutUs.innerText = "About Us";
    aboutUs.href =  "aboutUs.html";
    li.appendChild(aboutUs);
    
    var contact = document.createElement('a');
    contact.innerText = "Contact";
    contact.href = "contact.html";
    li.appendChild(contact);
   
    var menu = document.createElement('a');
    menu.innerText = "Menu";
    menu.href = "menu.html";
    li.appendChild(menu);
    
    var home = document.createElement('a');
    home.innerText = "Home";
    home.href = "../index.html";
    li.appendChild(home);
    

    var admin;
    if (adminMode) {
        admin = loadNavBarAdmin();
        li.appendChild(admin);
    }
    
    var navBar = document.getElementById('navBar');
    navBar.appendChild(ul);
    
}

function loadNavBarAdmin(){
    var li = document.createElement('li');
    li.className = "adminNavBar"; 
     
    var addProduct = document.createElement('a');
    addProduct.style.borderRight = "1px solid black";
    addProduct.innerText = "Add Product";
    addProduct.href = "addProduct.html";
    li.appendChild(addProduct);
       
    var editMenu = document.createElement('a');
    editMenu.innerText = "Edit Menu";
    editMenu.href = "editMenu.html";
    li.appendChild(editMenu);
    
    var orders = document.createElement('a');
    orders.innerText = "Orders";
    orders.href = "orders.html";
    li.appendChild(orders)
    
    return li;

}



// Default size of products when they get added to cart
var DEFAULT_SIZE = "Medium";
    // COMMENT: the localhost:8080 should not be hard-coded in many places. Rather, set it to a constant, perhaps
    // one .js file as a config, and don't add it to git. something like config.js, and there you set
    // var API_URL = "http://localhost:8080";
    // Then here you can use:
    // var loginUrl = API_URL + "/authenticate";
    var API_URL = "http://localhost:8080";
    var loginUrl = API_URL + "/authenticate";
    var addProductUrl = API_URL + "/product/add";
    var listProductsUrl = API_URL + "/product/list"; //Lists all the products that aren't set as deleted
    var addOrderUrl = API_URL + "/order/add";
    var deleteProductUrl = API_URL + "/product/delete";
    var listOrderUrl = API_URL + "/order/list";
    var changeOrderStatusUrl = API_URL + "/order/changestatus";
    var listAllOrdersUrl = API_URL + "/product/listall"; //Lists all products including deleted ones
    var addImageUrl = API_URL + "/image/add";


// COMMENT: perhaps this should be called "tryLogin"? Because that's what it is.

// sends login request to backend with a post request if the info is correct
// a jwt will be returned and saved into local storage
// if the info is not correct or something went wrong alerts will inform the user
function getToken() {
    // COMMENT: the localhost:8080 should not be hard-coded in many places. Rather, set it to a constant, perhaps
    // one .js file as a config, and don't add it to git. something like config.js, and there you set
    // var API_URL = "http://localhost:8080";
    // Then here you can use:
    // var loginUrl = API_URL + "/authenticate";
    var loginurl = "http://localhost:8080/authenticate";
    var xhr = new XMLHttpRequest();
    var userElement = document.getElementById("username").value;
    var passwordElement = document.getElementById("password").value;

    xhr.open("POST", loginUrl, true);
    xhr.onerror = () => {
        alert("A network error occured");
    };
    xhr.ontimeout = () => {
        alert("Connection timed out");
    };
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    var jsonstring = JSON.stringify({ username: userElement, password: passwordElement });
//    console.log(jsonstring);
    
    xhr.send(jsonstring);
    
    xhr.addEventListener('load', function () {
        var responseObject = JSON.parse(this.response);
//        console.log(responseObject);
        if (responseObject.token) {
            var token = responseObject.token;
//            console.log("token recived");
            localStorage.setItem('token', token);
            window.location.href = "orders.html";
           
        } else if(xhr.status === 401) {
            alert("wrong username or password");
        } else {
            alert("Could not login");
        }
    });
    
}


// COMMENT: maybe think about moving all API call functions to a separate file, to have a bit of structure in the Javascript?
// Otherwise there will be many functions
//takes data from the addProductsForm and makes a json from it
// when the button is pressed the data will be sent to the backend with
// the dat that has been input and finally it shows the frontend a alert 
// based on the response from the server
function addProduct() {


    let form = document.forms["addProductForm"];

    let fd = new FormData(form);

    let data = {};

    for (let [key, prop] of fd) {
        data[key] = prop;
    }

    //   console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", addProductUrl);
    xhr.onerror = () => {
        alert("A network error occured")
    };
    xhr.ontimeout = () => {
        alert("Connection timed out")
    };
    xhr.setRequestHeader('Content-Type', 'application/json', );
//    jwtoken = localStorage.getItem('token');
//    console.log(localStorage.getItem('token'));
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', function () {
        var response = this.response
        var responseObject = JSON.parse(response);
        console.log(response);
        if (xhr.status == 401) {
            alert("You are Unauthorized to make this action ")

        } else if (xhr.status == 200) {
            addImage(response);
        } else if (xhr.status == 400) {
            alert(JSON.stringify(Object.values(responseObject)[0]))
        } else {
            alert("something wrong happened");
        }
    })
}

//using code from https://stackoverflow.com/questions/38561578/xmlhttprequest-sending-image-file
function addImage(name){
    var formdata = new FormData();
    var image = document.getElementById("img").value;
    formdata.append('img', Blob, name);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', addImageUrl);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xhr.send(formdata);
    xhr.addEventListener('load', function () {
        var response = this.response
        var responseObject = JSON.parse(response);
        console.log(response);
        if (xhr.status == 401) {
            alert("You are Unauthorized to make this action ")

        } else if (xhr.status == 200) {
            alert("Product was sucessfully added")
        } else if (xhr.status == 400) {
            alert(JSON.stringify(Object.values(responseObject)[0]))
        } else {
            alert("something wrong happened");
        }
    })
}

function loadOrderList() {
    var token = localStorage.getItem('token');
    let h = new Headers();
    
    console.log(token);
    h.append('Authorization', 'Bearer ' + token)

    fetch(listOrderUrl, {
        method: 'GET',
        headers: h
    }).then(function (response) {
        
        return response.json();

    })
            .then(function (order) {
               
                
                if (Array.isArray(order)) {
                    for (var i = 0; i < order.length; i++) {
                        var newGridItemOrders = order[i];
                        
                        
                        showOrderList(newGridItemOrders);
                        
                    }
                }
                 
            });
    
            
}

function showOrderList(order){
    console.log("orders go here" + order);
}


function loadProductsMenu(editMode = false) {
    // COMMENT: You use two different ways to communicate with API. Do you know why you use each approach?
    fetch(listProductsUrl).then(function (response) {
        
        return response.json();

    })
            .then(function (product) {
               
                
                if (Array.isArray(product)) {
                    for (var i = 0; i < product.length; i++) {
                        var newGridItem = product[i];
                        
                        showProductMenu(newGridItem, editMode);
                        
                        
                    }
                }
                 
            });
            
}



function showProductMenu(product, editMode) {

    var newGridItem = document.createElement("div");
    newGridItem.className = "grid-item";
    
    var productId = product.productid;
    console.log(productId);
        
    var productName = document.createElement("p");
    productName.innerText = product.productname;
    productName.className = "productName";
    newGridItem.appendChild(productName);
   
    
    
    var imagePlaceHolder = document.createElement("p");
    imagePlaceHolder.innerText = "image goes here";
    imagePlaceHolder.className = "imgPlaceHolder";
    newGridItem.appendChild(imagePlaceHolder);
    
    var detailsPanel = document.createElement("details");
    detailsPanel.className = "Details";
    newGridItem.appendChild(detailsPanel);
   
    var productSummary = document.createElement("summary");
    productSummary.className = "productSummary";
    productSummary.innerText = "Info";
    detailsPanel.appendChild(productSummary);
    
    var productDescription = document.createElement("p");
    productDescription.className = "productInfo";
    productDescription.innerText = product.description;
    detailsPanel.appendChild(productDescription);   
    
    var priceList = document.createElement("ul");
    priceList.className = "priceList";
    detailsPanel.appendChild(priceList);
    
    var priceSmall = document.createElement("li");
    priceSmall.innerText = "Small: " + product.smallprice + " kr";
    priceSmall.className = "smallPrice";
    priceList.appendChild(priceSmall);  
           
    var priceMedium = document.createElement("li");
    priceMedium.innerText = "Medium: " + product.mediumprice + " kr";
    priceMedium.className = "mediumPrice";
    priceList.appendChild(priceMedium);
    
    var priceLarge = document.createElement("li");
    priceLarge.innerText = "Large: " + product.largeprice + " kr";
    priceLarge.className = "largePrice";
    priceList.appendChild(priceLarge);
    
    var table = document.getElementById("grid-container");
    table.appendChild(newGridItem);
    
    
    var button;
    if (editMode) {
        button = showDeleteProductButton(newGridItem);
    } else {
        button = showAddToCartButton(product);
    }
    newGridItem.appendChild(button);
    

}

function showAddToCartButton(product){
    var addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to cart";
    addToCartButton.className = "addToCartButton";
    addToCartButton.onclick = function() {addProductToShoppingCart(product)};
    return addToCartButton;
}


function showDeleteProductButton(product){
    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.innerText = "Delete";
    
  
    deleteButton.onclick = function(){deleteMenuProduct(product)};
    
    return deleteButton;
}

function deleteMenuProduct(productId){
   
    console.log(productId);
    
    
    fetch(deleteProductUrl + productId ,{
        method: "PUT"
    }).then (function(response){
        console.log("response: ", response);
        if(response.status === 200){
            window.location.reload();
        } else {
            return response.text();
        }
    });
    
    
    
    
}

var itemsInCart = []; // Here we will store all the products in the shopping cart

function addProductToShoppingCart(product){
   var newCartItem = document.createElement("div");
   newCartItem.className = "flex-container";

   var itemName = document.createElement("span");
   itemName.className = "flex-title";
   itemName.innerText = product.productname;
   newCartItem.appendChild(itemName);
     
   var selectSize = document.createElement("select");
   selectSize.className = "flex-size";
   newCartItem.appendChild(selectSize);
   addSizeOptions(selectSize, ["Small", "Medium", "Large"], DEFAULT_SIZE);

   var price = document.createElement("div");
   price.innerText = product.mediumprice + " Kr";
   price.className = ("flex-price");
   newCartItem.appendChild(price);

   // Add one item to the cart (array)
   var cartItem = {
      product: product,
      size: DEFAULT_SIZE
   };
   itemsInCart.push(cartItem);

   selectSize.onchange = function () {
      selectValue(this.value, cartItem, price);
   };

   
   var removeFromShoppingCartButton = document.createElement("button");
   removeFromShoppingCartButton.className = "flex-removeButton";
   removeFromShoppingCartButton.onclick = function(){
       removeShoppingCartItem(newCartItem);
       updateCartTotals();
   };
   newCartItem.appendChild(removeFromShoppingCartButton);
   
   var trashButton = document.createElement("i");
   trashButton.className = "fa fa-trash";
   removeFromShoppingCartButton.appendChild(trashButton);
   
   var cartTable = document.getElementById("cart-items");
   cartTable.appendChild(newCartItem);
   

   updateCartTotals();

}


/**
 * Add an <option> element inside a size selector
 * @param {HTMLSelectElement} selectBox The select box where the options will be appended
 * @param {Array} sizeOptions Array with available size options
 * @param {string} selectedOption The option which is selected by default
 */
function addSizeOptions(selectBox, sizeOptions, selectedOption) {
    for (var i = 0; i < sizeOptions.length; ++i) {
        var size = sizeOptions[i];
        var option = document.createElement("option");
        option.innerText = size;
        if (size === selectedOption) {
            option.selected = true;
        }
        selectBox.appendChild(option);
    }
}

//selects value from shopping cart 
function selectValue(selectedSize, cartItem, priceNode) {

    console.log(selectedSize);
    var pricePropertyName = selectedSize.toLowerCase() + "price"; // This will be `smallPrice`, etc
    var selectedPrice = cartItem.product[pricePropertyName];
    priceNode.innerText = selectedPrice + " Kr";
    cartItem.size = selectedSize;

    updateCartTotals();
}


function updateCartTotals() {
    var total = 0;
    for (var i = 0; i < itemsInCart.length; ++i) {
        var product = itemsInCart[i].product;
        var selectedSize = itemsInCart[i].size;
        var pricePropertyName = selectedSize.toLowerCase() + "price"; // This will be `smallPrice`, etc
        var selectedPrice = product[pricePropertyName];
        total = total + selectedPrice;
    }
    document.getElementById("totalPrice").innerHTML = "Total: " + total +" Kr";
}

function removeShoppingCartItem(productNode, product) {
    productNode.remove();
   
   
   //TODO: FIGURE OUT THE SPLICE 
    
    itemsInCart.splice(index,1);
    var index = itemsInCart.indexOf(product);
    if (index > 0){
        console.log("item removed" + index);
    
    }
   
    updateCartTotals();
    console.log(itemsInCart);
}

function sendOrder(){
    
    var orderString = getOrder();
    
    var order = JSON.parse(orderString);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", addOrderUrl);
    xhr.onerror = () => {
        alert("A network error occured")
    };
    xhr.ontimeout = () => {
        alert("Connection timed out")
    };
    xhr.setRequestHeader('Content-Type', 'application/json',);
    
    xhr.send(JSON.stringify(order));
    xhr.addEventListener('load', function () {

        if (xhr.status == 200){
            alert("Order was sent sucessfully")
         } else if (xhr.status == 400) {
             alert(JSON.stringify(Object.values(responseObject)[0]))
         } else{
            alert("something wrong happened");
        }
    })
    
}


function getOrder(){

    let form = document.forms["contactInfoForm"];
    let fd = new FormData(form)
    let data = {};
    
    for (let [key, prop] of fd){
        data[key] = prop;
    }
    
    var order = new Object();
    var customer = new Object();
    var details = new Array();
    customer.name = data.fname + " " + data.lname;
    customer.number = data.phoneNumber;
    customer.email = data.eMail;
    order.customer = customer;
    order.pickupDateTime = "2021-04-26T10:00:00Z";
    order.comment = data.comments;
    
    //using code from https://stackoverflow.com/questions/18238173/javascript-loop-through-json-array as refrence
    for(var i = 0; i < itemsInCart.length; i++) {
    var obj = itemsInCart[i];
    var prod = new Object();
    var d = new Object();
    prod.id = obj.product.id;
    d.product = prod;
    d.size = obj.size;
    if (obj.size == "Small") {
        d.price = obj.product.smallprice;
    } else if (obj.size == "Medium"){
        d.price = obj.product.mediumprice;
    } else if (obj.size == "Large"){
        d.price = obj.product.mediumprice;
    }
    details.push(d);
    }
    
    order.details = details;
    console.log(order);
    
    return JSON.stringify(order);
    }

