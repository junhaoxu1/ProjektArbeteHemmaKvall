const showImageEl = document.querySelector("#showImage");
const someDataEl = document.querySelector("#someData");
const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
const descriptionDataEl = document.querySelector("#descriptionData");

let clicked = true;

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

            let addInfo = document.createElement("button");
            newData.appendChild(addInfo)
            addInfo.innerText = "INNEHÅLL"
            addInfo.addEventListener("click", function (e) {
                if (clicked) {
                    let hideDescriptionTag = `${singleData['description']}`;
                    newData.appendChild(descriptionDataEl);
                    descriptionData.innerText = hideDescriptionTag.replace(tagRegExp, "")
                    descriptionDataEl.classList.remove("d-none");
                    clicked = false;
                } else {
                    descriptionDataEl.classList.add("d-none");
                    clicked = true;
                }
            });
        });
    });


