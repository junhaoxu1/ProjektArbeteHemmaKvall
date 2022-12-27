const showImageEl = document.querySelector('#showImage');
const someDataEl = document.querySelector('#someData');
const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
const descriptionDataEl = document.querySelector('.descriptionData');
const popOverlayEl = document.querySelector('#popOverlay');
const titleEl = document.querySelector('.title')
const popUpImageEl = document.querySelector("#popUpImage");

    fetchCandyList().then(candy => {
        candy.forEach(singleCandy => {
            let newData = document.createElement("div");
            let candyName = document.createElement("h2");
                newData.classList.add("col");
                someDataEl.appendChild(newData);
                newData.appendChild(candyName);
                candyName.innerText = `${singleCandy['name']}`
    
            let candyImage = document.createElement("img");
                newData.appendChild(candyImage);
                candyImage.src = `https://bortakvall.se${singleCandy['images']['thumbnail']}`;
    
            let addPrice = document.createElement("h3");
                newData.appendChild(addPrice)
                addPrice.innerText = `${singleCandy['price']} KR`

            let addInfo = document.createElement("button");
                addInfo.setAttribute("data-pop-target", "#pop")
                newData.appendChild(addInfo)
                addInfo.innerText = "INNEHÅLL"

            let hideDescriptionTag = `${singleCandy['description']}`;
                addInfo.addEventListener("click", () => {
                const popWindow = document.querySelector(addInfo.dataset.popTarget)
                popUpImageEl.src = `https://bortakvall.se${singleCandy['images']['large']}`;
                descriptionDataEl.innerText = hideDescriptionTag.replace(tagRegExp, "");
                titleEl.innerText = `${singleCandy['name']}`
                openWindow(popWindow)
            });
        });
        
        const openWindow = popUp => {
            if (popUp == null) return
            popUp.classList.add('active')
            popOverlayEl.classList.add('active')
        }

        const closeWindow = popUp => {
            if (popUp == null) return
            popUp.classList.remove('active')
            popOverlayEl.classList.remove('active')
        }

        popOverlayEl.addEventListener('click', () => {
            const windows = document.querySelectorAll('.pop.active')
            windows.forEach(popUp => {
                closeWindow(popUp)
            })
        })
    });

const productBoxEl = document.querySelector(".product-box");
const shopContentEl = document.querySelector(".shop-content");
const productImageEl = document.querySelector("#productImage");

const cartBoxEl = document.querySelector(".cart-box")
const productCart = document.querySelector(".bx-cart");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".bx-x");

const hideDescription = document.querySelector(".hide");

const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
const descriptionDataEl = document.querySelector(".descriptionData");

// Popup
const titleEl = document.querySelector('.title')
const popUpImageEl = document.querySelector("#popUpImage");
const popOverlayEl = document.querySelector('#popOverlay');

const totalPriceEl = document.querySelector(".total-price");
const totalCostEl = document.getElementsByClassName("totalItemCost");

getProducts().then(data => {
    data.forEach(singleData => {
        let newData = document.createElement("div"); //DIV skapas
        newData.classList.add("product-box"); // lägger till klassen product-box

        let addNewData = document.createElement("h2"); // skapa h2
        addNewData.classList.add("product-title"); // lägger till klassen product-title


        let addImage = document.createElement("img"); // skapar img 
        addImage.classList.add("productImage"); // lägger till img klass productImage

        newData.appendChild(addImage); // i DIV lägg till barnet img
        addImage.src = `https://bortakvall.se${singleData['images']['thumbnail']}`; // själva bilden från API

        let addPrice = document.createElement("span"); // skapar span
        addPrice.classList.add("price"); // lägger till klassen price i span

        shopContentEl.appendChild(newData); // content för producter, lägger till DIV =newData
        newData.appendChild(addNewData); // DIV + barnet h2
        addNewData.innerText = `${singleData['name']}` // h2 innertext är produktnamn från API

        newData.appendChild(addPrice); // DiV + span med pris
        addPrice.innerText = `${singleData['price']} SEK` // span visar priset på produkt

        let addBxCart = document.createElement("i"); // skapar i = symbol för kundvagn
        addBxCart.classList.add("bx", "bx-cart", "add-cart"); // lägger till 3 klasser i i (styling i css)
        newData.appendChild(addBxCart); // DIV + i med klasser

        let cartDetails = document.createElement("div");
            cartDetails.classList.add("detail-box", "row");

        let productDetails = document.createElement("ul");
            productDetails.classList.add("productList");

        let productName = document.createElement("li");
            productName.classList.add("cart-title");

        let cartPrice = document.createElement("li");
            cartPrice.classList.add("cart-price");
        
        let cartImage = document.createElement("img");
            cartImage.classList.add("col-sm-3", "cart-img");

        let removeCartItem = document.createElement("i");
            removeCartItem.classList.add("bx", "bxs-trash-alt", "cart-remove");

        let currentAmountItems = document.createElement("li");
            currentAmountItems.classList.add("currentAmount");
            currentAmountItems.value = 0;

        let totalItemPrice = document.createElement("li");
            totalItemPrice.classList.add("totalItemCost");

        let increaseQuantity = document.createElement("button");
            increaseQuantity.classList.add("increase-quantity");
            increaseQuantity.value = 1;
            increaseQuantity.innerText = "+1";

        let decreaseQuantity = document.createElement("button");
            decreaseQuantity.classList.add("decrease-quantity");
            decreaseQuantity.value = 1;
            decreaseQuantity.innerText = "-1";
        
        addBxCart.addEventListener("click", () => {

            cartBoxEl.appendChild(cartDetails);
            cartDetails.appendChild(cartImage); 
            cartDetails.appendChild(productDetails);

            productDetails.appendChild(productName);
            productDetails.appendChild(cartPrice);
            productDetails.appendChild(increaseQuantity);
            productDetails.appendChild(decreaseQuantity);
            productDetails.appendChild(removeCartItem);
            productDetails.appendChild(currentAmountItems);
            productDetails.appendChild(totalItemPrice);

            currentAmountItems.value++;

            cartImage.src = `https://bortakvall.se${singleData['images']['large']}`;
            productName.innerText = `${singleData['name']}`;
            cartPrice.innerText = `${singleData['price']} SEK`;
            currentAmountItems.innerText = "Quantity: " + currentAmountItems.value;
            totalItemPrice.innerText = `${singleData['price']} SEK`
            totalItemPrice.innerText = `${singleData['price'] * currentAmountItems.value} SEK`
            call();

        });

        removeCartItem.addEventListener("click", (e) => {
            cartDetails.remove();
            call();
        }); 

        increaseQuantity.addEventListener("click", () => {
            currentAmountItems.value++;
            currentAmountItems.innerText = "Quantity: " + currentAmountItems.value;
            totalItemPrice.innerText = `${singleData['price'] * currentAmountItems.value} SEK`
            call();
        })

        decreaseQuantity.addEventListener("click", () => {
            currentAmountItems.value--;
            currentAmountItems.innerText = "Quantity: " + currentAmountItems.value;
            totalItemPrice.innerText = `${singleData['price'] * currentAmountItems.value} SEK`
            call();

            if(currentAmountItems.value === 0) {
                cartDetails.remove();
            }
        })

        // PopUp knapp
        let addInfoPopup = document.createElement("button");
        addInfoPopup.classList.add("popup-btn");
        newData.appendChild(addInfoPopup);
        addInfoPopup.setAttribute("data-pop-target", "#pop");
        newData.appendChild(addInfoPopup);
        addInfoPopup.innerText = "Läs mer"


        let hideDescriptionTag = `${singleData['description']}`;
        addInfoPopup.addEventListener("click", () => {
            const popWindow = document.querySelector(addInfoPopup.dataset.popTarget)
            popUpImageEl.src = `https://bortakvall.se${singleData['images']['large']}`;
            descriptionDataEl.innerText = hideDescriptionTag.replace(tagRegExp, "");
            descriptionDataEl.innerText += `${singleData['price']} SEK`
            titleEl.innerText = `${singleData['name']}`
            openWindow(popWindow)
        });

    });

    const openWindow = popUp => {
        if (popUp == null) return
        popUp.classList.add('active')
        popOverlayEl.classList.add('active')
    }

    const closeWindow = popUp => {
        if (popUp == null) return
        popUp.classList.remove('active')
        popOverlayEl.classList.remove('active')
    }

    popOverlayEl.addEventListener('click', () => {
        const windows = document.querySelectorAll('.pop.active')
        windows.forEach(popUp => {
            closeWindow(popUp)
        })
    })
});

// KUNGVAGN

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

let sum = 0;
let call = () => {
    if (totalCostEl) {
        for (let i = 0; i < totalCostEl.length; i++) {
            sum += parseInt(totalCostEl[i].innerHTML)
        }}
        totalPriceEl.innerText = "Total: " + sum
        sum = 0;
}


