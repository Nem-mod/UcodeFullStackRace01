export const sendRegisterPage = async  (req, res) => {
    res.render('html/registration_page')
}

export const sendLogInPage = async (req, res) => {
    res.render('html/login_page')
}

export const sendMainPage = async (req, res) => {
    res.render('html/main');
}