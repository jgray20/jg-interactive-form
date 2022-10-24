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
