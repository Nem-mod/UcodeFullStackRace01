import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import path from "path";
import cors from "cors";
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
const io = new Server(server, {
    cors: {
        origin: "http://www.localhost:3001"
    }
});

const templateEngine = new TemplateEngine();

// app.use('/public', express.static(path.join(path.resolve(), '/static')));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.join(path.resolve(), `static`));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), '/static')));
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(session({
    name: 'anech', secret: 'anech', resave: false, saveUninitialized: true, cookie: {
        oneDay: 1000 * 60 * 60 * 24
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

app.post('/createGame', createGame)
app.get('/connectGame', async (req, res) => {
    const token = req.query.token;
    console.log(token);
    if (!token || !rooms[token]) {
        console.log("redirected");
        res.render('html/main_page', {
            tokenError: "No game with that token"
        })
    } else {
        console.log("to the game");
        res.render('html/main')
    }

})


let rooms = {}
let cards = [...(await Card.get_all()), ...(await ActionCard.get_all())]

io.on('connection', (socket) => {
    console.log(`User ${socket.id}: Connected`)
    socket.on('connectToGame', (data) => {
        let roomId = `room:${data.roomToken}`;
        console.log(`User ${socket.id}: Connected to the room ${roomId}`)
        if (!rooms[roomId])
            return;
        socket.join(roomId)
        io.sockets.in(roomId).emit('connected')
        rooms[roomId] = {
            ...rooms[roomId],
            playerB: socket.id,
            playerBIsReady: false
        }
    })

    socket.on('createRoom', (data) => {
        let roomId = `room:${data.roomToken}`;
        console.log(`User ${socket.id}: Created the room ${roomId}`)
        rooms[roomId] = {
            playerA: socket.id,
            playerAIsReady: false
        };

        socket.join(roomId);

    })

    socket.on('dealCards', async (data) => {
        const {cardAmount} = data;
        let deck = shuffle(cards);

        if (cardAmount < deck.length)
            socket.emit('dealCards', {deck: deck.slice(0, cardAmount)})

    })

    socket.on('playCard', function (data) {
        const {card, cardZoneId} = data
        console.log(card);
        socket.broadcast.to([...socket.rooms.values()][1]).emit('playCard', {card: card, cardZoneId: cardZoneId - 3})
    });

    socket.on('pressReady', () => {
        for (const value of socket.rooms.values()
            ) {
            if (!rooms[value])
                continue;

            if (rooms[value].playerA === socket.id)
                rooms[value].playerAIsReady = true;

            if (rooms[value].playerB === socket.id)
                rooms[value].playerBIsReady = true;

            if (rooms[value].playerAIsReady && rooms[value].playerBIsReady) {
                io.to(value).emit('startMatch')
                io.to(rooms[value].playerA).emit('yourturn')
            }

        }
    })

    socket.on('endturn', () => {
        socket.broadcast.to([...socket.rooms.values()][1]).emit('yourturn')
    })


});


// Listening

server.listen(PORT, () => {
    console.log(`Node app started on port http://localhost:${PORT}`);
})

