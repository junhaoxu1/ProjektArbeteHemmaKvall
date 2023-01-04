const containerEl = document.querySelector(".container");
const totalCostEl = document.getElementsByClassName("totalItemCost");
const totalPriceEl = document.querySelector(".total-price");

let fName = document.querySelector("#first-name");
let lName = document.querySelector("#last-name");
let mail = document.querySelector("#email");
let city = document.querySelector("#city");
let postCode = document.querySelector("#postal-code");
let phoneNumber = document.querySelector("#phone-nr");
let adress = document.querySelector("#address");
let orderTotal = document.querySelector("#ordertotal");


function getLocal() {
   let products = JSON.parse(localStorage.getItem('data') || []);
   return products;
}

function getLocalInfo() {
    let productInfo = JSON.parse(localStorage.getItem('itemInfo') || []);
    return productInfo;
}

function setLocal(localDataInfo) {
   localStorage.setItem('data', JSON.stringify(localDataInfo))
}

function setLocalInfo(localData) {
    localStorage.setItem('itemInfo', JSON.stringify(localData))
}

const checkOutData = getLocal();

const checkOutInfo = getLocalInfo();

checkOutInfo.forEach(singleItem => {

let checkOutColumn = document.createElement("div");
    checkOutColumn.classList.add("col");

let checkOutRow = document.createElement("div");
    checkOutRow.classList.add("rows");
    checkOutColumn.appendChild(checkOutRow);

let checkOutDetails = document.createElement("ul");
    checkOutDetails.classList.add("checkOutList");

let checkOutName = document.createElement("li");
    checkOutName.classList.add("checkOutName");

let checkOutPrice = document.createElement("li");
    checkOutPrice.classList.add("checkOutPrice");

let checkOutImage = document.createElement("img");
    checkOutImage.classList.add("checkOutImage");

let currentAmountItems = document.createElement("li");
    currentAmountItems.classList.add("currentAmount");
    currentAmountItems.value = singleItem['qty'];

let totalItemPrice = document.createElement("li");
    totalItemPrice.classList.add("totalItemCost");

let removeCartItem = document.createElement("i");
    removeCartItem.classList.add("bx", "bxs-trash-alt", "cart-remove");

    let sum = 0;
    let showCost = () => {
        if (totalCostEl) {
            for (let i = 0; i < totalCostEl.length; i++) {
                sum += parseInt(totalCostEl[i].innerHTML)
            }}
            if (sum > 0) {
               totalPriceEl.innerText = "Totalt: " + sum + " SEK";
               sum = 0;
            } else {
               totalPriceEl.innerText = "Din varukorg Är Tom";
            }
    }

    containerEl.appendChild(checkOutColumn);
    checkOutColumn.appendChild(checkOutRow);
    containerEl.appendChild(checkOutDetails);

    checkOutDetails.appendChild(checkOutName);
    checkOutDetails.appendChild(checkOutPrice);
    checkOutDetails.appendChild(checkOutImage);

        containerEl.appendChild(checkOutDetails);
            checkOutRow.appendChild(checkOutDetails);
            checkOutDetails.appendChild(checkOutImage); 

            checkOutDetails.appendChild(checkOutName);
            checkOutDetails.appendChild(removeCartItem);
            checkOutDetails.appendChild(currentAmountItems);
            checkOutDetails.appendChild(totalItemPrice);

            checkOutImage.src = `https://bortakvall.se${singleItem['thumbnail']}`
            checkOutName.innerText = `${singleItem.name}`
            currentAmountItems.innerText = "Antal: " + currentAmountItems.value;
            totalItemPrice.innerText = `${singleItem['item_total']} SEK`
            showCost();

            removeCartItem.addEventListener("click", () => {
                checkOutColumn.remove();
                showCost();
                currentAmountItems.value = 0;
                removeLocalProduct();
            }); 
   
            function removeLocalProduct() {
                let product_id = singleItem['product_id'];
                let storageProducts = JSON.parse(localStorage.getItem('data'));
                let storageProduct = JSON.parse(localStorage.getItem('itemInfo'));
                let products = storageProducts.filter(data => data.product_id !== product_id);
                let productInfo = storageProduct.filter(data => data.product_id != product_id);
                localStorage.setItem('data', JSON.stringify(products));
                localStorage.setItem('itemInfo', JSON.stringify(productInfo));
            };
    });

    const checkOutFormEl = document.querySelector("#checkout-form");

        let totalQuantity = 0;

        checkOutInfo.forEach(data => {
            totalQuantity += data.item_total
        })

        checkOutFormEl.addEventListener('submit', async (e) => {
            e.preventDefault();
    
                const customer =  {
                    "customer_first_name" : fName.value,
                    "customer_last_name" : lName.value,
                    "customer_address" : adress.value,
                    "customer_postcode" : postCode.value,
                    "customer_city" : city.value,
                   "customer_email" : mail.value,
                   "customer_phone" : phoneNumber.value,
                    "order_total" : totalQuantity,
                    "order_items" : checkOutInfo
                }   

                try {
                    console.log(await confirmBuy(customer))
                    localStorage.removeItem('itemInfo');
                    localStorage.removeItem('data');
                } catch (error) {
                    console.log(error)

                }
        })  