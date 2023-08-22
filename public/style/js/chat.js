const socket = io.connect('http://localhost:8080')

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');






// Ekleyebiliriz
message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value)
})
socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data + ' yazıyor...' + '</p>';
})