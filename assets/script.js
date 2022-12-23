const productBoxEl = document.querySelector(".product-box");
const shopContentEl = document.querySelector(".shop-content");
const productImageEl = document.querySelector("#productImage");

const cartBoxEl = document.querySelector(".cart-box")
const productCart = document.querySelector(".bx-cart");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".bx-x");

const hideDescription = document.querySelector(".hide");

const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
const descriptionDataEl = document.querySelector(".descriptionData")

// Popup
const titleEl = document.querySelector('.title')
const popUpImageEl = document.querySelector("#popUpImage");
const popOverlayEl = document.querySelector('#popOverlay');


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
        
        
        addBxCart.addEventListener("click", () => {
            let cartDetails = document.createElement("div");
            cartDetails.classList.add("detail-box")
            let productName = document.createElement("div");
            productName.classList.add("cart-product-title");
            let cartPrice = document.createElement("div");
            cartPrice.classList.add("cart-price")
            let cartImage = document.createElement("img")
            cartImage.classList.add("addCartImage")

            cartBoxEl.appendChild(cartImage); 
            cartBoxEl.appendChild(productName);
            cartBoxEl.appendChild(cartPrice);

            cartImage.height = 100;
            cartImage.width = 100;

            cartImage.src = `https://bortakvall.se${singleData['images']['large']}`;
            productName.innerText = `${singleData['name']}`
            cartPrice.innerText = `${singleData['price']} SEK`

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



