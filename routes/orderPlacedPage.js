const cookieFunction = require('../cookie/cookieFunction');

const orderPlaced = (req, res) => {
    // Checking cookie // Copy to all code
    //Start
    var loggedIn = cookieFunction.cookieHandler(req, res);
    var userName = cookieFunction.user();
    //End

    res.render('orderPlaced', {
        loggedIn,
        userName
    });
}
module.exports = {
    orderPlaced
}