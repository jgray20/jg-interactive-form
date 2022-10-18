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




