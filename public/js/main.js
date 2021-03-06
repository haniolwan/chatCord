const socket = io();
const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');

socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Get username from URL
socket.emit(
  'username',
  Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  })
);

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get message from input
  const msg = e.target.elements.msg.value;

  // Send message to Server
  socket.emit('chatMessage', msg);

  // clear Message Input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text">
  ${message.text}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
