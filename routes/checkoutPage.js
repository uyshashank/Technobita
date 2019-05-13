const cookieFunction = require('../cookie/cookieFunction');

const checkout = (req, res) => {
    // Checking cookie // Copy to all code
    //Start
    var loggedIn = cookieFunction.cookieHandler(req, res);
    var userName = cookieFunction.user();
    //End

    res.render('checkout', {
        loggedIn,
        userName
    });
}
module.exports = {
    checkout
}