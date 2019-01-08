const express = require('express');
const app = express();

var port = process.env.PORT || 5000;
var host = '0.0.0.0';

var bodyParser = require('body-parser');

// SettingUp body-parser
app.use(bodyParser.urlencoded({ extended: true }));


// Custom modules
const homePage = require('./routes/homePage');
const productPage = require('./routes/productPage');
const brandPage = require('./routes/brandPage');
const loginPage = require('./routes/loginPage');
const signupPage = require('./routes/signupPage');
const logoutPage = require('./routes/logout');
const cartPage = require('./routes/cartPage');
const checkoutPage = require('./routes/checkoutPage');
const orderPlacedPage = require('./routes/orderPlacedPage');


// Setting Template Engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Setting Routes
app.get('/', homePage.homePageHandler);
app.get('/find/:brand_name/:product_name', productPage.productPageHandler);
app.get('/find/:brand_name', brandPage.brandPageHandler);
app.get('/login',loginPage.loginPageHandler);
app.get('/signup',signupPage.signupPageHandler);
app.get('/logout',logoutPage.logout);
app.get('/cart',cartPage.cart);
app.get('/checkout',checkoutPage.checkout);
app.get('/orderPlaced',orderPlacedPage.orderPlaced);

// Post requests
app.post('/auth',loginPage.authUser);
app.post('/createUser',signupPage.createUser);


app.listen(port,host, () => {
    console.log(`Server listening at port:${port}`);
});
