export const sendRegisterPage = async  (req, res) => {
    res.render('html/registration_page')
}

export const sendLogInPage = async (req, res) => {
    res.render('html/main')
}

export const sendMainPage = async (req, res) => {
    if(!req.session.token)
        res.redirect('/')
    res.render('html/main_page')
}