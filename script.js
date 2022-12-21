// VAURKORG

const productCart = document.querySelector(".bx-cart");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".bx-x");

productCart.addEventListener("click", cartWithProducts);
closeCart.addEventListener("click", cartWithProducts);
let hiddenCart = true;

function cartWithProducts() {
        if(hiddenCart === true){
            cart.classList.remove("hide"); // tar bort hide klassen, men varukorg syns i DOM
            console.log("funkar");
            hiddenCart = false;
        } else {
            cart.classList.add("hide"); // gör att varukorg inte syns i DOM
            hiddenCart = true;
        }

};