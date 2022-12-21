const showImageEl = document.querySelector("#showImage");
const someDataEl = document.querySelector("#someData");

const fetchCandyList = async () => {
    const res = await fetch("https://www.bortakvall.se/api/products");
    const data = await res.json();

    return data["data"];
};

fetchCandyList().then(data => {
    data.forEach(singleData => {
        let newData = document.createElement("div");
        let addNewData = document.createElement("h2");
        newData.classList.add("col");
        someDataEl.appendChild(newData);
        newData.appendChild(addNewData);
        addNewData.innerText = `${singleData['name']}`

        let addImage = document.createElement("img");
        newData.appendChild(addImage);
        addImage.src = `https://bortakvall.se${singleData['images']['large']}`;
        addImage.height = 150;
        addImage.width = 150;

        let addPrice = document.createElement("h3");
        newData.appendChild(addPrice)
        addPrice.innerText = `${singleData['price']} KR`
    });
});
