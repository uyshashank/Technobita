const fs = require('fs');
const cookieFunction = require('../cookie/cookieFunction');
let admin = false;

const homePageHandler = (req, res) => {
    var path = "db/";
    var todaysDeals = JSON.parse(fs.readFileSync(path + 'todaysdeals.json'));
    var latest = JSON.parse(fs.readFileSync(path + 'latest.json'));
    var recommended = JSON.parse(fs.readFileSync(path + 'recommended.json'));

    // Checking cookie
    var loggedIn = cookieFunction.cookieHandler(req, res);
    var userName = cookieFunction.user();

    if (userName == "Shashank") {
        admin = true;
    }

    res.render('home', {
        todaysDeals,
        latest,
        recommended,
        loggedIn,
        userName,
        admin
    });
}

module.exports = {
    homePageHandler
}