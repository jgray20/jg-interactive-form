//Highlights the Name input at page load
const userName = document.getElementById('name');
userName.focus();

// Hides the text area until Other is selected from dropdown
const jobRole = document.getElementById('title');

const otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = 'none';

jobRole.addEventListener('change', (e) => {
    let options = e.target.value;
    if (options === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

//Adding JS to the T-Shirt Info section

const shirtDesignSelect = document.getElementById('design');
const shirtColorSelect = document.getElementById('color');
const colorOptions = shirtColorSelect.children;

//Disables the color choices until a theme is selected
shirtColorSelect.disabled = true;

//Allows the correct color options to appear for the theme chosen
shirtDesignSelect.addEventListener('change', (e) => {
    shirtColorSelect.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const selectedDesign = e.target.value;
        const shirtTheme = colorOptions[i].getAttribute('data-theme');

        if (selectedDesign === shirtTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute('selected', true);
        }else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute('selected', false);
        };
    };
});

//User can select their activities and find out the total cost
const registerActivities = document.getElementById('activities');
let activitiesCost = document.getElementById('activities-cost');
let totalCost = 0;

registerActivities.addEventListener('change', (e) => {
    const dataCost =  +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

//Payment section
const selectPayment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

//Sets Credit Card as default option
paypal.style.display = 'none';
bitcoin.style.display = 'none';
selectPayment.children[1].setAttribute('selected', true);

// Changes the payment information based on which method the user chooses
selectPayment.addEventListener('change', (e) => {
    if (e.target.value === 'paypal') {
        paypal.style.display = '';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        paypal.style.display = 'none';
        creditCard.style.display = 'none';
        bitcoin.style.display = '';
    } else {
        paypal.style.display = 'none';
        creditCard.style.display = '';
        bitcoin.style.display = 'none';
    }
});

//Form Validation
const email = document.getElementById('email');
const creditCardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvCode = document.getElementById('cvv');
const form = document.querySelector('form');

//Name field validation
function validateName() {
    const nameValue = userName.value;
    const validNameTest = /^\D+ ?(\D+)? \D+$/.test(nameValue);
    return validNameTest;
}

//Email validation
function validateEmail() {
    const emailValue = email.value;
    const validEmailTest = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return validEmailTest;
}

//Makes sure that at least one activity is selected
function validateRegistration() {
    const activitiesSelected = totalCost > 0;
    return activitiesSelected;
}

//Validate that a CC has 13-16 digits entered
function validateCard() {
    const cardNumber = creditCardNumber.value;
    const validNumber = /^\d{13,16}$/.test(cardNumber);
    return validNumber;
}

//Validates a 5 digit zip code
function validateZip() {
    const zipValue = zipCode.value;
    const validZipTest = /^\d{5}$/.test(zipValue);
    return validZipTest;
}

//Validates a 3 digit CVV code
function validateCvv() {
    const cvvValue = cvvCode.value;
    const validCvv = /^\d{3}$/.test(cvvValue);
    return validCvv;
}

//Instruction for invalid fields
function invalidField(formInput) {
    formInput.parentElement.classList.remove('valid');
    formInput.parentElement.classList.add('not-valid');
    formInput.parentElement.style.display = 'block';
}

function validField(formInput) {
    formInput.parentElement.classList.remove('not-valid');
    formInput.parentElement.classList.add('valid');
    formInput.parentElement.style.display = '';
}




//prevents the form from submitting if there are any errors
form.addEventListener('submit', (e) => {
    if ( !validateName() ) {
        e.preventDefault();
        invalidField(userName);
    } else{
        validField(userName);
    }
    if ( !validateEmail() ) {
        e.preventDefault();
        invalidField(email);
    }else{
        validField(email);
    }
    if ( !validateRegistration() ) {
        e.preventDefault();
        invalidField(registerActivities);
    }else{
        validField(registerActivities);
    }
    if (selectPayment.value === 'credit-card') {
        if ( !validateCard() ){
            e.preventDefault();
            invalidField(creditCardNumber);
        } else {
            validField(creditCardNumber);
        }
        if ( !validateZip() ) {
            e.preventDefault();
            invalidField(zipCode);
        }else {
            validField(zipCode);
        }
        if ( !validateCvv() ) {
            e.preventDefault();
            invalidField(cvvCode);
        } else {
            validField(cvvCode);
        }
    }
    
});