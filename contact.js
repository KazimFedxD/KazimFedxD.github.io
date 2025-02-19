const contactform = document.getElementById('contact-form');
const button = document.getElementById('contact-submit');
const endpoint = "https://formspree.io/f/{your_form_id}"

function sendEmail(name, email, phone, subject, message) {

};

button.addEventListener('click', function() {
    showMessage("Menu Toggled", "success");
    const name = contactform.getElementById('name').value;
    const email = contactform.getElementById('email').value;
    const phone = contactform.getElementById('phone').value;
    const subject = contactform.getElementById('subject').value;
    const message = contactform.getElementById('message').value;

}
);