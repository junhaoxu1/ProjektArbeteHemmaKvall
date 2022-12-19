const fetchCandyList = async () => {
    const res = await fetch("https://www.bortakvall.se/api/products")
    const data = await res.json()

    console.log(data)
    return data
}

fetchCandyList()