import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import path from "path";
import expressThymeleaf from 'express-thymeleaf';
import {TemplateEngine} from 'thymeleaf';
import session from "express-session";
import {sendLogInPage, sendRegisterPage} from "./controllers/ViewController.js";
import {register} from "./controllers/AuthController.js";

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app)
const io = new Server(server)

const __dirname = path.resolve() + '/views';
const templateEngine = new TemplateEngine();

app.use('/public', express.static(path.join(path.resolve(), '/public')));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.json());
app.use(express.static('views'));

app.use(session({
    name: 'anech', secret: 'anech', resave: false, saveUninitialized: true, cookie: {
        maxAge: 100000
    }
}));


// Render page controllers
app.get('/', sendLogInPage)
app.get('/registration', sendRegisterPage)


app.post('/register', register)


io.on('connection', (socket) => {
    console.log('a user connected');
});


// Listening

server.listen(PORT, () => {
    console.log(`Node app started on port http://localhost:${PORT}`);
})

