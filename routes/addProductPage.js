const cookieFunction = require('../cookie/cookieFunction');

const addProductPageHandler = (req, res) => {
    // Checking cookie
    let loggedIn = cookieFunction.cookieHandler(req, res);
    let userName = cookieFunction.user();    
    let admin = false;

    if (loggedIn == 'true' && userName == 'Shashank') {        
        admin = true;
        res.render('addProduct',{
            loggedIn,
            userName            
        })
    } else {        
        res.redirect('/');        
    }


}
module.exports = {
    addProductPageHandler
}