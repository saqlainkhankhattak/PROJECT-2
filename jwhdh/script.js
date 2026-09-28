

let sideStep = document.querySelectorAll('.side-step');
let circles = document.querySelector(".circle")
let circleONe = document.querySelector(".circle1")
let circleTwo = document.querySelector(".circle2")
let circleThree = document.querySelector(".circle3")
let circleFour = document.querySelector(".circle4")

let namee = document.querySelector("#name")
let email = document.querySelector("#email")
let phone = document.querySelector("#phone")
let stepOne = document.querySelector('#step1')
let stepTwo = document.querySelector('#step2')
let stepThree = document.querySelector('#step3')
let stepFour = document.querySelector('#step4')
let stepFive = document.querySelector('#step5')
let errorText  = document.querySelector('.error-text');
let seletedItems = document.querySelectorAll(".plan")
let nextBtn = document.querySelector('.next-btn');
let backBtn = document.querySelector('.back-btn');

 let index = 1;

nextBtn.addEventListener("click", function () {

    if (index === 1) {

        if (
            namee.value.trim() === "" ||
            email.value.trim() === "" ||
            phone.value.trim() === ""
        ) {
            errorText.classList.add("errorActive");
            return;
        }

        errorText.classList.remove("errorActive");

        stepOne.style.display = "none";
        stepTwo.style.display = "block";
        circleONe.classList.remove("active")
        circleTwo.classList.add("active")

        index++;

    } else if (index === 2) {

        stepTwo.style.display = "none";
        stepThree.style.display = "block";
        circleTwo.classList.remove("active")
        circleThree.classList.add("active")


        index++;

    } else if (index === 3) {

        stepThree.style.display = "none";
        stepFour.style.display = "block";
        circleThree.classList.remove("active")
        circleFour.classList.add("active")

        index++;

    } else if (index === 4) {

        stepFour.style.display = "none";
        stepFive.style.display = "block";
        

        index++;
    }

});

backBtn.addEventListener("click", function () {

    if (index === 2) {

        stepTwo.style.display = "none";
        stepOne.style.display = "block";
        circleTwo.classList.remove("active")
        circleONe.classList.add("active")
        index--;

    } else if (index === 3) {

        stepThree.style.display = "none";
        stepTwo.style.display = "block";
        circleThree.classList.remove("active")
        circleTwo.classList.add("active")
        index--;

    } else if (index === 4) {

        stepFour.style.display = "none";
        stepThree.style.display = "block";
        circleFour.classList.remove("active")
        circleThree.classList.add("active")
        index--;
    }else if (index === 5) {

        stepFive.style.display = "none";
        stepFour.style.display = "block";
        
        index--;

    }

});
let yearly = document.getElementById("year")
let monthly = document.getElementById("month")
let priceOne = document.querySelector(".price1")
let priceTwo = document.querySelector(".price2")
let priceThree = document.querySelector(".price3")
seletedItems.forEach(ele => {
    ele.addEventListener('click' , function(){
        seletedItems.forEach(ele=>{
            ele.classList.remove('selected')

        })
        ele.classList.add('selected')
    })
});



yearly.addEventListener("click", () => {
    yearly.classList.add("active");
    monthly.classList.remove("active");

    priceOne.textContent = "$90/yr";
    priceTwo.textContent = "$120/yr";
    priceThree.textContent = "$150/yr";
    
});
monthly.addEventListener("click", () => {
    monthly.classList.add("active");
    yearly.classList.remove("active");

    priceOne.textContent = "$9/yr";
    priceTwo.textContent = "$12/yr";
    priceThree.textContent = "$15/yr";
});