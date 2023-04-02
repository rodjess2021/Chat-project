const socket = io()

//DOM element
let message = document.getElementById('message');
let username = document.getElementById('username');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let btnSend = document.getElementById('send');

btnSend.addEventListener('click', function () {
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    });
});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} está escribiendo</em></p>`
})