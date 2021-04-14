
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
    var listProductsUrl = API_URL + "/product/list";
    var addOrderUrl = API_URL + "/order/add";


// COMMENT: perhaps this should be called "tryLogin"? Because that's what it is.

// sends login request to backend with a post request if the info is correct
// a jwt will be returned and saved into local storage
// if the info is not correct or something went wrong alerts will inform the user
function getToken() {

            
    var xhr = new XMLHttpRequest();
    var userElement = document.getElementById("username").value;
    var passwordElement = document.getElementById("password").value;

    xhr.open("POST", loginUrl, true);
    xhr.onerror = () => {
        alert("A network error occured")
    };
    xhr.ontimeout = () => {
        alert("Connection timed out")
    };
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    var jsonstring = JSON.stringify({ username: userElement, password: passwordElement });
//    console.log(jsonstring);
    
    xhr.send(jsonstring)
    
    xhr.addEventListener('load', function () {
        var responseObject = JSON.parse(this.response);
//        console.log(responseObject);
        if (responseObject.token) {
            token = responseObject.token;
//            console.log("token recived");
            localStorage.setItem('token', token);
            window.location.href = "LoggedIn.html";
        } else if(xhr.status == 401) {
            alert("wrong username or password")
        } else {
            alert("Could not login");
        }
    })
    
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
    xhr.open("POST", addProductUrl);
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
    fetch(listProductsUrl).then(function (response) {
        
        return response.json();

    })
            .then(function (product) {
               
                
                if (Array.isArray(product)) {
                    for (var i = 0; i < product.length; i++) {
                        var newProduct = product[i];
                        
                        showProductMenu(newProduct, editMode);
                        
                    }
                }

            });
}



function showProductMenu(product, editMode) {

   
    // COMMENT: is `newProduct` a good name for the variable? It is not a product, it is an HTML element, containing
    // the different texts and controls
    var newProduct = document.createElement("div");
    newProduct.className = "grid-item";
        
    var productName = document.createElement("p");
    productName.innerText = product.productname;
    productName.className = "productName";
    newProduct.appendChild(productName);
    
    var imagePlaceHolder = document.createElement("p");
    imagePlaceHolder.innerText = "image goes here";
    imagePlaceHolder.className = "imgPlaceHolder";
    newProduct.appendChild(imagePlaceHolder);
    
    var detailsPanel = document.createElement("details");
    detailsPanel.className = "Details";
    newProduct.appendChild(detailsPanel);
   
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
    table.appendChild(newProduct);

    // COMMENT: It is not good to make IFs based on the URL. What if you will change the URL later?
    // Here is an example how we can fix that - by introducing a parameter `editMode`
    var button;
    if (editMode) {
        button = showDeleteProductButton(newProduct);
    } else {
        button = showAddToCartButton(product);
    }
    newProduct.appendChild(button);

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

   // COMMENT: ItemName is not a good name. Variables should either be camelCaseNames or names_with_underscores
   // CapitalCamelCase is used for classes, components etc, not variables
   var ItemName = document.createElement("span");
   ItemName.className = "flex-title";
   ItemName.innerText = product.productname;
   newCartItem.appendChild(ItemName);
     
   var selectSize = document.createElement("select");
   selectSize.className = "flex-size";
   // COMMENT: you can't add several HTML elements with the same ID!
   // selectSize.id = "selectSize" ;
   newCartItem.appendChild(selectSize);
   // COMMENT: This could be refactored to a function, f.ex,  addSizeOptions(selectbox, ["Small", "Medium", "Large"]])
   // Here is how we do it:
   addSizeOptions(selectSize, ["Small", "Medium", "Large"], DEFAULT_SIZE);

   var price = document.createElement("div");
   price.id = "flex-price";
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
    document.getElementById("totalPrice").innerHTML = total + " Kr";
}
function removeShoppingCartItem(productNode) {
    productNode.remove();
    console.log("item removed");
    // COMMENT: you probably want to do something more here? Update total prices etc.
}

function updateProductPrice(price,selectedSize,smallOption,mediumOption,largeOption,small,medium,large){
    
   /*
  var options = document.getElementsByClassName('option')
  console.log(options.length);
         for (var i = 1; i < options.length; i++) {
        
       
   
    while(smallOption.selected === options[i].selected){
        price.innerText = small;
        console.log("small   :"+ small);
        
    }
    while (mediumOption.selected === options[i].selected ){
        price.innerText = medium;
        
    }
    while (largeOption.selected === options[i].selected){
        price.innerText = large;
        
    } 
    
    console.log(options[i].length);
}
    
 
 
 


 var size = document.getElementById("option");
 var selectedValue = size.options[size.selectedIndex].value;
    if (selectedValue == "smallOption")
   {
    console.log("displaying small: "+small);
   }
    
    

 console.log("selected Size =  :" + selectedSize);
 
          var sel = document.getElementsByClassName('flex-size');

 
 var opt = sel.options[sel.selectedIndex];
  console.log(opt);
 
switch(opt) {
  case "Small":
    price.innerText = small;
    break;
    
  case "Medium":
    price.innerText = medium;
    break;
    
    case "Large":
    price.innerText = large;
    break;
    
  default:
    price.innerText = medium;
}




  case "Small":
    price.innerText = small;
    console.log("small value: " + selectedValue );
    break;
    
  case "Medium":
    price.innerText = medium;
    console.log("medium value: " + selectedValue );
    break;
    
    case "Large":
    price.innerText = large;
    console.log("large value: " + selectedValue );
    break;
 */

}



































if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // COMMENT: This fails on all pages where btn-purchase element is not present
    // COMMENT: In general - you should check all the errors in the Javascript console
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotals()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotals()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotals()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotals()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// COMMENT: is this needed
// function updateCartTotal() {
//     var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//     var total = 0
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i]
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         var price = parseFloat(priceElement.innerText.replace('$', ''))
//         var quantity = quantityElement.value
//         total = total + (price * quantity)
//     }
//     total = Math.round(total * 100) / 100
//     document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
// }
