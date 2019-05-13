const fs = require('fs');
const cookieFunction = require('../cookie/cookieFunction');

const brandPageHandler = (req, res) => {
    var brand_name = req.params.brand_name;
    var pathToBrand = "db/products/" + brand_name;
    var pathToBrands = "db/products";
    var allBrands = [],allBrandsLower=[];
    var products = [];
    var jsonFile = [];    
    var jsonFilePath = [];
    var imgFile = []; 
    
    // Checking cookie  
    var loggedIn = cookieFunction.cookieHandler(req,res);
    var userName = cookieFunction.user();   

    // Fetching all brands which exist in db
    allBrands = fs.readdirSync(pathToBrands);
    
    // Capitalizing brand names
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Decapitalize
    function decapitalize(string) {
        return string.toLowerCase();
    }

    for (var i = 0; i < allBrands.length; i++) {
        allBrands[i] = capitalize(allBrands[i]);
    }

    for(var i=0;i< allBrands.length; i++){
        allBrandsLower[i] = decapitalize(allBrands[i]); 
    }

    products = fs.readdirSync(pathToBrand);
    brand_name = capitalize(brand_name);
    for (var i = 0; i < products.length; i++) {
        jsonFilePath.push(pathToBrand + "/" + products[i] + "/" + products[i] + ".json");
        imgFile.push("/db/products/" + brand_name.toLowerCase() + "/" + products[i] + "/" + "images/1.jpg");
    }
    
    for (var i = 0; i < jsonFilePath.length; i++) {
        jsonFile[i] = JSON.parse(fs.readFileSync(jsonFilePath[i]));
    }
    res.render('brand', {
        allBrandsLower,
        allBrands,
        jsonFilePath,
        imgFile,
        brand_name,
        jsonFile,
        products,
        loggedIn,
        userName
    });
}

module.exports = {
    brandPageHandler
}