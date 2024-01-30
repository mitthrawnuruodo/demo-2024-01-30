console.log("Let's go!")
const url = "https://www.amiiboapi.com/api/amiibo/"; 
//const url = "https://www.amiiboapi.com/api/amiibo/?character=mario";
//const url = "https://www.amiiboapi.com/api/amiibo/?head=00000000&tail=00000002"; 
//const url = "https://www.amiiboapi.com/api/amiibo/?character=Wario";
//const url = "https://www.amiiboapi.com/api/amiibo/?character=Luigi";
//const url = "https://www.amiiboapi.com/api/amiibo/?character=Yoshi";
//const url = "https://www.amiiboapi.com/api/amiibo/?character=zelda";
//const url = "https://www.amiiboapi.com/api/amiibo/?character=Octoling";


const out = document.querySelector("div#container");

function listData(list){
    //console.log ("List:", list);
    out.innerHTML = ""; // Remove Loading message
    let newDivs = "";
    for (let item of list) {
        //console.log(item);
        newDivs += `<div>
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>From: ${item.amiiboSeries}</p>
            <p>Type: ${item.type}</p>
        </div>`;
    }
    out.innerHTML = newDivs;
}

function myPromiseUsingXHR(apiUrl) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl);
        //xhr.onload = function() { return resolve(xhr.responseText); };
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);

        xhr.send();
    });
}
/*
myPromiseUsingXHR(url)
    .then((data) => {
        console.log("Data:", data); // data = xhr.responseText
        // get the list by parsing json and return the content of the object
        return JSON.parse(data);
    })
    .then(parsedData => {
        console.log("Object: ", parsedData);  
        console.log("List: ", parsedData.amiibo);  
        // send data to an appropriate function to process
        listData(parsedData.amiibo);
    })
    .catch((error) => { // error = xhr.statusText
        console.error("Something's wrong: " + error.message);
        out.innerHTML = "Cannot get Amiibos, try again in a minute";
    });
    */

myPromiseUsingXHR (url)
    .then(data => JSON.parse(data))
    .then(obj => listData(obj.amiibo))
    .catch(error => out.innerHTML = "Something's wrong! " + error.message);
