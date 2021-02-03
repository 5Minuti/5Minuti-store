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