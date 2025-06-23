const cards=document.querySelector(".cards");

function createNewCard(imageSrc,productName,oldPrice,newPrice,numOfStar,measurementType,measureList){
   
    let card=document.createElement("div");
    card.setAttribute("class","card");
    // card-image
    let cardImage=document.createElement("div");
    cardImage.setAttribute("class","card-image")
    cardImage.innerHTML=` <div class="delete-icon"><i class="fa-solid fa-trash"></i></div>
                        <img src="${imageSrc}" alt="product-image">` 




    // name
    let name=document.createElement("div");
    name.setAttribute("class","product-name");
    name.innerHTML=` <p>${productName}</p>`


    // price-stars
    let priceStars=document.createElement("div");
    priceStars.setAttribute("class","price-stars");
    priceStars.innerHTML+=`<span class="old-price">$${oldPrice}</span>
    <span class="new-price">$<span class="new-price-num">${newPrice}</span></span>`;
    if(numOfStar>5){
        numOfStar=5;
    }
    var noGold=5-numOfStar;
    for(i=0;i<numOfStar;i++){
        
        priceStars.innerHTML+=`<span><i class="fa-solid fa-star"></i></span>`;
        
    }
    for(i=0;i<noGold;i++){
        priceStars.innerHTML+=`<span><i class="fa-solid fa-star no-gold"></i></span>`;
        
    }
    
    


    // Measurement type
    let measureType=document.createElement("div");
    measureType.setAttribute("class","measureType");
    let select=document.createElement("select");
    select.setAttribute("name",`${measurementType}`)
    let option=document.createElement("option");
    for(i=0;i<measureList.length;i++){
        option.innerHTML=measureList[i];
        option.setAttribute("value",`${measureList[i]}`);
        select.innerHTML+=option.outerHTML;
    }
    measureType.innerHTML+=`<p>${measurementType}</p>`
    measureType.appendChild(select);
    card.appendChild(cardImage);
    card.appendChild(name);
    card.appendChild(priceStars);
    card.appendChild(measureType);
    card.innerHTML+=` <div class="numbers-of-Product btn">
                        <div class="decrease"><i class="fa-solid fa-minus"></i></div>
                        <div class="number">1</div>
                        <div class="increase"><i class="fa-solid fa-plus"></i></div>
                     </div>`;

    cards.appendChild(card);


    // add total price and subtotal

}
var size=["small","medium","large","x-large"]
var color=["red","green","blue"];

const productsData = [
  {
    imageSrc: "./images/p1.png",
    productName: "t-shirt",
    oldPrice: 300,
    newPrice: 250,
    numOfStar: 4,
    measurementType: "size",
    measureList:size,
  },
  {
    imageSrc: "./images/p10.png",
    productName: "cap",
    oldPrice: 100,
    newPrice: 90,
    numOfStar: 3,
    measurementType: "color",
    measureList: color,
  },
  {
    imageSrc: "./images/p12.png",
    productName: "glasses",
    oldPrice: 200,
    newPrice: 180,
    numOfStar: 2,
    measurementType: "color",
    measureList: color,
  },
  {
    imageSrc: "./images/p5.png",
    productName: "shirt",
    oldPrice: 200,
    newPrice: 180,
    numOfStar: 5,
    measurementType: "size",
    measureList: size,
  },
  {
    imageSrc: "./images/red.png",
    productName: "t-shirt",
    oldPrice: 300,
    newPrice: 280,
    numOfStar: 5,
    measurementType: "size",
    measureList: size,
  },
  {
    imageSrc: "./images/electronics1.png",
    productName: "laptop",
    oldPrice: 20000,
    newPrice: 18000,
    numOfStar: 5,
    measurementType: "color",
    measureList: color,
  }
];
productsData.forEach(product=>{
    createNewCard(product.imageSrc
        ,product.productName
        ,product.oldPrice
        ,product.newPrice
        ,product.numOfStar
        ,product.measurementType
        ,product.measureList
    )
})
// createNewCard("./images/p1.png","t-shirt",200,180,4,"size",size)
// createNewCard("./images/p10.png","t-shirt",200,180,3,"size",size)
// createNewCard("./images/p12.png","t-shirt",200,180,1,"size",size)
// createNewCard("./images/p5.png","t-shirt",200,180,5,"size",size)
// createNewCard("./images/p1.png","t-shirt",200,180,4,"size",size)
// createNewCard("./images/p10.png","t-shirt",200,180,3,"size",size)
// createNewCard("./images/p12.png","t-shirt",200,180,1,"size",size)
// createNewCard("./images/p5.png","t-shirt",200,180,5,"size",size)




// calc price
const subTotal=document.querySelector(".subTotal-num");
const shipping=document.querySelector(".shipping-num");
const total=document.querySelector(".total-num span");
const taxes=document.querySelector(".taxes-num");

//function of subTotal

function calcSubtotal() {
    let sum = 0;
    document.querySelectorAll(".card").forEach(card => {
        const price = Number(card.querySelector(".new-price-num").innerText);
        const quantity = Number(card.querySelector(".number").innerText);
        sum += price * quantity;
    });
    return sum;
}


//function of total
function calcTotal(subtotal){
    return subtotal + Number(taxes.innerText);
}

function updateTotalPrice(){
    var subtal=calcSubtotal();
    subTotal.innerText=subtal;
    if(subtal===0){
        shipping.innerText=0;
        total.innerText=0;
    }else {
        shipping.innerText=7.24;
        total.innerText=calcTotal(subtal);
    }
}
updateTotalPrice();
//increase , decrease and delete
 cards.addEventListener("click", (e) => {
    const clickedElement = e.target;

    const plusBtn = clickedElement.closest(".increase");
    if (plusBtn) {
        const quantityEl = plusBtn.parentElement.querySelector(".number");
        quantityEl.innerText = Number(quantityEl.innerText) + 1;
        updateTotalPrice();
        return;
    }

    const minusBtn = clickedElement.closest(".decrease");
    if (minusBtn) {
        const quantityEl = minusBtn.parentElement.querySelector(".number");
        if (Number(quantityEl.innerText) > 1) {
            quantityEl.innerText = Number(quantityEl.innerText) - 1;
            updateTotalPrice();
        }
        return;
    }

    if (clickedElement.closest(".delete-icon")) {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const cardToDelete = clickedElement.closest(".card");
            if (cardToDelete) {
                cardToDelete.remove();
                updateTotalPrice();
            }
        }
    }
});





// go to check out page
const btn=document.querySelector(".btn-check-out .btn");

btn.onclick=()=>{
    alert(`Total Price = ${total.innerText}`)
    // ckeckOut(Number(total.innerText))
}