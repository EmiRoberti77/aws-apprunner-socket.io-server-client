const socket = io();
const messageEL = document.getElementById('messages');

socket.on('connect', () => {
  console.log('socket connected');
  printMessage('connected');
});

socket.on('message', (message) => {
  printMessage(message);
});

function printMessage(msg) {
  const item = document.createElement('li');
  item.textContent = new Date().toISOString() + '-' + msg;
  messageEL.append(item);
  messageEL.scrollTop(0, document.body.scrollHeight);
}
