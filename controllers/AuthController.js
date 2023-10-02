import {UserModel} from "../models/UserModel.js";

export const register = async (req, res) => {
    try {
        if (!req.body) {
            res.redirect(`/`);
        }
        let { login, psw1, psw2, email } = req.body;

        const errors = {};

        login = login.trim();
        psw1 = psw1.trim();
        psw2 = psw2.trim();
        email = email.trim();



        if (!login || login.length < 5 || login.length > 40) {
            errors.loginError = "Must be more than 5 and less than 40 symbols";
        }

        if (!psw1 || psw1.length < 5 || psw1.length > 40) {
            errors.psw1Error = "Must be more than 5 and less than 40 symbols";
        }
        if (psw1 !== psw2) {
            errors.psw2Error = "Password mismatch";
        }

        if (!psw2 || psw2.length < 5 || psw2.length > 40) {
            errors.psw2Error = "Must be more than 5 and less than 40 symbols";
        }

        if (!email.match("@gmail.com$")) {
            errors.emailError = "Must be gmail";
        }
        if (!email) {
            errors.emailError = "Is obligatory field";
        }

        const user = new UserModel(login, psw1, email);

        if (errors) {
            user.save();
            errors.success = "Success";
        }

        errors.loginValue = login;
        errors.psw1Value = psw1;
        errors.psw2Value = psw2;
        errors.emailValue = email;

        if (errors)
            res.render(`registration`, errors);

        // TODO: Render main page
        res.render('html/login_page.html')

    } catch (e) {
        res.render('html/registration_page.html', {loginError : "User already exist"})
    }


}