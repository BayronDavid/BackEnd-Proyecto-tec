var socket = io()

const form_message  = document.getElementById('form-message');
const message       = document.getElementById('message');

const user_message  = document.getElementById('user_message');
const my_message    = document.getElementById('my_message');

const boxMessages    = document.getElementById('boxMessages');


// Send messages
form_message.addEventListener('submit', (e)=>{
    e.preventDefault();
    socket.emit('send message', message.value)
    message.value = ''
})

// Listen messages
socket.on('new message', (data)=>{
    user_message.innerText = data
})

// Load messages
socket.on('load messages', (data)=>{
    boxMessages.innerHTML ='';
    for (var i=0; i<data.length; i++){
        displayMessage(data[i])
    }
})

// Display messages
function displayMessage(message){
    let div = document.createElement('div')
    div.setAttribute('class', 'direct-chat-msg right')
    div.innerHTML = `
        <div class="direct-chat-info clearfix">
            <span class="direct-chat-name pull-right">${message.nik}</span>
            <span class="direct-chat-timestamp pull-left">${message.created_at}</span>
        </div>

        <img class="direct-chat-img"
            src="https://img.icons8.com/office/36/000000/person-female.png"
            alt="message user image">

        <div class="direct-chat-text" id="my_message">
            ${message.message}
        </div>`

        boxMessages.appendChild(div)
}
