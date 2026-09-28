
let currentStep = 1;
let isYearly = false;

// Plan ke variables
let planName = "Arcade";
let planPrice = 9; 

let isOnline = true;
let isStorage = true;
let isProfile = false;


const steps = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3"),
  document.getElementById("step4"),
  document.getElementById("step5")
];

const nextBtn = document.querySelector(".next-btn");
const backBtn = document.querySelector(".back-btn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");


function showStep(stepNumber) {
  
  steps.forEach(step => step.classList.add("hide"));
  
  
  steps[stepNumber - 1].classList.remove("hide");

  
  document.querySelectorAll(".circle").forEach(c => c.classList.remove("active"));
  if (stepNumber <= 4) {
    document.querySelectorAll(`.circle${stepNumber}`).forEach(c => c.classList.add("active"));
  }

  
  if (stepNumber === 4) {
    nextBtn.textContent = "Confirm";
    updateSummary(); 
  } else if (stepNumber === 5) {
    nextBtn.style.display = "none";
    backBtn.style.display = "none";
  } else {
    nextBtn.textContent = "Next Step";
    nextBtn.style.display = "block";
    backBtn.style.display = "block";
  }
}


function checkValidation() {
  let isValid = true;

  
  document.querySelectorAll("input").forEach(inp => inp.classList.remove("error"));
  document.querySelectorAll(".error-text").forEach(err => err.classList.remove("errorActive"));

  
  if (nameInput.value.trim() === "") {
    nameInput.classList.add("error");
    nameInput.parentElement.querySelector(".error-text").textContent = "This field is required";
    nameInput.parentElement.querySelector(".error-text").classList.add("errorActive");
    isValid = false;
  }

  
  if (emailInput.value.trim() === "") {
    emailInput.classList.add("Error"); // Note: capital E to avoid conflict if any, but class is .error
    emailInput.classList.add("error");
    emailInput.parentElement.querySelector(".error-text").textContent = "This field is required";
    emailInput.parentElement.querySelector(".error-text").classList.add("errorActive");
    isValid = false;
  } else if (!emailInput.value.includes("@")) {
    emailInput.classList.add("error");
    emailInput.parentElement.querySelector(".error-text").textContent = "Invalid email format";
    emailInput.parentElement.querySelector(".error-text").classList.add("errorActive");
    isValid = false;
  }

  
  if (phoneInput.value.trim() === "") {
    phoneInput.classList.add("error");
    phoneInput.parentElement.querySelector(".error-text").textContent = "This field is required";
    phoneInput.parentElement.querySelector(".error-text").classList.add("errorActive");
    isValid = false;
  }

  return isValid;
}


nextBtn.addEventListener("click", () => {
  if (currentStep === 1) {
    if (!checkValidation()) return; // Agar validation fail hua, toh ruk jao
  }

  if (currentStep < 5) {
    currentStep++;
    showStep(currentStep);
  }
});


backBtn.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});


document.querySelectorAll(".plan").forEach(planBox => {
  planBox.addEventListener("click", () => {
    
    document.querySelectorAll(".plan").forEach(p => p.classList.remove("selected"));
    
    planBox.classList.add("selected");

    
    if (planBox.id === "arcade") {
      planName = "Arcade";
      planPrice = isYearly ? 90 : 9;
    } else if (planBox.id === "advanced") {
      planName = "Advanced";
      planPrice = isYearly ? 120 : 12;
    } else if (planBox.id === "pro") {
      planName = "Pro";
      planPrice = isYearly ? 150 : 15;
    }
  });
});


document.querySelectorAll(".addon").forEach(addonBox => {
  addonBox.addEventListener("click", (event) => {
    
    if (event.target.type !== "checkbox") {
      let checkbox = addonBox.querySelector("input");
      checkbox.checked = !checkbox.checked;
    }

    let checkbox = addonBox.querySelector("input");
    
    
    if (checkbox.checked) {
      addonBox.classList.add("selected");
    } else {
      addonBox.classList.remove("selected");
    }

    
    if (addonBox.id === "online") isOnline = checkbox.checked;
    if (addonBox.id === "storage") isStorage = checkbox.checked;
    if (addonBox.id === "profile") isProfile = checkbox.checked;
  });
});


function toggleBilling(makeYearly) {
  isYearly = makeYearly;

  
  document.querySelectorAll("#month, #month-step").forEach(el => el.classList.toggle("active", !makeYearly));
  document.querySelectorAll("#year, #year-step").forEach(el => el.classList.toggle("active", makeYearly));

  
  document.querySelector(".price1").textContent = isYearly ? "$90/yr" : "$9/mo";
  document.querySelector(".price2").textContent = isYearly ? "$120/yr" : "$12/mo";
  document.querySelector(".price3").textContent = isYearly ? "$150/yr" : "$15/mo";

  
  document.querySelector("#price1").textContent = isYearly ? "+$10/yr" : "+$1/mo";
  document.querySelector("#price2").textContent = isYearly ? "+$20/yr" : "+$2/mo";
  document.querySelector("#price3").textContent = isYearly ? "+$20/yr" : "+$2/mo";

  
  if (planName === "Arcade") planPrice = isYearly ? 90 : 9;
  if (planName === "Advanced") planPrice = isYearly ? 120 : 12;
  if (planName === "Pro") planPrice = isYearly ? 150 : 15;
}


document.getElementById("year").addEventListener("click", () => toggleBilling(true));
document.getElementById("month").addEventListener("click", () => toggleBilling(false));
document.getElementById("year-step").addEventListener("click", () => toggleBilling(true));
document.getElementById("month-step").addEventListener("click", () => toggleBilling(false));


function updateSummary() {
  let periodText = isYearly ? "Yearly" : "Monthly";
  let periodShort = isYearly ? "/yr" : "/mo";
  let totalPrice = planPrice;

  
  let html = `<div class="line"><b>${planName} (${periodText})</b><b>$${planPrice}${periodShort}</b></div>`;

  
  if (isOnline) {
    let price = isYearly ? 10 : 1;
    totalPrice += price;
    html += `<div class="line"><span>Online service</span><b>+$${price}${periodShort}</b></div>`;
  }
  
  if (isStorage) {
    let price = isYearly ? 20 : 2;
    totalPrice += price;
    html += `<div class="line"><span>Larger storage</span><b>+$${price}${periodShort}</b></div>`;
  }
  
  if (isProfile) {
    let price = isYearly ? 20 : 2;
    totalPrice += price;
    html += `<div class="line"><span>Customizable profile</span><b>+$${price}${periodShort}</b></div>`;
  }

  
  document.querySelector(".summary-box").innerHTML = html;
  document.querySelector(".total-line").innerHTML = `
    <span>Total (per ${isYearly ? "year" : "month"})</span>
    <span class="amount">$${totalPrice}${periodShort}</span>
  `;
}


[nameInput, emailInput, phoneInput].forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
    let errorSpan = input.parentElement.querySelector(".error-text");
    if (errorSpan) errorSpan.classList.remove("errorActive");
  });
});


document.getElementById("arcade").classList.add("selected"); // Default plan
showStep(1); // Pehla step dikhao