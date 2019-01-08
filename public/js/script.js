let cart = [];
let checkLoggedStatus = document.cookie.split('loggedIn=')[1].split(';')[0];
let addToCartBtnCarousel = document.getElementById("addToCartBtnCarousel");
let addToCartBtnMedium = document.getElementById("addToCartBtnMedium");
let eCiRp;
(function () {
    let location = window.location.href.split('find/')[1];
    let product_name = location.split('/')[1];

    let exist = check(product_name);

    if (exist == true) { //product exist
        addToCartBtnCarousel.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
        addToCartBtnMedium.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
    } else if (exist == false) {
        addToCartBtnCarousel.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
        addToCartBtnMedium.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
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
    let status = document.cookie.split('cart=')[1].split(';')[0];
    let loginStatus = document.cookie.split('loggedIn=')[1].split(';')[0];

    let warningPlaceOrder = document.getElementById('warningPlaceOrder');
    if (status == 0) {
        warningPlaceOrder.innerHTML = '<i><h4 class="text-center">Sorry, your <i class="fas fa-cart-arrow-down text-warning"></i> is empty! </h4></i>';
    } else {
        if (loginStatus === 'false') {
            warningPlaceOrder.innerHTML = '<i><h4 class="text-center">Please <a href="/login">Login</a> or <a href="/signup">Signup</a> first!</h4></i>'
                
        } else {
            window.location.href = "/checkout";
            let x = grandTotal.innerText;
            let y = 2 * x + 90;
            document.cookie = "x302skk39d=e3d3" + y + "z3d334";
        }

    }
}

function addToCart() {
    let location = window.location.href.split('find/')[1];
    let brand_name = location.split('/')[0];
    let product_name = location.split('/')[1];
    let existance;
    let status = document.cookie.split('cart=')[1].split(';')[0];

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
            let cartCookie = document.cookie.split('cart=')[1];
            cart.push(cartCookie + "::brand_name=" + brand_name + ",product_name=" + product_name);
            document.cookie = "cart=" + cart + ";path=/";
            addToCartBtnCarousel.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
            addToCartBtnMedium.innerHTML = "Added to Cart <i class='fas fa-check-circle'></i>";
        }
    }
}


function check(product_name) {
    let cookie = document.cookie.split('cart=')[1].split('::');
    let newArr = [],
        item = 0;
    for (let i = 0; i < cookie.length; i++) {
        newArr.push(cookie[i].split(',product_name=')[1]);
    }
    for (let i = 0; i < newArr.length; i++) {
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
    let nodeNumber = item.attributes.node.nodeValue; //@which node
    let itemCard = document.querySelectorAll('.item-card'); //@nodeNumber item-card
    let priceElement = item.previousElementSibling.innerText; //span element
    let price = priceElement.split('₹')[1].trim(); //taking out the price
    let subtotal = document.getElementById('subtotal');
    let gst = document.getElementById('gst');
    let grandTotal = document.getElementById('grandTotal');

    // Deleting the card
    itemCard[nodeNumber].style.display = "none"; //hiding the deleted item-card

    // Updating account summary
    subtotal.innerText = parseInt(subtotal.innerText) - parseInt(price);
    gst.innerText = parseInt(subtotal.innerText) / 100 * 18;
    grandTotal.innerText = parseInt(subtotal.innerText) + parseInt(gst.innerText);

    updateCookie(nodeNumber);
}

function updateCookie(nodeNumber) {
    let cookie = document.cookie.split('cart=')[1];
    let newCookie = [];
    let splitCookie = cookie.split('::');

    if (splitCookie.length === 1)
        splitCookie.splice(0, splitCookie.length);
    else
        splitCookie.splice(nodeNumber, 1);

    for (let i = 0; i < splitCookie.length; i++) {
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