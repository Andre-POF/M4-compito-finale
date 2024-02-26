
// DOM ELEMENTS AREA


let cardResults = document.getElementById("cardResults");
let deleteAlert = document.getElementById("delete-msg");
let inputAlert = document.getElementById("alert-msg")
let productName = document.getElementById("inpName");
let productDesc = document.getElementById("inpDesc");
let productBrand = document.getElementById("inpBrand");
let productImg = document.getElementById("inpImg");
let productPrice = document.getElementById("inpPrice");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3MzgyNjc2YTY0YjAwMTllZjFhNDkiLCJpYXQiOjE3MDg2MDM0MzAsImV4cCI6MTcwOTgxMzAzMH0.vyN3h-VhfThXh-w_lU6nM2kckv61MBtInfDNqYhIBCw"

// Endepoint:https://striveschool-api.herokuapp.com/api/product/

const apiUrl= "https://striveschool-api.herokuapp.com/api/product/";

window.onload = getProducts();

async function getProducts () {
    cardResults.innerHTML="";
    //await fetch(apiUrl + myPostId, { "method": "PUT", "body": JSON.stringify(myPayload),
    // "headers": { "Content-Type": "application/json" }});

    try{
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }    
        });    
        const json = await res.json();
        json.forEach((product) => {
           // console.log("GET PRODUCTS");
            createTemplate(product);
        });    
    } catch(error) {
        console.log(error);
    }    
}    


// CREATE TEMPLATE AREA

/* <div class="col">
<div class="card h-100">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div> */

function createTemplate ({_id, name, description, brand, imageUrl, price}){

    let col = document.createElement("div");
    col.classList.add("col");
    let card = document.createElement("div");
    card.classList.add("card", "h-100");
    let image = document.createElement("img");
    let imgExternal = document.createElement("a");
    imgExternal.href = `singleProduct.html?pid=${_id}`;
    imgExternal.target = "_blank";
    image.classList.add("card-image-top", "rounded");
    image.src =  imageUrl;
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let selectTitle = document.createElement("a");
    selectTitle.href = `singleProduct.html?pid=${_id}`;
    selectTitle.target = "_blank";
    let title = document.createElement("h4");
    title.classList.add("card-title");
    title.innerText = name;
    let externalLink = document.createElement("a");
    externalLink.classList.add ("external-link","text-center", "mb-3");
    externalLink.href = `singleProduct.html?pid=${_id}`;
    externalLink.target = "_blank";
    let text = document.createElement("p");
    text.classList.add("card-text");
    text.innerText = `Description: ${description}`;
    let brandName = document.createElement("p");
    brandName.classList.add("card-text");
    brandName.innerText =`Brand: ${brand}`;
    let priceTag = document.createElement("p");
    priceTag.classList.add("card-text");
    priceTag.innerText = `Price: ${price}`;

    let options = document.createElement("div");
    options.classList.add("my-2", "mx-1");

    // Edit Btn
    let editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-primary", "btn-sm","m-1");
    editBtn.href = `singleProduct.html?pid=${_id}`;
    editBtn.target = "_blank";
    let editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil");
    let editText = document.createElement("span");
    editText.classList.add("ms-1");
    editText.innerText = "Edit";

    // Delete btn
    let delBtn = document.createElement("a");
    delBtn.classList.add("btn", "btn-sm", "btn-danger", "m-1");
    delBtn.addEventListener("click", () => {
        deleteProduct(_id);
    })
    let delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash");
    let delText = document.createElement("span");
    delText.classList.add("ms-1");
    delText.innerText = "Delete";

    // Deploy in DOM
    col.appendChild(card);
    card.appendChild(imgExternal);
    imgExternal.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(externalLink);
    externalLink.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(brandName);
    cardBody.appendChild(priceTag);
    card.appendChild(options);
    options.appendChild(editBtn);
    options.appendChild(delBtn);
    editBtn.appendChild(editImg);
    editBtn.appendChild(editText);
    delBtn.appendChild(delImg);
    delBtn.appendChild(delText);   
    cardResults.appendChild(col);

}


// CREATE PRODUCT


async function createProduct () {
    
   if(productName.value && productDesc.value && productBrand.value && productImg && productPrice){
    let newProduct = { "name": productName.value, "description": productDesc.value, 
    "brand": productBrand.value, "imageUrl": productImg.value, "price": productPrice.value}
    
    try{
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(newProduct)
        });
        getProducts();
        
    } catch(error) {
        console.log(error);
    }    
} else {
    inputAlert.classList.toggle("d-none");
    setTimeout(() => {
        inputAlert.classList.toggle("d-none");
    }, 4000);
}
}    

//DELETE FUNCTION

async function deleteProduct (_id) {
    try{
        const res = await fetch(apiUrl + _id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        deleteAlert.classList.toggle("d-none");
        setTimeout(() => {
            deleteAlert.classList.toggle("d-none");
        }, 4000);
        getProducts();
        
    } catch(error) {
        console.log(error);
    }    
}


// EDIT FUNCTION

async function editProduct (_id) {
    let newProduct = { "name": productName.value, "description": productDesc.value, 
    "brand": productBrand.value, "imageUrl": productImg.value, "price": productPrice.value}

    try{
        const res = await fetch(apiUrl + _id, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body:json.stringify(newProduct)
        });
        getProducts();
        
    } catch(error) {
        console.log(error);
    }    
}