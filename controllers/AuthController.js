import {UserModel} from "../models/UserModel.js";
import session from "express-session";
import * as crypto from "crypto";

export const register = async (req, res) => {
    try {
        if (!req.body) {
            res.redirect(`/`);
        }
        let {login, psw1, psw2, email} = req.body;

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


        if (Object.keys(errors).length !== 0)
            throw errors

        const user = new UserModel(login, psw1, email);

        if (errors) {
            await user.save();
            errors.success = "Success";
        }

        res.render('html/login_page.html')

    } catch (error) {
        res.render('html/registration_page.html', error)
    }

}

export const login = async (req, res) => {
    try {
        const {login, psw1} = req.body;
        let model = new UserModel();
        let user = await model.findByUserName(login)
        if (!user || user.user_password !== psw1)
            throw {loginError: "Wrong password or login"}

        req.session.token = crypto.createHash('md5').update(login).digest('hex');
        res.redirect('/main')
    }
    catch (error) {
        res.render('html/login_page.html' , error)

    }
}