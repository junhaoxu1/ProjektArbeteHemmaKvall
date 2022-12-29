// const containerEl = document.querySelector(".container");
// const totalCostEl = document.getElementsByClassName("totalItemCost");
// const totalPriceEl = document.querySelector(".total-price");

// let sum = 0;
// let showCost = () => {
//     if (totalCostEl) {
//         for (let i = 0; i < totalCostEl.length; i++) {
//             sum += parseInt(totalCostEl[i].innerHTML)
//         }}
//         totalPriceEl.innerText = "Total: " + sum
//         sum = 0;
// }
// let checkOutData = JSON.parse(localStorage.getItem('data'));

// checkOutData.forEach(singleItem => {

// let checkOutColumn = document.createElement("div");
//     checkOutColumn.classList.add("col");

// let checkOutRow = document.createElement("div");
//     checkOutRow.classList.add("rows");
//     checkOutColumn.appendChild(checkOutRow);

// let checkOutDetails = document.createElement("ul");
//     checkOutDetails.classList.add("checkOutList");

// let checkOutName = document.createElement("li");
//     checkOutName.classList.add("checkOutName");

// let checkOutPrice = document.createElement("li");
//     checkOutPrice.classList.add("checkOutPrice");

// let checkOutImage = document.createElement("img");
//     checkOutImage.classList.add("checkOutImage");

// let currentAmountItems = document.createElement("li");
//     currentAmountItems.classList.add("currentAmount");
//     currentAmountItems.value = 0;

// let totalItemPrice = document.createElement("li");
//     totalItemPrice.classList.add("totalItemCost");

// let increaseQuantity = document.createElement("button");
//     increaseQuantity.classList.add("increase-quantity");
//     increaseQuantity.value = 1;
//     increaseQuantity.innerText = "+1";

// let decreaseQuantity = document.createElement("button");
//     decreaseQuantity.classList.add("decrease-quantity");
//     decreaseQuantity.value = 1;
//     decreaseQuantity.innerText = "-1";

// let removeCartItem = document.createElement("i");
//     removeCartItem.classList.add("bx", "bxs-trash-alt", "cart-remove");


//     containerEl.appendChild(checkOutColumn);
//     checkOutColumn.appendChild(checkOutRow);
//     containerEl.appendChild(checkOutDetails);

//     checkOutDetails.appendChild(checkOutName);
//     checkOutDetails.appendChild(checkOutPrice);
//     checkOutDetails.appendChild(checkOutImage);

//         containerEl.appendChild(checkOutDetails);
//             checkOutRow.appendChild(checkOutDetails);
//             checkOutDetails.appendChild(checkOutImage); 

//             checkOutDetails.appendChild(checkOutName);
//             checkOutDetails.appendChild(increaseQuantity);
//             checkOutDetails.appendChild(decreaseQuantity);
//             checkOutDetails.appendChild(removeCartItem);
//             checkOutDetails.appendChild(currentAmountItems);
//             checkOutDetails.appendChild(totalItemPrice);

//             currentAmountItems.value++;

//             checkOutImage.src = `https://bortakvall.se${singleItem['thumbnail']}`
//             checkOutName.innerText = `${productDetails.name}`
//             currentAmountItems.innerText = `Quantity: ${singleItem['quantity']}`;
//             totalItemPrice.innerText = `${singleItem['price']} SEK`
//             totalItemPrice.innerText = `${singleItem['price'] * currentAmountItems.value} SEK`
//             showCost();

//             removeCartItem.addEventListener("click", () => {
//                 checkOutDetails.remove();
//                 showCost();
//                 currentAmountItems.value = 0;
//             }); 

//             increaseQuantity.addEventListener("click", () => {
//                 currentAmountItems.value++;
//                 currentAmountItems.innerText = "Quantity: " + currentAmountItems.value;
//                 totalItemPrice.innerText = `${singleItem['price'] * currentAmountItems.value} SEK`
//                 showCost();
                
//             })
    
//             decreaseQuantity.addEventListener("click", () => {
//                 currentAmountItems.value--;
//                 currentAmountItems.innerText = "Quantity: " + currentAmountItems.value;
//                 totalItemPrice.innerText = `${singleItem['price'] * currentAmountItems.value} SEK`
//                 showCost();
    
//                 if(currentAmountItems.value === 0) {
//                     checkOutDetails.remove();
//                 }
//             })
//     })


// let id = singleData['id'];
// let storageProducts = JSON.parse(localStorage.getItem('data'));
// let checkOut = storageProducts.filter(data => data.id !== id );
// localStorage.setItem('data', JSON.stringify(checkOut));

// let checkOut = [];

//             if(localStorage.getItem('name')) {
//                 checkOut = JSON.parse(localStorage.getItem('name'));
//             }

//             checkOut.push({'name' : productDetails.name});

//             localStorage.setItem('name', JSON.stringify(checkOut))


fetch('https://www.bortakvall.se/api/products')
.then(function(response){
   return response.json();
})
.then(function(data){
   localStorage.setItem("products", JSON.stringify(data));
   if(!localStorage.getItem("cart")){
      localStorage.setItem("cart", "[]");
   }
});

let products = JSON.parse(localStorage.getItem("data"));
let cart = JSON.parse(localStorage.getItem("cart"));

function addItemToCart(productId){
    let product = products.find(function(item){
        console.log(products)
       return item.id == productId;
    });
  
    if(cart.length == 0){
       cart.push(product);
    }else{
       let res = cart.find(element => element.id == productId);
       if(res === undefined){
          cart.push(product);
       }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
 }
 // adding the product with id=1 to the cart.
 
 function removeItemFromCart(productId){
    let tempCart = cart.filter(item => item.id != productId);
    localStorage.setItem("cart", JSON.stringify(tempCart));
 }
