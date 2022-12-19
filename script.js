const showImageEl = document.querySelector("#showImage");
const someDataEl = document.querySelector("#someData");

const fetchCandyList = async () => {
    const res = await fetch("https://www.bortakvall.se/api/products")
    const data = await res.json()

    return data
};

fetchCandyList().then(data => {
    someDataEl.innerHTML = `<p>Show Data: ${data['data'][0]['name']}</p>`;
    console.log(data['data'][0]['name']);

    showImageEl.src = data['data'][0]['images']['large'] 
});