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


