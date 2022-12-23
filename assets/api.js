const getProducts = async () => {
    const response = await fetch('https://www.bortakvall.se/api/products');
    const data = await response.json();
    console.log(data)


    return data["data"];
}