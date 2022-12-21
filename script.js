const productBoxEl = document.querySelector(".product-box");
const shopContentEL = document.querySelector(".shop-content");


const getProducts = async () => {
    const response = await fetch('https://www.bortakvall.se/api/products');
    const data = await response.json();
    console.log(data)


    return data;
}

getProducts()
    .then(data => {
        shopContentEL.innerHTML = 
        `<div class="product-box">
        <img src="https://bortakvall.se${data['data'][0]['images']['thumbnail']}"> 
        <h2 class="product-title"> ${data ['data'][0]['name']} </h2>
        <p class="price"> ${data ['data'][0]['price']} SEK </p> 
        <i class='bx bx-cart add-cart'></i> 
        </div>`;

       
    });