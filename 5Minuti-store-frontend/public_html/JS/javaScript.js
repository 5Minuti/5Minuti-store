

var accounts = [
    {
        username: "5",
        password: "Minuti"
    },
    {
        username: "",
        password: ""
    },
];
function getInfo() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;


function getToken() {
    var loginurl = "http://localhost:8080/authenticate"
    var xhr = new XMLHttpRequest();
    var userElement = document.getElementById("username").value;
    var passwordElement = document.getElementById("password").value;


    for (i = 0; i < accounts.length; i++) {
        if (username === accounts[i].username && password === accounts[i].password) {

            showLoggedIn();

            return
        } else {
            document.getElementById("logInInfo").innerHTML = username + "'s username or password is incorrect. ";
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
        
        } else if(XMLHttpRequest.status = 401) {
            alert("wrong username or password")
        } else {
            alert("Could not login");
        }
    })
    
}

function XHRErrorHandler(event) {
    alert(event)
}


function addProduct() {


    let form = document.forms["addProductForm"];

    let fd = new FormData(form);

    let data = {};

    for (let [key, prop] of fd) {
        data[key] = prop;
    }

    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/product/add", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
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

function loadProductsEditMenu() {
   
    fetch("http://localhost:8080/product/list").then(function (response) {
        
        return response.json();

    })
            .then(function (product) {
               
                
                if (Array.isArray(product)) {
                    for (var i = 0; i < product.length; i++) {
                        var newProduct = product[i];
                        
                        showProductEditMenu(newProduct);
                        
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
    
    var smallPriceButton = document.createElement("button");
    smallPriceButton.innerText = "Add to cart";
    smallPriceButton.className = "priceButtons";
    priceList.appendChild(smallPriceButton);
           
    var priceMedium = document.createElement("li");
    priceMedium.innerText = "Medium: " + product.mediumprice + " kr";
    priceMedium.className = "mediumPrice";
    priceList.appendChild(priceMedium);
    
    var mediumPriceButton = document.createElement("button");
    mediumPriceButton.innerText = "Add to Cart";
    mediumPriceButton.className = "priceButtons";
    priceList.appendChild(mediumPriceButton);
        
    var priceLarge = document.createElement("li");
    priceLarge.innerText = "Large: " + product.largeprice + " kr";
    priceLarge.className = "largePrice";
    priceList.appendChild(priceLarge);
    
    var largePriceButton = document.createElement("button");
    largePriceButton.innerText = "Add to Cart";
    largePriceButton.className = "priceButtons";
    priceList.appendChild(largePriceButton);      
    
    var table = document.getElementById("grid-container");
    table.appendChild(newProduct);
    
    

}

function showProductEditMenu(product) {

   
    
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
    
    var smallPriceButton = document.createElement("button");
    smallPriceButton.innerText = "Add to cart";
    smallPriceButton.className = "priceButtons";
    priceList.appendChild(smallPriceButton);
           
    var priceMedium = document.createElement("li");
    priceMedium.innerText = "Medium: " + product.mediumprice + " kr";
    priceMedium.className = "mediumPrice";
    priceList.appendChild(priceMedium);
    
    var mediumPriceButton = document.createElement("button");
    mediumPriceButton.innerText = "Add to Cart";
    mediumPriceButton.className = "priceButtons";
    priceList.appendChild(mediumPriceButton);
        
    var priceLarge = document.createElement("li");
    priceLarge.innerText = "Large: " + product.largeprice + " kr";
    priceLarge.className = "largePrice";
    priceList.appendChild(priceLarge);
    
    var largePriceButton = document.createElement("button");
    largePriceButton.innerText = "Add to Cart";
    largePriceButton.className = "priceButtons";
    priceList.appendChild(largePriceButton);      
    
    var table = document.getElementById("grid-container");
    table.appendChild(newProduct);
    
    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.id = "deleteButton";
    deleteButton.innerText = "Delete";
    newProduct.appendChild(deleteButton);  
     
     
   console.log("product: " + product);
    

}


function deleteProduct(){
    console.log("productId: " + productid);
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