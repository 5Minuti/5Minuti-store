/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function hideAllMenu(){
    document.getElementById('home').style.display ='none';
    document.getElementById('contact').style.display ='none';
    document.getElementById('logIn').style.display ='none';
    document.getElementById('menu').style.display ='none';
    document.getElementById('loggedIn').style.display ='none';
    
}

function showMenu(){
    hideAllMenu();
    document.getElementById('menu').style.display ='block';
}

function showContact(){
    hideAllMenu();
    document.getElementById('contact').style.display ='block';
}

function showHome(){
    hideAllMenu();
    document.getElementById('home').style.display ='block';
}

function showLogIn(){
    hideAllMenu();
    document.getElementById('logIn').style.display ='block';
}

function showLoggedIn(){
    hideAllMenu();
    document.getElementById('loggedIn').style.display = 'block';
}

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


    for (i=0; i< accounts.length; i++) {
        if(username=== accounts[i].username && password === accounts[i].password){

           showLoggedIn();

            return
        }
        else{
            document.getElementById("logInInfo").innerHTML = username + "'s username or password is incorrect. " ;


        }
    }

}


function addProduct (){
    var productName = document.getElementById('productName').value;
    var description = document.getElementById('description').value;
    var allergens = document.getElementById('allergens').value;
    var price = document.getElementById('price').value;

    var newItem1 = this.newProduct;
    newItem1 = document.createElement('form');
    newItem1.style.width = '30%';
    newItem1.style.textAlign = 'left';
    newItem1.style.marginLeft = '35%';
    newItem1.style.marginBottom = '1%';
    newItem1.style.lineHeight = '2';
    newItem1.style.border = 'box';
    newItem1.style.boxSizing = 'border-box';
    newItem1.style.padding = '5px';
    newItem1.innerHTML  = productName + "\n" + description + "\n" + allergens + "\n" + price;


    var newButton = document.createElement("button");
    newButton.innerHTML = "Add to Cart";
    newButton.addEventListener ("click", function() {
            showHome();
        });
    
    var item2 = document.getElementById("newProduct");
    item2.appendChild(newItem1);
    console.log(newItem1);
    console.log(item2);
    
    var item3 = document.getElementById("newButton")
    item3.appendChild(newButton);

    console.log(item3);

}
