// Display messages
const messageContainer = document.getElementById('messages-container');
const messageElements = messageContainer.querySelectorAll('.message');

function closeMessage(messageElement) {
    messageElement.style.opacity = '1';
    const closeButton = messageElement.querySelector('button');
    let pressed = false;
    setTimeout(() => {
        if (!pressed) {
        closeButton.remove();
        messageElement.animate(
            [
                {
                    opacity: 1, transform: 'translateY(0px)'
                },
                {
                    opacity: 0, transform: 'translateY(-20px)'
                },
            ],
            {
                duration: 1000,
                easing: 'ease-out',
                fill: 'forwards'
            }
        );
    
        setTimeout(() => {
            messageElement.remove();
        }, 1000)
    }
    }, 1500)
    // Add event listener to close button
    closeButton.addEventListener('click', () => {
    // Animate message disappearing (fade-out and slide up)
    pressed = true;
    messageElement.animate(
        [
            {
                opacity: 1, transform: 'translateY(0px)'
            },
            {
                opacity: 0, transform: 'translateY(-20px)'
            },
        ],
        {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );

    setTimeout(() => {
        messageElement.remove();
    }, 1000)

    });
}

messageElements.forEach(messageElement => {
    closeMessage(messageElement);
});


function showMessage(message, type) {
    const messagecontainer = document.getElementById('messages-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(type);
    messageElement.innerHTML = `
        <p>${message}
        <button>x</button>
        </p>
    `;
    messagecontainer.appendChild(messageElement);
    closeMessage(messageElement);

}

