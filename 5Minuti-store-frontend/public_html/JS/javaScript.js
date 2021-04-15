
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

    xhr.open("POST", loginurl, true);
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
            token = responseObject.token;
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
function addProduct (){

    
    let form = document.forms["addProductForm"];

    let fd = new FormData(form);

    let data = {};

    for (let [key, prop] of fd) {
      data[key] = prop;
    }

 //   console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/product/add");
    xhr.onerror = () => {
        alert("A network error occured")
    };
    xhr.ontimeout = () => {
        alert("Connection timed out")
    };
    xhr.setRequestHeader('Content-Type', 'application/json',);
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

        } else if (xhr.status == 200){
            alert("Product was sucessfully added with id: " + JSON.stringify(responseObject))
         } else if (xhr.status == 400) {
             alert(JSON.stringify(Object.values(responseObject)[0]))
         } else{
            alert("something wrong happened");
        }
    })
}



function loadProductsMenu(editMode = false) {
    // COMMENT: You use two different ways to communicate with API. Do you know why you use each approach?
    fetch("http://localhost:8080/product/list").then(function (response) {
        
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

   
    // COMMENT: is `newProduct` a good name for the variable? It is not a product, it is an HTML element, containing
    // the different texts and controls
    var newGridItem = document.createElement("div");
    newGridItem.className = "grid-item";
        
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

    // COMMENT: It is not good to make IFs based on the URL. What if you will change the URL later?
    // Here is an example how we can fix that - by introducing a parameter `editMode`
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


function showDeleteProductButton(){
    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    // COMMENT: again: multiple elements with same ID, not good
    // deleteButton.id = "deleteButton";
    deleteButton.innerText = "Delete";
    // COMMENT: This is probably not necessary?
    // deleteButton.style.display = "block";
    return deleteButton;
}

var itemsInCart = []; // Here we will store all the products in the shopping cart

function addProductToShoppingCart(product){
   // COMMENT: you should decide whether to use 3 or 4 spaces for indentation, and then use the same across all files
   var newCartItem = document.createElement("div");
   newCartItem.className = "flex-container";
   // COMMENT: Here the same error - you can't assign the same ID to multiple elements
   // COMMENT: an ID `flex-container` is anyway not a good ID, because it does not tell anything about the content of that element
   //newCartItem.id = "flex-container" ;

   // COMMENT: itemName is not a good name. Variables should either be camelCaseNames or names_with_underscores
   // CapitalCamelCase is used for classes, components etc, not variables
   var itemName = document.createElement("span");
   itemName.className = "flex-title";
   itemName.innerText = product.productname;
   newCartItem.appendChild(itemName);
     
   var selectSize = document.createElement("select");
   selectSize.className = "flex-size";
   // COMMENT: you can't add several HTML elements with the same ID!
   // selectSize.id = "selectSize" ;
   newCartItem.appendChild(selectSize);
   // COMMENT: This could be refactored to a function, f.ex,  addSizeOptions(selectbox, ["Small", "Medium", "Large"]])
   // Here is how we do it:
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

   //updateProductPrice(price,smallOption,mediumOption,largeOption, small,medium,large);
   //console.log(large);
   //findPrice();
   
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
   console.log(newCartItem);

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
    // COMMENT: her you could have a better way of finding the right price from the object. For example, by
    // changing the structure of the product object:
    // product = {
    //   name: "Cake",
    //   prices: {
    //     small: 10,
    //     medium: 11,
    //     large: 12
    //   }
    // }

    console.log(selectedSize);
    var pricePropertyName = selectedSize.toLowerCase() + "price"; // This will be `smallPrice`, etc
    var selectedPrice = cartItem.product[pricePropertyName];
    priceNode.innerText = selectedPrice + " Kr";
    cartItem.size = selectedSize;

    updateCartTotals();
}

// COMMENT: there is another function with almost the same name. Is that one needed?
function updateCartTotals() {
    var total = 0;
    // COMMENT: It is not a good idea to calculate totals based on some HTML elements. You should hold an array
    // of the items in the cart globally. Then modify that array where necessary, and calculate the totals from there
    // Her is how we could do it:

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
   
    // COMMENT: you probably want to do something more here? Update total prices etc.
    
    updateCartTotals();
    console.log(itemsInCart);
}

