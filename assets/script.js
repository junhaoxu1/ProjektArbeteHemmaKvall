const productBoxEl = document.querySelector(".product-box");
const shopContentEl = document.querySelector(".shop-content");
const productImageEl = document.querySelector("#productImage");

const productCart = document.querySelector(".bx-cart");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".bx-x");

const hideDescription = document.querySelector(".hide");

const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
const descriptionDataEl = document.querySelector("#descriptionData")
let clicked = true;



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

        let addInfoPopup = document.createElement("button");
        addInfoPopup.classList.add("popup");
        newData.appendChild(addInfoPopup);
        addInfoPopup.innerText = "Läs mer"



        addInfoPopup.addEventListener("click", function (e) {
            if (clicked) {
           
                let hideDescriptionTag = `${singleData['description']}`;
                newData.appendChild(descriptionDataEl);
                descriptionDataEl.innerText = hideDescriptionTag.replace(tagRegExp, "")
                descriptionDataEl.classList.remove("hide");
                clicked = false;
            } else {
                descriptionDataEl.classList.add("hide");
                clicked = true;
            }
        });

        
        /*
        let descriptionData = document.createElement("p");
        let hideDescriptionTag = `${singleData['description']}`

        newData.appendChild(descriptionData);
        descriptionData.innerText = hideDescriptionTag.replace(tagRegExp, "") */


    console.log(singleData['name']);

    });
});


// POPUP QUICK VIEW




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



