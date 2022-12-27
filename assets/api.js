const fetchCandyList = async () => {
    const res = await fetch("https://www.bortakvall.se/api/products");

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data["data"];
};
const getProducts = async () => {
    const response = await fetch('https://www.bortakvall.se/api/products');
    const data = await response.json();
    console.log(data)


    return data["data"];
}