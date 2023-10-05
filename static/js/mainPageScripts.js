//
// const connectForm = document.getElementById('connectForm')
// const createRoomBtn = document.getElementById('createRoomBtn')
//
// // const socket = io('http://localhost:3001/')
// // socket.on('hi', () => console.log("You ha joined room"))
//
//
// function generateRandomToken(length) {
//     const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let token = "";
//
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         token += charset[randomIndex];
//     }
//
//     return token;
// }
//
// createRoomBtn.addEventListener("click", e => {
//     const randomToken = generateRandomToken(4);
//     // socket.emit('createRoom', {roomToken: randomToken})
//     document.getElementById('token').innerText = randomToken;
//     fetch('http://localhost:3001/')
//
//
// })
//
// connectForm.addEventListener("submit", e => {
//     // e.preventDefault()
//     let token = document.getElementById('inputtedToken').value
//
//     // console.log(token)
//     // socket.emit('connectToGame', {roomToken: token})
//
// })
//
