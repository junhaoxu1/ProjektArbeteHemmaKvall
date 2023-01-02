const getProducts = async () => {
    const response = await fetch('https://www.bortakvall.se/api/products');
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data["data"];
}