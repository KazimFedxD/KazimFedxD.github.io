
(
    function(){
        emailjs.init({
            publicKey: "Si2AYHuddQeZRlp7G"
        });
    }
)();

const contactform = document.getElementById('contact-form');
const button = document.getElementById('contact-submit');
const endpoint = "https://formspree.io/f/{your_form_id}"

function sendEmail(name, email, phone, subject, message) {
    let timestamp = new Date().toISOString();
    let data = {
        user_name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        timestamp: timestamp
    };
    emailjs.send("service_56fyazk", "template_i0a3otb", data)
    emailjs.send("service_56fyazk", "template_4fsca3d", data).then(
        () => {
            showMessage("Message Sent", "success");
            contactform.reset();
        }, (error) => {
            showMessage("Message Failed to Send", "error");
            console.error(error);
        }
    )
};

button.addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    console.log(name, email, phone, subject, message);

    sendEmail(name, email, phone, subject, message);

}
);