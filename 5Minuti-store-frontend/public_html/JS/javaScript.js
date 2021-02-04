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
    }

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