const showImageEl = document.querySelector('#showImage');
const someDataEl = document.querySelector('#someData');
const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
const descriptionDataEl = document.querySelector('.descriptionData');
const popOverlayEl = document.querySelector('#popOverlay');
const titleEl = document.querySelector('.title')
const popUpImageEl = document.querySelector("#popUpImage");

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
            addImage.src = `https://bortakvall.se${singleData['images']['thumbnail']}`;
    
            let addPrice = document.createElement("h3");
            newData.appendChild(addPrice)
            addPrice.innerText = `${singleData['price']} KR`

            let addInfo = document.createElement("button");
            addInfo.setAttribute("data-pop-target", "#pop")
            newData.appendChild(addInfo)
            addInfo.innerText = "INNEHÅLL"

            let hideDescriptionTag = `${singleData['description']}`;
            addInfo.addEventListener("click", () => {
                const popWindow = document.querySelector(addInfo.dataset.popTarget)
                popUpImageEl.src = `https://bortakvall.se${singleData['images']['large']}`;
                descriptionDataEl.innerText = hideDescriptionTag.replace(tagRegExp, "");
                titleEl.innerText = `${singleData['name']}`
                openWindow(popWindow)
            });
        });
        
        const openWindow = popUp => {
            if (popUp == null) return
            popUp.classList.add('active')
            popOverlayEl.classList.add('active')
        }

        const closeWindow = popUp => {
            if (popUp == null) return
            popUp.classList.remove('active')
            popOverlayEl.classList.remove('active')
        }

        popOverlayEl.addEventListener('click', () => {
            const windows = document.querySelectorAll('.pop.active')
            windows.forEach(popUp => {
                closeWindow(popUp)
            })
        })
    });

