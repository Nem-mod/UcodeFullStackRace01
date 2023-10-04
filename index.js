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
import {Card} from "./models/CardModel.js";
import {shuffle} from "./utils.js";

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


// Render page controllers
app.get('/', sendLogInPage)
app.get('/registration', sendRegisterPage)
app.get('/main', sendMainPage)
app.get('/createGameToken', renderStartPage)
app.post('/register', register)
app.post('/login', login)


let rooms = []
let cards = await Card.get_all()

app.post('/createGame', createGame)
app.post('/connectGame', async (req, res) => {
    const {token} = req.body
    if (!token || !rooms.find(token))
        return;

    res.render('html/main')
})


io.on('connection', (socket) => {
    socket.on('connectToGame', (data) => {
        console.log(`User connected ${data}`)
        let roomId = `room:${data.roomToken}`;
        console.log(`User connected ${roomId}`)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('connected')
    })

    socket.on('createRoom', (data) => {
        console.log(`User connected ${data}`)
        let roomId = `room:${data.roomToken}`;
        rooms.push(roomId);
        socket.join(roomId);
        console.log(rooms, roomId)
    })

    socket.on('dealCards', async (data) => {
        const { cardAmount } = data;

        let deck = shuffle(cards);

        if (cardAmount < deck.length)
            io.emit('dealCards', {deck: deck.slice(0, cardAmount)})

    })
});


// Listening

server.listen(PORT, () => {
    console.log(`Node app started on port http://localhost:${PORT}`);
})

