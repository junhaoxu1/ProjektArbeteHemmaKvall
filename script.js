const showImageEl = document.querySelector("#showImage");
const someDataEl = document.querySelector("#someData");

const fetchCandyList = async () => {
    const res = await fetch("https://www.bortakvall.se/api/products")
    const data = await res.json()

    return data
};

fetchCandyList().then(data => {
    someDataEl.innerHTML = `<h2>${data['data'][0]['name']}</h2>
                            <p>${data['data'][0]['description']}</p>`;
    console.log(data['data'][0]['images']['large']);

    showImageEl.src = data['data'][0]['images']['large']
});