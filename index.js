import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import path from "path";
import expressThymeleaf from 'express-thymeleaf';
import {TemplateEngine} from 'thymeleaf';
import session from "express-session";
import {sendLogInPage, sendMainPage, sendRegisterPage} from "./controllers/ViewController.js";
import {login, register} from "./controllers/AuthController.js";
import {createGame, renderStartPage} from "./controllers/GameController.js";
import {connect} from "./db/db.js"
import {readFileSync} from 'fs'
import {Card} from "./models/CardModel.js";
import {shuffle} from "./utils.js";
import {ActionCard} from "./models/actionCardModel.js";

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app)
const io = new Server(server)

const templateEngine = new TemplateEngine();

// app.use('/public', express.static(path.join(path.resolve(), '/static')));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.join(path.resolve(), `static`));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), '/static')));
app.use(express.urlencoded({extended: true}));

app.use(session({
    name: 'anech', secret: 'anech', resave: false, saveUninitialized: true, cookie: {
        maxAge: 100000
    }
}));

// Execute the sql query files
// const connection = await connect()
// await connection.query((readFileSync('./db/init/users.sql', 'utf-8')), (err) => {
//     if (err) throw err;
// })
// await connection.query((readFileSync('./db/init/cards.sql', 'utf-8')), (err) => {
//     if (err) throw err;
// })
// await connection.query((readFileSync('./db/init/actionCards.sql', 'utf-8')), (err) => {
//     if (err) throw err;
// })
// await connection.end()

// Render page controllers
app.get('/', sendLogInPage)
app.get('/registration', sendRegisterPage)
app.get('/main', sendMainPage)
app.get('/createGameToken', renderStartPage)
app.post('/register', register)
app.post('/login', login)


let rooms = []
let cards = [...(await Card.get_all()), ...(await ActionCard.get_all())]

app.post('/createGame', createGame)
app.get('/connectGame', async (req, res) => {
    const token = req.query.token;
    console.log(token);
    if (!token || !rooms.find(t => t === token)) {
        console.log("redirected");
        res.redirect('/main')
    } else {
        console.log("to the game");
        res.render('html/main')
    }

})


io.on('connection', (socket) => {
    console.log(`User ${socket.id}: Connected`)
    socket.on('connectToGame', (data) => {
        let roomId = `room:${data.roomToken}`;
        console.log(`User ${socket.id}: Connected to the room ${roomId}`)
        socket.join(roomId)
        io.sockets.in(roomId).emit('connected')
    })

    socket.on('createRoom', (data) => {
        let roomId = `room:${data.roomToken}`;
        console.log(`User ${socket.id}: Created the room ${roomId}`)
        rooms.push(roomId);
        socket.join(roomId);
        console.log(rooms, roomId)
    })

    socket.on('dealCards', async (data) => {
        const { cardAmount } = data;
        let deck = shuffle(cards);

        if (cardAmount < deck.length)
            socket.emit('dealCards', {deck: deck.slice(0, cardAmount)})

    })

    socket.on('playCard', function (data) {
        const {card, cardZoneId} = data
        console.log(card);
        socket.broadcast.to("room:1488").emit('playCard', {card: card, cardZoneId: cardZoneId-3 })

    });

});


// Listening

server.listen(PORT, () => {
    console.log(`Node app started on port http://localhost:${PORT}`);
})

