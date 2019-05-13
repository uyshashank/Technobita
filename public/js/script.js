var cart = [];
var checkLoggedStatus = document.cookie.split('loggedIn=')[1].split(';')[0];
var addToCartBtnCarousel = document.getElementById("addToCartBtnCarousel");
var addToCartBtnMedium = document.getElementById("addToCartBtnMedium");
var eCiRp;
(function () {
    var locationNotSplited, location, product_name, exist;

    locationNotSplited = window.location.href;
    location = locationNotSplited.split('find/')[1];
    if (location != undefined) {
        product_name = location.split('/')[1];
        exist = check(product_name);

        if (exist == true) { //product exist
            addToCartBtnCarousel.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
            addToCartBtnMedium.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
        } else if (exist == false) {
            addToCartBtnCarousel.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
            addToCartBtnMedium.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
        }
    }
}());

function validate() {
    if (checkLoggedStatus == 'false') {
        window.location.href = "/login";
    } else {
        addToCart();
    }
}

function checkOutValidation() {
    var status = document.cookie.split('cart=')[1].split(';')[0];
    var loginStatus = document.cookie.split('loggedIn=')[1].split(';')[0];

    var warningPlaceOrder = document.getElementById('warningPlaceOrder');
    if (status == 0) {
        warningPlaceOrder.innerHTML = '<i><h4 class="text-center">Sorry, your <i class="fas fa-cart-arrow-down text-warning"></i> is empty! </h4></i>';
    } else {
        if (loginStatus === 'false') {
            warningPlaceOrder.innerHTML = '<i><h4 class="text-center">Please <a href="/login">Login</a> or <a href="/signup">Signup</a> first!</h4></i>'

        } else {
            window.location.href = "/checkout";
            var x = grandTotal.innerText;
            var y = 2 * x + 90;
            document.cookie = "x302skk39d=e3d3" + y + "z3d334";
        }

    }
}

function addToCart() {
    var location = window.location.href.split('find/')[1];
    var brand_name = location.split('/')[0];
    var product_name = location.split('/')[1];
    var existance;
    var status = document.cookie.split('cart=')[1].split(';')[0];

    if (status == 0) {
        cart.push("brand_name=" + brand_name + ",product_name=" + product_name);
        document.cookie = "cart=" + cart + ";path=/";
        addToCartBtnCarousel.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
        addToCartBtnMedium.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
    } else {
        existance = check(product_name);
        if (existance == true) {
            alert("Product already Added to Cart!");
        } else {
            var cartCookie = document.cookie.split('cart=')[1];
            cart.push(cartCookie + "::brand_name=" + brand_name + ",product_name=" + product_name);
            document.cookie = "cart=" + cart + ";path=/";
            addToCartBtnCarousel.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
            addToCartBtnMedium.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
        }
    }
}


function check(product_name) {
    var cookie = document.cookie.split('cart=')[1].split('::');
    var newArr = [],
        item = 0;
    for (var i = 0; i < cookie.length; i++) {
        newArr.push(cookie[i].split(',product_name=')[1]);
    }
    for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] === product_name) {
            item++;
            return true;
        }
    }
    if (item == newArr.length) {
        return false;
    }
}

function deleteItem(item) {
    var nodeNumber = item.attributes.node.nodeValue; //@which node
    var itemCard = document.querySelectorAll('.item-card'); //@nodeNumber item-card
    var priceElement = item.previousElementSibling.innerText; //span element
    var price = priceElement.split('₹')[1].trim(); //taking out the price
    var subtotal = document.getElementById('subtotal');
    var gst = document.getElementById('gst');
    var grandTotal = document.getElementById('grandTotal');

    // Devaring the card
    itemCard[nodeNumber].style.display = "none"; //hiding the devared item-card

    // Updating account summary
    subtotal.innerText = parseInt(subtotal.innerText) - parseInt(price);
    gst.innerText = parseInt(subtotal.innerText) / 100 * 18;
    grandTotal.innerText = parseInt(subtotal.innerText) + parseInt(gst.innerText);

    updateCookie(nodeNumber);
}

function updateCookie(nodeNumber) {
    var cookie = document.cookie.split('cart=')[1];
    var newCookie = [];
    var splitCookie = cookie.split('::');

    if (splitCookie.length === 1)
        splitCookie.splice(0, splitCookie.length);
    else
        splitCookie.splice(nodeNumber, 1);

    for (var i = 0; i < splitCookie.length; i++) {
        if (i === splitCookie.length - 1)
            newCookie.push(splitCookie[i]);
        else
            newCookie.push(splitCookie[i] + '::');
    }
    newCookie = newCookie.join('');
    if (newCookie.length === 0)
        document.cookie = "cart=0" + ";path=/";
    else
        document.cookie = "cart=" + newCookie + ";path=/";
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function editFeature(element) {    
    var title = element.offsetParent.children[0].children[0].innerText; //  Fetching inner text of the feature 
    var iconElement = element.children[0];
    var offsetParentChild = element.offsetParent.children[0];
    var editedText;

    if (iconElement.classList.contains('fa-check')) {
        editedText = offsetParentChild.children[0].value;
        offsetParentChild.removeChild(offsetParentChild.childNodes[0]);
        offsetParentChild.innerHTML = '<span class="input-group-text featureTitle" style="width:120px;">' + capitalize(editedText) + '</span>';
        iconElement.classList.remove('fa-check');
        iconElement.classList.add('fa-pencil-alt');
    } else {
        // Hiding the uneditable-span and adding the new text field
        offsetParentChild.removeChild(offsetParentChild.childNodes[0]);
        offsetParentChild.innerHTML = "<input class='bg-white input-group-text featureTitle' type='text' value='" + title + "' autofocus>";

        // Removing the edit icon and adding check icon
        iconElement.classList.remove('fa-pencil-alt');
        iconElement.classList.add('fa-check');
    }
}
function deleteFeature(element){
    let offsetParentParent = element.offsetParent.parentNode;  //parent - col-md-6 
    let offsetParent = element.offsetParent; // input-group - complete field { "key" : "value" }      
    offsetParentParent.removeChild(offsetParent);       
}
function addField(id){    
    let megaTitle = document.getElementById(id);
    let length = megaTitle.length;   

    let newField = document.createElement('div');
    newField.classList.add('row');
    newField.innerText ="HIiasdfasdf";
    megaTitle.appendChild = newField;

    // console.log(megaTitle);
    console.dir(megaTitle); 
    console.dir(newField); 
    // megaTitle.children[length].innerHTML = '<div class="row"> <div class="col-md-6"> <div class="input-group"> <div class="input-group-prepend"> <span class="input-group-text featureTitle" style="width:120px;">Price</span> </div><div class="input-group-prepend"> <span class="input-group-text featureTitle" style="width:30px;">₹</span> </div><input type="text" name="price" class="form-control"> <div class="input-group-append"> <span class="input-group-text"> <a href="#" onclick="editFeature(this);"><i class="fas fa-pencil-alt"></i></a> </span> </div><div class="input-group-append"> <span class="input-group-text"> <a href="#" onclick="deleteFeature(this);"><i class="fas fa-trash-alt"></i></a> </span> </div></div></div></div>';
}