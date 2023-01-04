const containerEl = document.querySelector(".container");
const totalCostEl = document.getElementsByClassName("totalItemCost");
const totalPriceEl = document.querySelector(".total-price");

function getLocal() {
   let products = JSON.parse(localStorage.getItem('data')) || [];
   return products;
}

function setLocal(localData) {
   localStorage.setItem('data', JSON.stringify(localData))
}


const checkOutData = getLocal();

checkOutData.forEach(singleItem => {

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
    currentAmountItems.value = singleItem['quantity'];

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
               totalPriceEl.innerText = "Total Summa: " + sum + " SEK";
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
            totalItemPrice.innerText = `${singleItem['price']} SEK`
            showCost();

            removeCartItem.addEventListener("click", () => {
                checkOutColumn.remove();
                showCost();
                currentAmountItems.value = 0;
                removeLocalProduct();
            }); 
   
           function removeLocalProduct() {
           let id = singleItem['id'];
           let storageProducts = JSON.parse(localStorage.getItem('data'));
           let products = storageProducts.filter(data => data.id !== id );
           localStorage.setItem('data', JSON.stringify(products));
           };

           async function random() {
            const info = await confirmBuy();
            console.log(info)
          }
          random()
    });