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
        const response = await fetch('https://www.bortakvall.se/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)
    
        })
    
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    
        console.log(response);
        console.log(data);
    
        return await response.json();

    } catch (err) {
        console.log("SomeTingWong")
    }
    
}