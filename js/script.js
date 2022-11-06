const userName = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const shirtDesignSelect = document.getElementById('design');
const shirtColorSelect = document.getElementById('color');
const colorOptions = shirtColorSelect.children;
const registerActivities = document.getElementById('activities');
let activitiesCost = document.getElementById('activities-cost');
let totalCost = 0;
const selectPayment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const email = document.getElementById('email');
const creditCardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvCode = document.getElementById('cvv');
const form = document.querySelector('form');
const activityCheckboxes = document.querySelectorAll('#activities-box input[type="checkbox"]');


//Highlights the Name input at page load
userName.focus();

// Hides the text area for job role until 'Other' is selected from dropdown
otherJobRole.style.display = 'none';

jobRole.addEventListener('change', (e) => {
    let options = e.target.value;
    if (options === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

//T-Shirt Info section

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


//Register for Activities section 

//User can select their activities and find out the total cost
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

//Sets Credit Card as default payment option
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

//Form Validation helper functions

//Name field validation
function validateName() {
    const nameValue = userName.value;
    const validNameTest = /^\D+ ?(\D+)? \D+$/.test(nameValue);
    if (!validNameTest){
        invalidField(userName);
    } else {
        validField(userName);
    }
    return validNameTest;
}

//Email validation
function validateEmail() {
    let emailValue = email.value;
    const validEmailTest = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    if (!validEmailTest) {
        if (emailValue === ''){
            invalidField(email);
            document.getElementById('email-hint').innerText = "Email address cannot be blank";
        } else {
            invalidField(email);
            document.getElementById('email-hint').innerText = "Email address must be formatted correctly";
        }
    } else {
        validField(email);
    }
    return validEmailTest;
}

//Makes sure that at least one activity is selected
function validateRegistration() {
    const activitiesSelected = totalCost > 0;
    return activitiesSelected;
}

//Validates that a credit card has 13-16 digits entered
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
        formInput.parentElement.lastElementChild.style.display = 'block';

}

//Instruction for valid fields
function validField(formInput) {
        formInput.parentElement.classList.remove('not-valid');
        formInput.parentElement.classList.add('valid');
        formInput.parentElement.lastElementChild.style.display = '';
    
}

//prevents the form from submitting if there are any errors
form.addEventListener('submit', (e) => {

    if ( !validateName() ) {
        e.preventDefault();
    } 
    if ( !validateEmail() ) {
        e.preventDefault();
    }
    if ( !validateRegistration() ) {
        e.preventDefault();
        invalidField(activitiesCost);
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

// Accessibility

//adds a more noticeable style to the activity being selected
for ( let i = 0; i < activityCheckboxes.length; i++) {
        activityCheckboxes[i].addEventListener('focus', (e) => {
            activityCheckboxes[i].parentElement.classList.add('focus');
        });
        activityCheckboxes[i].addEventListener('blur', (e) => {
            activityCheckboxes[i].parentElement.classList.remove('focus');
        });
};

//Disables activity options with the same time and day as the selected option
registerActivities.addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedDate = clicked.getAttribute('data-day-and-time');
    
    for ( let i = 0; i < activityCheckboxes.length; i++) {
        const checkboxDate = activityCheckboxes[i].getAttribute('data-day-and-time');
        if (clickedDate === checkboxDate && clicked !== activityCheckboxes[i]){
            if (clicked.checked) {
                activityCheckboxes[i].disabled = true;
                activityCheckboxes[i].parentElement.classList.add('disabled');
            } 
            if(!clicked.checked){
                activityCheckboxes[i].disabled = false;
                activityCheckboxes[i].parentElement.classList.remove('disabled');
            }
        } 
        
    }
});

userName.addEventListener('keyup', validateName);
email.addEventListener('keyup', validateEmail);