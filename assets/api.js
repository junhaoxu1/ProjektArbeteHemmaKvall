const getProducts = async () => {
    const response = await fetch('https://www.bortakvall.se/api/products');
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return data["data"];
}

const confirmBuy = async (candy) => {
    const response = await fetch('https://www.bortakvall.se/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(candy)
    })

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    
    return await response.json()

}