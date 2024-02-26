
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3MzgyNjc2YTY0YjAwMTllZjFhNDkiLCJpYXQiOjE3MDg2MDM0MzAsImV4cCI6MTcwOTgxMzAzMH0.vyN3h-VhfThXh-w_lU6nM2kckv61MBtInfDNqYhIBCw"
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";

let cardContainer = document.getElementById("card-container");
let deleteAlert = document.getElementById("delete-msg");
let inputAlert = document.getElementById("alert-msg");
let productName = document.getElementById("inpName");
let productDesc = document.getElementById("inpDesc");
let productBrand = document.getElementById("inpBrand");
let productImg = document.getElementById("inpImg");
let productPrice = document.getElementById("inpPrice");

let imgShow = document.getElementById("sProdImg");
let nameShow = document.getElementById("nameShow");
let descShow = document.getElementById("descShow");
let brandShow = document.getElementById("brandShow");
let priceShow = document.getElementById("priceShow");

const paramObj = new URLSearchParams(window.location.search); 
console.log(paramObj);
const singleProductId = paramObj.get("pid"); // Id del post attivo...
console.log(singleProductId);

window.onload = getSingleProduct();

async function getSingleProduct () {

    try{
        const res = await fetch(apiUrl + singleProductId, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }    
        });    
        const json = await res.json();
                populateProduct(json);    
    } catch(error) {
        console.log(error);
    }    
}    



function populateProduct ({name,description,imageUrl,brand,price}) {
    imgShow.src = imageUrl;
    nameShow.innerHTML = name;
    descShow.innerHTML = `Description: ${description}`;
    brandShow.innerHTML = `Brand: ${brand}`;
    priceShow.innerHTML = `Price: ${price}`;
}


async function editProduct () {
    if(productName.value && productDesc.value && productBrand.value && productImg && productPrice){
        let myPayload = { "name": productName.value, "description": productDesc.value, 
        "brand": productBrand.value, "imageUrl": productImg.value, "price": productPrice.value };
    
        console.log("dentro do if");
        try{

            console.log("antes do res");
            const res = await fetch((apiUrl + singleProductId), {
                method: "PUT", 
                body:JSON.stringify(myPayload),
                headers: {Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"}
            });
            getSingleProduct();
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


async function deleteProduct (singleProductId) {
    try{
        const res = await fetch (apiUrl + singleProductId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        afterDelete();
        
    } catch(error) {
        console.log(error);
    }    
}


function afterDelete () {
    cardContainer.innerHTML= "";
    let deleteLog = document.createElement("div");
    deleteLog.classList.add("d-flex","flex-column", "align-items-center", "alert", "alert-danger");
    let deletedProd = document.createElement("p");
    deletedProd.innerHTML = "Product Deleted."
    let backAnchor = document.createElement("a");
    backAnchor.href=`index.html`;
    backAnchor.classList.add("btn", "btn-light", "p-2");
    let anchorPar = document.createElement("p");
    anchorPar.classList.add("m-0");
    anchorPar.innerHTML = "Back to Products List";

    deleteLog.appendChild(deletedProd);
    backAnchor.appendChild(anchorPar);
    deleteLog.appendChild(backAnchor);
    cardContainer.appendChild(deleteLog);
}