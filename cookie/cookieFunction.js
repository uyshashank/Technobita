const fs = require('fs');

var allcookies = {};
const path = "./db/users.json";

function cookieHandler(req, res) {

    var statusCookie = req.get('Cookie'); //Checking existence of all cookies

    if (statusCookie === undefined || null) {
        res.setHeader('Set-Cookie', ["loggedIn=false;" , "user=null", "cart=0"]); //setting up initial cookies
        allcookies.loggedIn = "false";
    } else {        
        var cookies = req.get('Cookie').split(';');
        var cookieLength = cookies.length;
        for (var i = 0; i < cookieLength; i++) {
            if (cookies[i].trim().split('=')[0] === 'loggedIn')
                allcookies.loggedIn = cookies[i].trim().split('=')[1];
            else if (cookies[i].trim().split('=')[0] === 'user')
                allcookies.user = cookies[i].trim().split('=')[1];
            else if (cookies[i].trim().split('=')[0] === 'cart')
                allcookies.cart = cookies[i].trim().split('cart=')[1];            
        }
    }
    return allcookies.loggedIn;
}

function user() {
    var email = allcookies.user;
    var users = [];

    users = JSON.parse(fs.readFileSync(path));
    for (var i = 0; i < users.length; i++) {
        if (email === users[i].email) {
            allcookies.userName = users[i].fname;
            return allcookies.userName;
        }
    }
}

function logoutUser(req, res) {
    var cookies = req.get('Cookie'); //Checking existence of all cookies
    if (cookies === undefined) {
        allcookies.loggedIn = "false";
    } else {
        res.cookie("loggedIn", "false");
        res.cookie("user", "null");
    }
}

function cartItems() {    
    var allcookiesCartValue = allcookies.cart;    
    var items = [];    

    if (allcookiesCartValue == 0 || undefined || null ) {            
        return 'null';
    } else {                
        var splitOne = allcookies.cart.split('::');              
        
        for (var i = 0; i < splitOne.length; i++) {
            items.push({
                title: splitOne[i].split(',')[0].split('=')[1],
                body: splitOne[i].split(',')[1].split('=')[1]
            });
        }     //end of for   
        return items;
    }
    
}
module.exports = {
    cookieHandler,
    user,
    logoutUser,
    cartItems
}