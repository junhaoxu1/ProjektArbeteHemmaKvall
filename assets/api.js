const getProducts = async () => {
    const response = await fetch('https://www.bortakvall.se/api/products');
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return data["data"];
}

const confirmBuy = async (data) => {
    try {
      
      const response = await fetch('http://localhost:3000/orders', 
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log(data)

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
  
      const jsonResponse = await response.json();
      if (jsonResponse.status === 'success') {
        window.alert(`TACK för din order, ditt ordernummer är: ${jsonResponse.data.id}`);
      }
    
      console.log(response)
      return jsonResponse;
      
    } catch (err) {
      console.log("Something went wrong")
      console.log(err)
      console.log(data)
    }
  };