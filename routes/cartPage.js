const fs = require('fs');
const cookieFunction = require('../cookie/cookieFunction');

const cart = (req, res) => {
    // Checking Cookie copy to all
    var loggedIn = cookieFunction.cookieHandler(req, res);
    var userName = cookieFunction.user();
    var cartItems = cookieFunction.cartItems();    
    var path = [],
        imgpath = [],
        jsonFile = [];
    if (cartItems != 'null') {
        for (var i = 0; i < cartItems.length; i++) {
            path.push("db/products/" + cartItems[i].title + "/" + cartItems[i].body + "/" + cartItems[i].body + ".json");
            imgpath.push("/db/products/" + cartItems[i].title + "/" + cartItems[i].body + "/images/1.jpg");
            jsonFile[i] = JSON.parse(fs.readFileSync(path[i]));
        }
        
        res.render('cart', {
            loggedIn,
            userName,
            jsonFile,
            imgpath,
            cartItems
        });
    }else{
        res.render('cart', {
            loggedIn,
            userName,
            cartItems                        
        });
    }
}
module.exports = {
    cart
}