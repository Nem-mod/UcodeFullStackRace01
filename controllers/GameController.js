import crypto from 'crypto'
function generateRandomToken(length) {
    const token = crypto.randomBytes(Math.ceil(length / 2)).toString('hex');
    return token.slice(0, length);
}

export const createGame = async (req, res) => {
    const randomToken = generateRandomToken(4);
    console.log(randomToken)
    res.render('html/main_page', {token: randomToken})
}