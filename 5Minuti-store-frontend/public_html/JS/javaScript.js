




// COMMENT: add comments to functions - what do they do?
// COMMENT: perhaps this should be called "tryLogin"? Because that's what it is.
function getToken() {
    // COMMENT: the localhost:8080 should not be hard-coded in many places. Rather, set it to a constant, perhaps
    // one .js file as a config, and don't add it to git. something like config.js, and there you set
    // var API_URL = "http://localhost:8080";
    // Then here you can use:
    // var loginUrl = API_URL + "/authenticate";
    var loginurl = "http://localhost:8080/authenticate"
    var xhr = new XMLHttpRequest();
    var userElement = document.getElementById("username").value;
    var passwordElement = document.getElementById("password").value;

    xhr.open("POST", loginurl, true);
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
            // COMMENT: here you have a logic bug - you try to ASSIGN a value to .status (instead of comparing it)!
        } else if(XMLHttpRequest.status = 401) {
            alert("wrong username or password")
        } else {
            alert("Could not login");
        }
    })
    
}

// COMMENT: this is not used
function XHRErrorHandler(event) {
    alert(event)
}


// COMMENT: maybe think about moving all API call functions to a separate file, to have a bit of structure in the Javascript?
// Otherwise there will be many functions
function addProduct (){

    
    let form = document.forms["addProductForm"];

    let fd = new FormData(form);

    let data = {};

    for (let [key, prop] of fd) {
      data[key] = prop;
    }

    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/product/add");
    xhr.setRequestHeader('Content-Type', 'application/json',);
//    jwtoken = localStorage.getItem('token');
//    console.log(localStorage.getItem('token'));
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
     
   xhr.send(JSON.stringify(data)); 
       xhr.addEventListener('load', function () {
        var responseObject = this.response;
        console.log(responseObject);
        if (XMLHttpRequest.status = 401) {
            alert("You are Unauthorized to make this action " + XMLHttpRequest.status)
        
        } else if (XMLHttpRequest.status = 200){
            alert("Product was sucessfully added")
         } else  {
            alert("something wrong happened" + XMLHttpRequest.status);
        }
    })
}



function loadProductsMenu() {
   
    fetch("http://localhost:8080/product/list").then(function (response) {
        
        return response.json();

    })
            .then(function (product) {
               
                
                if (Array.isArray(product)) {
                    for (var i = 0; i < product.length; i++) {
                        var newProduct = product[i];
                        
                        showProductMenu(newProduct);
                        
                    }
                }

            });
}



function showProductMenu(product) {

   
    
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
    // You should somehow pass the edit/delete flag in another way.
    if( document.URL.includes("editMenu.html") ) {
    showDeleteProductButton(newProduct);
    } else if ( document.URL.includes("menu.html")){
        showAddToCartButton(newProduct,productName,priceSmall,priceMedium,priceLarge);
    }
    
}

function showAddToCartButton(newProduct,productName,priceSmall,priceMedium,priceLarge){
    var addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Add to cart";
    addToCartButton.className = "addToCartButton";
    addToCartButton.onclick = function() {addProductToShoppingCart(productName,priceSmall,priceMedium,priceLarge)};
    newProduct.appendChild(addToCartButton);
}


function showDeleteProductButton(newProduct){
    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.id = "deleteButton";
    deleteButton.innerText = "Delete";
    deleteButton.style.display = "block";
    newProduct.appendChild(deleteButton); 
}


function addProductToShoppingCart(productName,priceSmall,priceMedium,priceLarge){
   var title = productName.innerText;
   var small = priceSmall.innerText;
   var medium = priceMedium.innerText;
   var large = priceLarge.innerText;
    
   var newCartItem = document.createElement("div");
   newCartItem.className = "flex-container";
   newCartItem.id = "flex-container" ;
   
   var ItemName = document.createElement("span");
   ItemName.className = "flex-title";
   ItemName.innerText = title;
   newCartItem.appendChild(ItemName);
     
   var selectSize = document.createElement("select");
   selectSize.className = "flex-size";
   // COMMENT: you can't add several HTML elements with the same ID!
   selectSize.id = "selectSize" ;
   selectSize.onchange = function(){selectValue(price,small,medium,large)    
   };
   newCartItem.appendChild(selectSize);
   // COMMENT: This could be refactored to a function, f.ex,  addSizeOptions(selectbox, ["Small", "Medium", "Large"]])
   var smallOption = document.createElement("option");
   smallOption.innerText = "Small";
   smallOption.value = "Small";
   selectSize.appendChild(smallOption);
   
   var mediumOption = document.createElement("option");
   mediumOption.innerText = "Medium";
   mediumOption.value = "Medium";
   selectSize.appendChild(mediumOption);
   
   var largeOption = document.createElement("option");
   largeOption.innerText = "Large";
   largeOption.value = "Large";
   selectSize.appendChild(largeOption);

   var price = document.createElement("div");
   price.id = "flex-price";
   price.innerText = "select size";
   price.className = ("flex-price");
   newCartItem.appendChild(price);
   
   //updateProductPrice(price,smallOption,mediumOption,largeOption, small,medium,large);
   //console.log(large);
   //findPrice();
   
   var removeFromShoppingCartButton = document.createElement("button");
   removeFromShoppingCartButton.className = "flex-removeButton";
   removeFromShoppingCartButton.onclick = function(){removeShoppingCartItem() 
   };
   newCartItem.appendChild(removeFromShoppingCartButton);
   
   var trashButton = document.createElement("i");
   trashButton.className = "fa fa-trash";
   removeFromShoppingCartButton.appendChild(trashButton);
   
   var cartTable = document.getElementById("cart-items");
   cartTable.appendChild(newCartItem);
   console.log(newCartItem);

}


//selects value from shopping cart 
function selectValue(price,small,medium,large) {
    
 
    var selectedValue = document.getElementById("selectSize").value;
    console.log(selectedValue);

   
    if (selectedValue === "Small"){
        price.innerText = small;
    }
    else if (selectedValue === "Medium"){
        price.innerText = medium;
    }
    else if (selectedValue === "Large"){
        price.innerText = large;
    }

 
CalculateItemsValue();
    
}

function CalculateItemsValue() {
    var total = 0;
    var total_items = 1;
    for (i=1; i<=total_items; i++) {
         
        var itemID = document.getElementById("flex-price");
        if (typeof itemID === 'undefined' || itemID === null) {
            //alert("No such item - " + "flex-price"+i);
        } else {
            total = total + parseInt(itemID.value) * parseInt(itemID.getAttribute("data-price"));
        }
         
    }
    document.getElementById("totalPrice").innerHTML = total ;
    console.log(itemID);
     
}
function removeShoppingCartItem(){
    var selectedItem = document.getElementById("flex-container");
    selectedItem.parentNode.removeChild(selectedItem);
    console.log("item removed");
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

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
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

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
