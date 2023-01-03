const productBoxEl = document.querySelector(".product-box");
const shopContentEl = document.querySelector(".shop-content");
const productImageEl = document.querySelector("#productImage");
const currentProductsEl = document.querySelector(".antal-produkter-in-storage")
const totalProductsEl = document.querySelector(".antal-produkter")

const cartBoxEl = document.querySelector(".cart-box")
const productCart = document.querySelector(".bx-cart");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".bx-x");
const checkOutButtonEl = document.querySelector('#checkOutButton')

const hideDescription = document.querySelector(".hide");

const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
const descriptionDataEl = document.querySelector(".descriptionData");

// Popup
const titleEl = document.querySelector('.title')
const popUpImageEl = document.querySelector("#popUpImage");
const popOverlayEl = document.querySelector('#popOverlay');

const totalPriceEl = document.querySelector(".total-price");
const totalCostEl = document.getElementsByClassName("totalItemCost");

let currentProducts = document.createElement("div");
    currentProducts.classList.add("productshows")
    currentProductsEl.appendChild(currentProducts);

let totalProducts = document.createElement("div");
    totalProducts.classList.add("productshows");
    totalProductsEl.appendChild(totalProducts);

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

        let addBxCart = document.createElement("button"); // skapar i = symbol för kundvagn
        addBxCart.classList.add("bx", "bx-cart", "add-cart"); // lägger till 3 klasser i i (styling i css)
        newData.appendChild(addBxCart); // DIV + i med klasser

        let inStock = singleData['stock_status'];
        let stockQuantity = singleData['stock_quantity'];
        
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
            increaseQuantity.innerText = "+";

        let decreaseQuantity = document.createElement("button");
            decreaseQuantity.classList.add("decrease-quantity");
            decreaseQuantity.value = 1;
            decreaseQuantity.innerText = "-";

        if(inStock == 'outofstock') {
            addBxCart.setAttribute('disabled', 'disabled');
            currentProducts.innerHTML = data.length - inStock.length + " av " + data.length + " produkter finns i lager"
        }

        totalProducts.innerHTML = "Visar " + data.length + " produkter"

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
            stockQuantity--;

            cartImage.src = `https://bortakvall.se${singleData['images']['large']}`;
            productName.innerText = `${singleData['name']}`;
            currentAmountItems.innerText = "Antal: " + currentAmountItems.value;
            totalItemPrice.innerText = `${singleData['price']} SEK`
            totalItemPrice.innerText = `${singleData['price'] * currentAmountItems.value} SEK`
            
                if(stockQuantity == 0) {
                    addBxCart.setAttribute('disabled', 'disabled');
                    increaseQuantity.setAttribute('disabled', 'disabled');
                    alert("Out of stock!")
                }

            call();
            addLocalProduct();
        });

        removeCartItem.addEventListener("click", (e) => {
            cartDetails.remove();
            currentAmountItems.value = 0;
            stockQuantity = singleData['stock_quantity'];
            addBxCart.removeAttribute('disabled')
            increaseQuantity.removeAttribute('disabled')
            call();
            removeLocalProduct();
        }); 

        increaseQuantity.addEventListener("click", () => {
            currentAmountItems.value++;
            currentAmountItems.innerText = "Antal: " + currentAmountItems.value;
            totalItemPrice.innerText = `${singleData['price'] * currentAmountItems.value} SEK`
            stockQuantity--;

            if(stockQuantity == 0) {
                addBxCart.setAttribute('disabled', 'disabled');
                increaseQuantity.setAttribute('disabled', 'disabled');
                alert("Out of stock!")
            }

            addLocalProduct()
            call();
        })

        decreaseQuantity.addEventListener("click", () => {
            currentAmountItems.value--;
            currentAmountItems.innerText = "Antal: " + currentAmountItems.value;
            totalItemPrice.innerText = `${singleData['price'] * currentAmountItems.value} SEK`
            stockQuantity++;

            addLocalProduct()
            call();

            if(stockQuantity > 0) {
                addBxCart.removeAttribute('disabled')
                increaseQuantity.removeAttribute('disabled')
            }

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

        checkOutButtonEl.addEventListener('click', () => {
            
        })

        function getLocal() {
            let products = JSON.parse(localStorage.getItem('data')) || [];
            return products;
        }

        function setLocal(localData) {
            localStorage.setItem('data', JSON.stringify(localData))
        }

        function addLocalProduct() {
            let isProductInCart = false;
            const products = getLocal();

            products.forEach(function(product) {
                if(product.id === singleData['id']) {
                    let index = products.findIndex((n => n.id == product.id))
                    products[index].quantity = currentAmountItems.value;
                    products[index].price = singleData['price'] * products[index].quantity;
                    setLocal(products);
                    isProductInCart = true;
                    if (product.quantity === 0) {
                        removeLocalProduct();
                    }
                };  
            });
            if(!isProductInCart) {
                products.push({
                    'id' : singleData['id'], 
                    'name' : singleData['name'], 
                    'price' : singleData['price'] * currentAmountItems.value, 
                    'thumbnail' : singleData['images']['thumbnail'],
                    'quantity' : currentAmountItems.value
                })
                setLocal(products);
            }
        }

        function removeLocalProduct() {
        let id = singleData['id'];
        let storageProducts = JSON.parse(localStorage.getItem('data'));
        let products = storageProducts.filter(data => data.id !== id );
        localStorage.setItem('data', JSON.stringify(products));
        };
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
        totalPriceEl.innerText = "Total Summa: " + sum + " SEK"
        sum = 0;
}

// Sortera produktnamn
const sortProducts = (sortAlternative) => {
    // hämtar produkter från API
    getProducts().then(data => {
    
    switch (sortAlternative) {
        case "2":
            // namnsortering
            data.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "3":
            // lägsta pris sortering
            data.sort((a, b) => a.price - b.price);
            break;
        case "4":
            data.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }
    });
}

const sortSelectEl = document.querySelector("#sort");

sortSelectEl.addEventListener("change", () => {
    shopContentEl.innerHTML = "";

    const sortOption = sortSelectEl.value;
    sortProducts(sortOption);
});