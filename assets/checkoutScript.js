function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    // Kollar om kassa inte är tom 
    if (cart && cart.length > 0) {
     
      let productQuantities = new Map();
  
     
  for (let i = 0; i < cart.length; i++) {
    let product = cart[i];
    let productName = product['name'];
    let productPrice = product['price'];
    let productImage = product['image'];
    let productQuantity = product['quantity'];
  
  
    let productElement = document.createElement('div');
    productElement.classList.add("product-box")
    productElement.innerHTML = `
      <img src="${productImage}" alt="${productName}" class="product-image">
      <h3 class="product-name">${productName}</h3>
      <p class="product-price">${productPrice}</p>
      <p class="product-quantity">Quantity: ${productQuantity}</p>
    `;

    document.querySelector('.checkout-content').appendChild(productElement);
  }
  
    
      productQuantities.forEach((quantity, name) => {
       
        let productElement = document.createElement('div');
        productElement.innerHTML = `
          <img src="${productImage}" alt="${productName}" class="product-image">
          <h3 class="product-name">${productName}</h3>
          <p class="product-price">${productPrice}</p>
          <p class="product-quantity">Quantity: ${quantity}</p>
        `;
        document.querySelector('.checkout-content').appendChild(productElement);
      });
    } else {
      let emptyCartMessage = document.createElement('p');
      emptyCartMessage.innerText = 'Din kassa är nu tom';
      document.querySelector('.checkout-content').appendChild(emptyCartMessage);
    }
  }
  
  
  window.addEventListener('load', () => {
    displayCart();
  });
  
  const clearCartButton = document.querySelector('#clear-cart');
  clearCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
  
    document.querySelector('.checkout-content').innerHTML = '';
  
    let emptyCartMessage = document.createElement('p');
    emptyCartMessage.innerText = 'Din kassa är nu tom';
    document.querySelector('.checkout-content').appendChild(emptyCartMessage);
  });
  
  
  //kod för form och kontakt med API
  

    // Hämtar formData
    const form = document.querySelector('form');


    form.addEventListener('submit', event => {
      event.preventDefault();
    
      
      const formData = new FormData(form);
    
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        formData.append('products[]', JSON.stringify(product));
      }
    
    
      fetch('https://www.bortakvall.se/api/orders', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          console.log("ok");
          return response.json();
        } else {
          console.log("not ok")
          throw new Error('Det uppstod ett problem med din order');
        }
      })
      .then(data => {
        alert(`Tack för din order! Ditt ordernummer är: ${data.orderNumber}.`);
    
        localStorage.removeItem('cart');
        form.reset();
      })
      .catch(error => {
   
        alert(error.message);
      });
    });