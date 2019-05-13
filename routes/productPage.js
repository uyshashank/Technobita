const fs = require('fs');
const cookieFunction = require('../cookie/cookieFunction');

var productPageHandler = (req,res) => {
    var brand_name = req.params.brand_name;
    var product_name = req.params.product_name;
    var filePath = "db/products/" + brand_name + "/" + product_name + "/" + product_name + ".json";
    var imgPath = "public/db/products/" + brand_name + "/" + product_name + "/" + "images";
    var imgPathSlider = "../../db/products/" + brand_name + "/" + product_name + "/" + "images";
    var jsonFile = JSON.parse(fs.readFileSync(filePath));    
    var data = {
        brand_name,
        product_name,
        imgPathSlider,
        jsonFile                
    };

    // Checking Cookie
    var loggedIn = cookieFunction.cookieHandler(req,res);
    var userName = cookieFunction.user();    

    fs.readdir(imgPath, function (err, folders) {

        if (err) {
            throw err;
        } else {
            data.num_of_img = folders.length;
            res.render('proview', {
                data,
                loggedIn,
                userName
            });
        }
    });
}

module.exports = {    
    productPageHandler    
}